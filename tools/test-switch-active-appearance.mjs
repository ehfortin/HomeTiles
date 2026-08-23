import assert from 'node:assert/strict';
import fs from 'node:fs';

const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

const rendererHeader = read('src/tiles/tile_renderer.h');
const switchRenderer = read('src/types/switch/renderer.cpp');
const tileRenderer = read('src/tiles/tile_renderer.cpp');
const handler = read('src/types/switch/web_handler.cpp');
const html = read('src/types/switch/web_html.cpp');
const admin = read('src/web/assets/admin.js');
const css = read('src/web/assets/admin.css');
const api = read('src/web/web_admin_handlers.cpp');
const screensaver = read('src/ui/screensaver_config.cpp');

assert.match(rendererHeader, /struct SwitchTileWidgets \{\s+lv_obj_t\* container/);
assert.match(switchRenderer, /target\[index\]\.container = container/);
assert.match(tileRenderer, /kActiveAccent = 0x26A69A/);
assert.match(tileRenderer, /active_style == 1/);
assert.match(tileRenderer, /active_style == 2/);

assert.match(handler, /hasArg\("switch_active_style"\)/);
assert.match(handler, /tile\.sensor_value_font = active_style/);
assert.match(html, /_switch_active_style/);
assert.match(html, /switch_active_icon_only/);
assert.match(html, /switch_active_border/);
assert.match(html, /switch_active_background/);

assert.match(admin, /switchActiveStyleSelect/);
assert.match(admin, /switch_active_style/);
assert.match(admin, /dataset\.switchActiveStyle/);
assert.match(admin, /switch-active-on/);
assert.match(css, /switch-active-border\.switch-active-on::after/);
assert.match(css, /switch-active-background\.switch-active-on/);

assert.match(api, /switch_active_style/);
assert.match(screensaver, /in\["switch_active_style"\]/);

console.log('Switch active appearance contract OK');
