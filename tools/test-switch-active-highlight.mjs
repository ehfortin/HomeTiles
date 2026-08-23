import fs from 'node:fs';

const header = fs.readFileSync('src/tiles/tile_renderer.h', 'utf8');
const renderer = fs.readFileSync('src/tiles/tile_renderer.cpp', 'utf8');
const switchRenderer = fs.readFileSync('src/types/switch/renderer.cpp', 'utf8');

const required = [
  [header, 'lv_obj_t* container = nullptr;'],
  [switchRenderer, 'target[index].container = container;'],
  [renderer, 'state.has_state && state.is_on'],
  [switchRenderer, 'brighten_rgb_color(tile_color, 0x12)'],
  [switchRenderer, 'LV_PART_MAIN | LV_STATE_CHECKED'],
  [switchRenderer, 'lv_obj_set_style_border_color('],
  [renderer, 'lv_obj_add_state(widgets.container, LV_STATE_CHECKED)'],
  [renderer, 'lv_obj_remove_state(widgets.container, LV_STATE_CHECKED)'],
];

for (const [source, snippet] of required) {
  if (!source.includes(snippet)) {
    throw new Error(`Missing active Switch tile highlight contract: ${snippet}`);
  }
}

console.log('Switch active highlight contract OK');
