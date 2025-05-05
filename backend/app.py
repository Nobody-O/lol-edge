# --------------------------------------
#            Imports & Setup
# --------------------------------------

import json
import os

import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from utils.data_processing import process_summoner_profile
from utils.riot_api import (get_account_route, get_champion_mastery,
                            get_live_game_by_puuid, get_match_details,
                            get_match_ids, get_ranked_data,
                            get_summoner_by_riot_id,
                            get_summoner_profile_by_puuid)

load_dotenv()
app = Flask(__name__)
CORS(app)

RIOT_API_KEY = os.getenv("RIOT_API_KEY")

with open('utils/fake_matches.json', 'r') as f:
    FAKE_MATCHES = json.load(f)

# --------------------------------------
#               Routes
# --------------------------------------

@app.route('/')
def home():
    return jsonify({"message": "LoL Edge Backend is running!"})

@app.route('/summoner', methods=['GET'])
def fetch_summoner_data():
    try:
        name = request.args.get('name')
        tag = request.args.get('tag')
        region = request.args.get('region')

        if not name or not tag or not region:
            return jsonify({"error": "Missing parameters: name, tag, region required."}), 400

        account_info = get_summoner_by_riot_id(name, tag)
        puuid = account_info['puuid']
        platform = region
        account_route = get_account_route(region)

        summoner_profile = get_summoner_profile_by_puuid(puuid, platform)
        summoner_id = summoner_profile['id']

        ranked_data = get_ranked_data(summoner_id, platform)

        try:
            mastery_data = get_champion_mastery(puuid, platform)
        except Exception as e:
            print(f"[Warning] Champion Mastery fetch failed: {e}")
            mastery_data = []

        processed_profile = process_summoner_profile(
            summoner_profile,
            ranked_data,
            mastery_data
        )

        # ✅ Add Riot ID and Tagline to profile
        processed_profile['riotId'] = f"{name}#{tag}"
        processed_profile['tagLine'] = tag

        try:
            match_ids = get_match_ids(puuid, account_route)
            print(f"[Debug] Match IDs fetched: {match_ids}")
            matches = []

            for match_id in match_ids:
                try:
                    match = get_match_details(match_id, account_route)
                    match['userPuuid'] = puuid
                    matches.append(match)
                except Exception as e:
                    print(f"[Warning] Match fetch failed: {e}")

            if not matches:
                print("[Fallback] Using fake matches.")
                matches = FAKE_MATCHES
                for match in matches:
                    match['userPuuid'] = puuid

        except Exception as e:
            print(f"[Match Fetch Error] {e}")
            matches = FAKE_MATCHES
            for match in matches:
                match['userPuuid'] = puuid

        processed_matches = []
        for match in matches:
            if match.get("info", {}).get("participants"):
                processed_matches.append(match)

        return jsonify({
            "profile": processed_profile,
            "matches": processed_matches,
        })

    except requests.HTTPError as e:
        print(f"[HTTP Error] {e}")
        return jsonify({"error": "Failed to fetch data from Riot API."}), 502
    except Exception as e:
        print(f"[Internal Error] {e}")
        return jsonify({"error": "Internal server error occurred."}), 500

# --------------------------------------
#            Live Game Route
# --------------------------------------

@app.route('/livegame', methods=['GET'])
def get_live_game():
    try:
        puuid = request.args.get('puuid')
        region = request.args.get('region')

        if not puuid or not region:
            return jsonify({"error": "Missing puuid or region"}), 400

        game = get_live_game_by_puuid(puuid, region)
        return jsonify({"activeGame": game})

    except Exception as e:
        print(f"[Live Error] {e}")
        return jsonify({"activeGame": None})

# --------------------------------------
#           Run Flask Server
# --------------------------------------

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
