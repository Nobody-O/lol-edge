# ============================================================
#  © 2025 LoL Edge – All rights reserved.
#  Riot API utility functions for LoL Edge backend integration.
#  Author: Nobody-O
# ============================================================

# ============================================================
# IMPORTS & SETUP
# ============================================================

import os

import requests
from dotenv import load_dotenv

# Load API key from .env file
load_dotenv()
RIOT_API_KEY = os.getenv("RIOT_API_KEY")

# Default headers for all Riot API calls
HEADERS = {
    "X-Riot-Token": RIOT_API_KEY
}

# ============================================================
# REGION / PLATFORM ROUTING HELPERS
# ============================================================

def get_account_route(region):
    """
    Maps user-entered platform (e.g. 'euw1') to the correct 
    regional route used by Match-V5 and Account-V1 APIs.
    """
    if region in ['na1', 'br1', 'la1', 'la2']:
        return 'americas'
    if region in ['euw1', 'eun1', 'tr1', 'ru']:
        return 'europe'
    if region in ['kr', 'jp1']:
        return 'asia'
    if region in ['oc1']:
        return 'sea'
    return 'europe'  # fallback default


def get_platform_route(region):
    """
    Returns the same region string for endpoints that require
    platform-level routing (e.g., Summoner-V4).
    """
    return region

# ============================================================
# ACCOUNT-V1 – LOOKUP BY RIOT ID
# ============================================================

def get_summoner_by_riot_id(name, tag):
    """
    Convert Riot ID (username + tag) into full account info
    including universal PUUID.
    """
    account_route = "europe"  # Riot ID endpoint is always routed to Europe
    url = f"https://{account_route}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{name}/{tag}"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()

# ============================================================
# SUMMONER-V4 – PROFILE LOOKUP BY PUUID
# ============================================================

def get_summoner_profile_by_puuid(puuid, platform):
    """
    Fetch full summoner profile using PUUID.
    Used to retrieve summoner level, name, icon, etc.
    """
    url = f"https://{platform}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()

# ============================================================
# LEAGUE-V4 – RANKED LADDER ENTRIES
# ============================================================

def get_ranked_data(summoner_id, platform):
    """
    Fetch SoloQ / Flex ranked data for a given summonerId.
    Still uses summonerId instead of PUUID for now.
    """
    url = f"https://{platform}.api.riotgames.com/lol/league/v4/entries/by-summoner/{summoner_id}"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()

# ============================================================
# CHAMPION MASTERY – PUUID ONLY
# ============================================================

def get_champion_mastery(puuid, platform):
    """
    Get top champion mastery stats using PUUID.
    Returns top 100 champions by mastery score.
    """
    url = f"https://{platform}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/{puuid}"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()

# ============================================================
# SPECTATOR-V5 – LIVE GAME STATUS
# ============================================================

def get_live_game_by_puuid(puuid, platform):
    """
    Returns live match info if player with given PUUID is
    currently in a game. Otherwise, raises an error or returns empty.
    """
    url = f"https://{platform}.api.riotgames.com/lol/spectator/v5/active-games/by-puuid/{puuid}"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()

# ============================================================
# MATCH-V5 – MATCH HISTORY & DETAILS
# ============================================================

def get_match_ids(puuid, account_route, count=10):
    """
    Returns a list of recent match IDs for a given player PUUID.
    """
    url = f"https://{account_route}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?count={count}"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()


def get_match_details(match_id, account_route):
    """
    Fetch full match data (timeline, stats, teams) from a given match ID.
    """
    url = f"https://{account_route}.api.riotgames.com/lol/match/v5/matches/{match_id}"
    response = requests.get(url, headers=HEADERS)
    response.raise_for_status()
    return response.json()
    return response.json()
