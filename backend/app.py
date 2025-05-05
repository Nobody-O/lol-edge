# ============================================================
#  © 2025 LoL Edge – All rights reserved.
#  This file is part of the LoL Edge backend system.
#  Author: Nobody-O
# ============================================================

# ============================================================
#  Imports & App Configuration
# ============================================================

import json
import os

import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
# Local utility functions for Riot API calls and data processing
from utils.data_processing import process_summoner_profile
from utils.riot_api import (get_account_route, get_champion_mastery,
                            get_live_game_by_puuid, get_match_details,
                            get_match_ids, get_ranked_data,
                            get_summoner_by_riot_id,
                            get_summoner_profile_by_puuid)

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS to allow frontend access

# Riot API key (loaded from environment)
RIOT_API_KEY = os.getenv("RIOT_API_KEY")

# Load fallback fake match data for when Riot API fails
with open('utils/fake_matches.json', 'r') as f:
    FAKE_MATCHES = json.load(f)

# ============================================================
#  Basic Health Check Route
# ============================================================

@app.route('/')
def home():
    """Health check endpoint."""
    return jsonify({"message": "LoL Edge Backend is running!"})

# ============================================================
#  Summoner Data Endpoint
# ============================================================

@app.route('/summoner', methods=['GET'])
def fetch_summoner_data():
    """
    Fetches summoner profile and match history using Riot API.
    Combines account info, ranked data, mastery data, and recent matches.
    """
    try:
        # Extract query params from request
        name = request.args.get('name')
        tag = request.args.get('tag')
        region = request.args.get('region')

        if not name or not tag or not region:
            return jsonify({"error": "Missing parameters: name, tag, region required."}), 400

        # Get summoner unique identifiers from Riot ID
        account_info = get_summoner_by_riot_id(name, tag)
        puuid = account_info['puuid']
        platform = region
        account_route = get_account_route(region)

        # Get summoner profile + ranked + mastery data
        summoner_profile = get_summoner_profile_by_puuid(puuid, platform)
        summoner_id = summoner_profile['id']
        ranked_data = get_ranked_data(summoner_id, platform)

        # Optional: Champion mastery data
        try:
            mastery_data = get_champion_mastery(puuid, platform)
        except Exception as e:
            print(f"[Warning] Champion Mastery fetch failed: {e}")
            mastery_data = []

        # Build final profile dictionary
        processed_profile = process_summoner_profile(
            summoner_profile,
            ranked_data,
            mastery_data
        )
        processed_profile['riotId'] = f"{name}#{tag}"
        processed_profile['tagLine'] = tag

        # ============================================
        #  Match History Fetch
        # ============================================
        try:
            match_ids = get_match_ids(puuid, account_route)
            print(f"[Debug] Match IDs fetched: {match_ids}")
            matches = []

            for match_id in match_ids:
                try:
                    match = get_match_details(match_id, account_route)
                    match['userPuuid'] = puuid  # Add player context
                    matches.append(match)
                except Exception as e:
                    print(f"[Warning] Match fetch failed: {e}")

            # Fallback to local fake data if none returned
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

        # Filter out malformed match objects
        processed_matches = [
            match for match in matches
            if match.get("info", {}).get("participants")
        ]

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

# ============================================================
#  Live Game Data Endpoint
# ============================================================

@app.route('/livegame', methods=['GET'])
def get_live_game():
    """
    Retrieves live game info if the summoner is currently in an active match.
    """
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

# ============================================================
#  Run the Flask App (Local Dev Only)
# ============================================================

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
