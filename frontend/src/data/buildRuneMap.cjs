const fs = require('fs');
const path = require('path');

// Read the JSON manually
const runeData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'runesReforged.json'), 'utf8')
);

const runeIdToPath = {};

runeData.forEach((style) => {
  style.slots.forEach((slot) => {
    slot.runes.forEach((rune) => {
      runeIdToPath[rune.id] = rune.icon.replace('perk-images/Styles/', '');
    });
  });
});

// Output JS module
const output = `const runeIdToPath = ${JSON.stringify(
  runeIdToPath,
  null,
  2
)};\n\nexport default runeIdToPath;\n`;

fs.writeFileSync(path.join(__dirname, 'runeIdToPath.js'), output);

console.log('✅ runeIdToPath.js created successfully!');
