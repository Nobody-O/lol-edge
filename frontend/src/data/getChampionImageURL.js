// ----------------- getChampionImageURL.js -----------------

const VERSION = '15.9.1';
const BASE = `https://ddragon.leagueoflegends.com/cdn/${VERSION}`;
const CDN = `https://ddragon.leagueoflegends.com`;

export const FALLBACK_ICON = '/fallbacks/placeholder.png';

const FALLBACKS = {
  SummonerIgnite: '/fallbacks/spell_Ignite.png',
  SummonerGhost: '/fallbacks/spell_Ghost.png',
  SummonerCleanse: '/fallbacks/spell_Cleanse.png',
  SummonerSmite: '/fallbacks/spell_Smite.png',
  FiddleSticks: '/fallbacks/champion_Fiddlesticks.png',
  item0: '/fallbacks/item_blank.png',
};

const overrideMap = {
  fiddlesticks: 'FiddleSticks',
  wukong: 'MonkeyKing',
  chogath: 'Chogath',
  leblanc: 'Leblanc',
  khazix: 'Khazix',
  reksai: 'RekSai',
  kogmaw: 'KogMaw',
  velkoz: 'Velkoz',
  aurelionsol: 'AurelionSol',
  nunu: 'Nunu',
};

export function getChampionIcon(name) {
  if (!name) return FALLBACK_ICON;
  const key = name.toLowerCase();
  const clean = overrideMap[key] || name.replace(/[^a-zA-Z0-9]/g, '');
  return `${BASE}/img/champion/${clean}.png`;
}

export function getSummonerSpellIcon(spellName) {
  if (!spellName) return FALLBACK_ICON;
  const name = spellName.charAt(0).toUpperCase() + spellName.slice(1);
  const fallbackKey = `Summoner${name}`;
  return `${BASE}/img/spell/${fallbackKey}.png`;
}

export function getItemIcon(itemId) {
  if (!itemId || itemId === 0) return FALLBACKS.item0;
  return `${BASE}/img/item/${itemId}.png`;
}

export function getProfileIcon(iconId) {
  if (!iconId) return FALLBACK_ICON;
  return `${BASE}/img/profileicon/${iconId}.png`;
}

export function getPassiveIcon(icon) {
  if (!icon) return FALLBACK_ICON;
  return `${BASE}/img/passive/${icon}`;
}

// ----------------- Rune Icons -----------------
import runeIdToPath from './runeIdToPath';

export function getRuneIcon(perkId) {
  const id = Number(perkId); // make sure it's a number
  const path = runeIdToPath[id];

  if (!path) {
    console.warn(`⚠️ Missing rune mapping for perkId: ${perkId}`);
    return FALLBACK_ICON;
  }

  const url = `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/${path}`;
  console.log(`✅ Rune icon loaded: ${url}`);
  return url;
}

export function getRankBadge(tier) {
  if (!tier) return '/fallbacks/unranked.png';
  const formatted = tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase();
  return `/fallbacks/ranks/Rank=${formatted}.png`;
}
