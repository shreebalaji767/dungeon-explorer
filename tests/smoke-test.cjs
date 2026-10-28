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
for (const feature of ['function generateFloor(', 'function startGame(', 'function save(', 'function load(', 'function castAbility(', 'Boss Rush', 'Survival Gauntlet', 'BESTIARY', 'Save & Exit', 'Don’t Save & Exit']) {
  assert.ok(html.includes(feature), 'required game feature exists: ' + feature);
}
assert.ok(!js.includes('baseKillEnemy=baseKillEnemy'), 'no accidental const self-assignment');
assert.ok(js.includes('p.stamina=Math.min(100'), 'stamina regenerates over time');
assert.ok(js.includes('if(!save())return'), 'failed saves do not exit and lose progress');
assert.ok(js.includes("navigation?.type==='reload'"), 'landing navigation preserves refresh behavior');
assert.ok(sw.includes("const CACHE_NAME = 'dungeon-explorer-v5'"), 'cache version is bumped');
assert.ok(js.includes("beforeinstallprompt"), 'PWA install prompt is handled');
assert.ok(js.includes("appinstalled"), 'installed state is handled');
assert.ok(html.includes('@media(max-width:430px)'), 'small-phone layout rules exist');
assert.ok(html.includes('@media(max-height:560px) and (orientation:landscape)'), 'short landscape layout rules exist');
assert.ok(sw.indexOf('if (request.mode === \'navigate\')') < sw.indexOf('caches.match(request).then(cached'), 'navigation checks network before cache');
assert.equal(manifest.name, 'Dungeon Explorer');
assert.ok(manifest.start_url && manifest.scope, 'PWA manifest has start URL and scope');
console.log('Dungeon Explorer smoke tests passed.');
