# --------------------------------------
#          Imports & Setup
# --------------------------------------

import os

import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Riot API Key
RIOT_API_KEY = os.getenv("RIOT_API_KEY")
HEADERS = {"X-Riot-Token": RIOT_API_KEY}

# --------------------------------------
#         Routing Helpers
# --------------------------------------

def get_account_route(region):
    """
    Determines the correct regional routing value for Match-V5 and Account-V1.
    """
    if region in ['na1', 'br1', 'la1', 'la2']:
        return 'americas'
    if region in ['euw1', 'eun1', 'tr1', 'ru']:
        return 'europe'
    if region in ['kr', 'jp1']:
        return 'asia'
    if region in ['oc1']:
        return 'sea'
    return 'europe'

def get_platform_route(region):
    """
    Returns the platform routing for Summoner-V4, League-V4, Mastery APIs.
    """
    return region

# --------------------------------------
#           Account-V1
# --------------------------------------

def get_summoner_by_riot_id(name, tag):
    """
    Converts Riot ID (name + tag) into full account info including PUUID.
    """
    account_route = "europe"
    url = f"https://{account_route}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{name}/{tag}"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()

# --------------------------------------
#         Summoner-V4 (by PUUID)
# --------------------------------------

def get_summoner_profile_by_puuid(puuid, platform):
    """
    Fetch full profile using PUUID (not summonerId!).
    """
    url = f"https://{platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()

# --------------------------------------
#           League-V4
# --------------------------------------

def get_ranked_data(summoner_id, platform):
    """
    Fetch SoloQ / Flex ranked entries using summonerId (still required here).
    """
    url = f"https://{platform}.api.riotgames.com/lol/league/v4/entries/by-summoner/{summoner_id}"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()

# --------------------------------------
#      Champion Mastery (PUUID only)
# --------------------------------------

def get_champion_mastery(puuid, platform):
    """
    Fetch top champion masteries using PUUID (correct endpoint).
    """
    url = f"https://{platform}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/{puuid}"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()

# --------------------------------------
#         Spectator (Live Game)
# --------------------------------------

def get_live_game_by_puuid(puuid, platform):
    """
    Fetch live game info using PUUID (not summonerId).
    """
    url = f"https://{platform}.api.riotgames.com/lol/spectator/v5/active-games/by-puuid/{puuid}"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()

# --------------------------------------
#           Match-V5
# --------------------------------------

def get_match_ids(puuid, account_route, count=10):
    """
    Get recent match IDs by PUUID.
    """
    url = f"https://{account_route}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?count={count}"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()

def get_match_details(match_id, account_route):
    """
    Get match details using match ID.
    """
    url = f"https://{account_route}.api.riotgames.com/lol/match/v5/matches/{match_id}"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()
    return response.json()
