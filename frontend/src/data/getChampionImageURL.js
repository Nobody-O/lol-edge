// -----------------------------------------------------------------------------
// © 2025 LoL Edge — All rights reserved.
// getChampionImageURL.js
//
// Provides utility functions for retrieving correct Data Dragon (ddragon)
// image URLs for champions, items, summoner spells, runes, and profile icons.
// Includes fallbacks and Riot naming edge cases.
// -----------------------------------------------------------------------------

// ----------------- Riot Data Dragon Constants -----------------
const VERSION = '15.9.1';
const BASE = `https://ddragon.leagueoflegends.com/cdn/${VERSION}`;
const CDN = `https://ddragon.leagueoflegends.com`;

// ----------------- Local Fallback Icons -----------------
export const FALLBACK_ICON = '/fallbacks/placeholder.png';

const FALLBACKS = {
  SummonerIgnite: '/fallbacks/spell_Ignite.png',
  SummonerGhost: '/fallbacks/spell_Ghost.png',
  SummonerCleanse: '/fallbacks/spell_Cleanse.png',
  SummonerSmite: '/fallbacks/spell_Smite.png',
  FiddleSticks: '/fallbacks/champion_Fiddlesticks.png',
  item0: '/fallbacks/item_blank.png',
};

// ----------------- Champion CDN Name Overrides -----------------
// Riot uses legacy internal names for some champions; override them here
export const CHAMPION_CDN_OVERRIDES = {
  Fiddlesticks: 'FiddleSticks',
  Wukong: 'MonkeyKing',
  "Cho'Gath": 'Chogath',
  "Kha'Zix": 'Khazix',
  "Vel'Koz": 'Velkoz',
  "Kog'Maw": 'KogMaw',
  "Rek'Sai": 'RekSai',
  LeBlanc: 'Leblanc',
  'Nunu & Willump': 'Nunu',
  'Dr. Mundo': 'DrMundo',
  'Jarvan IV': 'JarvanIV',
  "K'Sante": 'KSante',
  "Bel'Veth": 'Belveth',
  'Renata Glasc': 'Renata',
  'Aurelion Sol': 'AurelionSol',
  'Tahm Kench': 'TahmKench',
  'Master Yi': 'MasterYi',
  Mel: 'Mel',
};

// Return CDN-safe champion name
export function getChampionCDNName(name) {
  return CHAMPION_CDN_OVERRIDES[name] || name;
}

// ----------------- Champion Icon -----------------
export function getChampionIcon(name) {
  if (!name) return FALLBACK_ICON;
  const fixed = getChampionCDNName(name);
  return `${BASE}/img/champion/${fixed}.png`;
}

// ----------------- Summoner Spell Icon -----------------
export function getSummonerSpellIcon(spellName) {
  if (!spellName) return FALLBACK_ICON;
  const name = spellName.charAt(0).toUpperCase() + spellName.slice(1);
  const fallbackKey = `Summoner${name}`;
  return `${BASE}/img/spell/${fallbackKey}.png`;
}

// ----------------- Item Icon -----------------
export function getItemIcon(itemId) {
  if (!itemId || itemId === 0) return FALLBACKS.item0;
  return `${BASE}/img/item/${itemId}.png`;
}

// ----------------- Profile Icon -----------------
export function getProfileIcon(iconId) {
  if (!iconId) return FALLBACK_ICON;
  return `${BASE}/img/profileicon/${iconId}.png`;
}

// ----------------- Passive Icon -----------------
export function getPassiveIcon(icon) {
  if (!icon) return FALLBACK_ICON;
  return `${BASE}/img/passive/${icon}`;
}

// ----------------- Rune Icon Mapping -----------------
import runeIdToPath from './runeIdToPath';

export function getRuneIcon(perkId) {
  const id = Number(perkId);
  const path = runeIdToPath[id];

  if (!path) {
    console.warn(`⚠️ Missing rune mapping for perkId: ${perkId}`);
    return FALLBACK_ICON;
  }

  return `${CDN}/cdn/img/perk-images/Styles/${path}`;
}

// ----------------- Ranked Badge Icon -----------------
export function getRankBadge(tier) {
  if (!tier) return '/fallbacks/unranked.png';
  const formatted = tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase();
  return `/fallbacks/ranks/Rank=${formatted}.png`;
}
