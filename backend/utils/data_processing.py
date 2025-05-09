# ============================================================
#  © 2025 LoL Edge – All rights reserved.
#  Data transformation utilities for processing Riot API JSON.
#  Author: Nobody-O
# ============================================================

# ============================================================
# PROFILE DATA PROCESSING
# ============================================================

def process_summoner_profile(profile_data, rank_data, mastery_data):
    """
    Combines raw Riot API data into a structured format that 
    the frontend can easily consume. This includes:
    - Summoner profile info
    - Ranked Solo and Flex queues
    - Top 3 champion masteries
    """

    # Basic profile fields
    processed = {
        "summonerName": profile_data.get('name'),
        "summonerLevel": profile_data.get('summonerLevel'),
        "profileIconId": profile_data.get('profileIconId'),
        "puuid": profile_data.get('puuid'),
        "id": profile_data.get('id'),  # Summoner ID
    }

    # Initialize ranked data placeholders
    processed["rankedSolo"] = None
    processed["rankedFlex"] = None

    # Fill rankedSolo and rankedFlex based on queue type
    for entry in rank_data:
        if entry['queueType'] == "RANKED_SOLO_5x5":
            processed["rankedSolo"] = {
                "tier": entry['tier'],
                "rank": entry['rank'],
                "leaguePoints": entry['leaguePoints'],
                "wins": entry['wins'],
                "losses": entry['losses'],
                "winRate": calculate_winrate(entry['wins'], entry['losses']),
            }
        elif entry['queueType'] == "RANKED_FLEX_SR":
            processed["rankedFlex"] = {
                "tier": entry['tier'],
                "rank": entry['rank'],
                "leaguePoints": entry['leaguePoints'],
                "wins": entry['wins'],
                "losses": entry['losses'],
                "winRate": calculate_winrate(entry['wins'], entry['losses']),
            }

    # Extract top 3 champions by mastery points
    top_masteries = mastery_data[:3] if mastery_data else []
    processed["topChampions"] = []

    for champ in top_masteries:
        processed["topChampions"].append({
            "championId": champ['championId'],
            "championPoints": champ['championPoints'],
            "championLevel": champ['championLevel'],
        })

    return processed

# ============================================================
# MATCH HISTORY PROCESSING
# ============================================================

def process_match_history(matches, puuid):
    """
    Processes a list of full match objects and extracts
    minimal summary data for frontend display.
    """
    simplified_matches = []

    for match in matches:
        try:
            # Locate participant using PUUID
            participant = next(p for p in match['info']['participants'] if p['puuid'] == puuid)

            # Construct a basic match summary dictionary
            match_summary = {
                "matchId": match['metadata']['matchId'],
                "championName": participant['championName'],
                "kills": participant['kills'],
                "deaths": participant['deaths'],
                "assists": participant['assists'],
                "win": participant['win'],
                "kda": round((participant['kills'] + participant['assists']) / max(1, participant['deaths']), 2),
                "gameMode": match['info']['gameMode'],
                "role": participant['teamPosition'],
                "timePlayed": match['info']['gameDuration'],
            
                # Additional fields can be added here if needed
            }

            simplified_matches.append(match_summary)

        except Exception as e:
            # Skip malformed or incomplete match data
            print(f"[Warning] Failed to process match: {e}")
            continue

    return simplified_matches

# ============================================================
# HELPER FUNCTION: WIN RATE CALCULATION
# ============================================================

def calculate_winrate(wins, losses):
    """
    Calculates win rate percentage from total wins and losses.
    Returns 0 if no games have been played.
    """
    total_games = wins + losses
    if total_games == 0:
        return 0
    return round((wins / total_games) * 100, 1)

# ============================================================
# HELPER FUNCTION: KILL PARTICIPATION CALCULATION
# ============================================================

def calculate_kill_participation(match, puuid):
    """
    Calculates kill participation percentage for a given player and match.
    """
    try:
        participants = match.get("info", {}).get("participants", [])
        user = next(p for p in participants if p["puuid"] == puuid)
        team_id = user["teamId"]
        team_kills = sum(p["kills"] for p in participants if p["teamId"] == team_id)
        user_kp = user["kills"] + user["assists"]

        if team_kills == 0:
            return 0.0

        return round((user_kp / team_kills) * 100, 1)
    except Exception:
        return 0.0

