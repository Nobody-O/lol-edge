# ----------------- Profile Processing -----------------

def process_summoner_profile(profile_data, rank_data, mastery_data):
    """
    Combine Profile + Ranked + Mastery into a clean single JSON object
    for frontend.
    """

    # --- Basic Profile Info ---
    processed = {
        "summonerName": profile_data.get('name'),
        "summonerLevel": profile_data.get('summonerLevel'),
        "profileIconId": profile_data.get('profileIconId'),
        "puuid": profile_data.get('puuid'),
        "id": profile_data.get('id'),  # Summoner ID
    }

    # --- Ranked Info ---
    processed["rankedSolo"] = None
    processed["rankedFlex"] = None

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

    # --- Champion Mastery (Top 3) ---
    top_masteries = mastery_data[:3] if mastery_data else []
    processed["topChampions"] = []

    for champ in top_masteries:
        processed["topChampions"].append({
            "championId": champ['championId'],
            "championPoints": champ['championPoints'],
            "championLevel": champ['championLevel'],
        })

    return processed

# ----------------- Match History Processing -----------------

def process_match_history(matches, puuid):
    """
    Extract minimal clean match info from raw match JSONs.
    """

    simplified_matches = []

    for match in matches:
        try:
            participant = next(p for p in match['info']['participants'] if p['puuid'] == puuid)

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
                # (Optional: more fields can be extracted later)
            }

            simplified_matches.append(match_summary)

        except Exception as e:
            # Skip any broken matches
            print(f"[Warning] Failed to process match: {e}")
            continue

    return simplified_matches

# ----------------- Utility -----------------

def calculate_winrate(wins, losses):
    """
    Calculate win rate as a percentage.
    """
    total_games = wins + losses
    if total_games == 0:
        return 0
    return round((wins / total_games) * 100, 1)
