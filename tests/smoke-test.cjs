'use strict';
const fs = require('node:fs');
const assert = require('node:assert/strict');

const html = fs.readFileSync('index.html', 'utf8');
const scriptStart = html.indexOf('<script>');
const scriptEnd = html.indexOf('</script>', scriptStart + 8);
assert.ok(scriptStart >= 0 && scriptEnd > scriptStart, 'main game script exists');
const js = html.slice(scriptStart + 8, scriptEnd);
const sw = fs.readFileSync('service-worker.js', 'utf8');
const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));

for (const id of ['retroLanding', 'landingPlay', 'landingContinue', 'landingInstallBtn', 'installAppBtn', 'homeLogo', 'saveBtn', 'pauseBtn', 'attackBtn', 'useBtn', 'interactBtn']) {
  assert.ok(html.includes('id="' + id + '"'), 'required UI element exists: ' + id);
}
for (const feature of ['function exportBackup(', 'async function importBackup(', 'dungeon-explorer-backup', 'Export Backup', 'Import Backup', 'function generateFloor(', 'function startGame(', 'function save(', 'function load(', 'function castAbility(', 'Boss Rush', 'Survival Gauntlet', 'BESTIARY', 'TOWN_QUESTS', 'WAYFARER’S REST', 'Ratcatcher’s Contract', 'function townQuestProgress(', 'townBtnGame', 'townBtnMenu', 'function heavyAttack(', 'function whirlwindAttack(', 'function throwBomb(', 'function cycleWeaponStyle(', 'function openWeaponManual(', 'heavyBtn', 'spinBtn', 'bombBtn', 'weaponManualBtn', 'WEAPON MASTERY', 'Save & Exit', 'Don’t Save & Exit']) {
  assert.ok(html.includes(feature), 'required game feature exists: ' + feature);
}
assert.ok(!js.includes('baseKillEnemy=baseKillEnemy'), 'no accidental const self-assignment');
assert.ok(js.includes('p.stamina=Math.min(100'), 'stamina regenerates over time');
assert.ok(js.includes('if(!save())return'), 'failed saves do not exit and lose progress');
assert.ok(js.includes("navigation?.type==='reload'"), 'landing navigation preserves refresh behavior');
assert.ok(sw.includes("const CACHE_NAME = 'dungeon-explorer-v9'"), 'cache version is bumped');
assert.ok(js.includes("beforeinstallprompt"), 'PWA install prompt is handled');
assert.ok(js.includes("appinstalled"), 'installed state is handled');
assert.ok(html.includes('@media(max-width:430px)'), 'small-phone layout rules exist');
assert.ok(html.includes('/* FULL-SITE 16-BIT ARCADE RESTYLE */'), 'full-site retro theme exists');
assert.ok(html.includes('image-rendering:pixelated'), 'pixel-art rendering is enabled');
assert.ok(html.includes('/* Compact, translucent in-game arcade buttons: stay visible while playing */'), 'compact always-visible gameplay toolbar styles exist');
assert.ok(html.includes('background:#111521a8'), 'toolbar buttons use translucent retro backgrounds');
assert.ok(html.includes('margin-top:-48px'), 'toolbar overlays the game display edge');
assert.ok(html.includes('repeating-linear-gradient(0deg,#111521 0 7px,#131827 7px 8px)'), 'retro panel texture exists');
assert.equal(manifest.theme_color, '#090b12', 'PWA theme matches retro palette');
assert.ok(html.includes('@media(max-height:560px) and (orientation:landscape)'), 'short landscape layout rules exist');
assert.ok(sw.indexOf('if (request.mode === \'navigate\')') < sw.indexOf('caches.match(request).then(cached'), 'navigation checks network before cache');
assert.ok(html.includes('/* Town, NPC and quest-board expansion */'), 'town and quest responsive styling exists');
assert.ok(js.includes("townQuestProgress('kills',1)"), 'enemy kills advance local quest progress');
assert.ok(js.includes("townQuestProgress('bosses',1)"), 'guardian kills advance bounty progress');
assert.ok(js.includes("townQuestProgress('floors',1)"), 'floor descent advances exploration contract');
assert.ok(js.includes('metaData.legacy=(metaData.legacy||0)+q.reward'), 'quest rewards use earned in-game legacy points');
assert.ok(js.includes('Resources refunded.'), 'failed bomb throws refund their resource');
assert.ok(js.includes("if(e.code==='KeyX')heavyAttack()"), 'heavy attack keyboard control exists');
assert.ok(js.includes("if(e.code==='KeyV')whirlwindAttack()"), 'area attack keyboard control exists');
assert.ok(js.includes("if(e.code==='KeyG')throwBomb()"), 'bomb keyboard control exists');
assert.ok(js.includes('combatBaseInteract();'), 'expanded interactions preserve original dungeon interactions');
assert.equal(manifest.name, 'Dungeon Explorer');
assert.ok(manifest.start_url && manifest.scope, 'PWA manifest has start URL and scope');
assert.ok(js.includes('function openCraftingBench('), 'free weapon crafting menu exists');
assert.ok(js.includes('function installDungeonExpansion('), 'procedural floors install new dungeon features');
assert.ok(js.includes('weaponElement'), 'elemental weapon enchantments are supported');
assert.ok(js.includes('function applyWeaponElementToHits('), 'elemental enchantments affect successful weapon hits');
assert.ok(js.includes("e.venomTimer=Math.max(e.venomTimer||0,3)"), 'venom enchantment applies damage over time');
assert.ok(js.includes("e.stun=Math.max(e.stun||0,.8)"), 'frost enchantment briefly freezes enemies');
assert.ok(js.includes("Trap safely disarmed. No damage taken."), 'interacting with a trap disarms it safely');
assert.ok(js.includes('function breakBarrel('), 'destructible barrels can drop loot');
assert.ok(js.includes('SECRET PASSAGE FOUND!'), 'hidden passages reveal bonus treasure');
assert.ok(js.includes('Spike trap!'), 'floor traps damage the player');
assert.ok(js.includes("if(e.code==='KeyC')openCraftingBench()"), 'crafting has a keyboard shortcut');
assert.ok(sw.includes('dungeon-explorer-v9'), 'offline cache is bumped for the expansion');
console.log('Dungeon Explorer smoke tests passed.');
