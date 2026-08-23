import fs from 'node:fs';

const header = fs.readFileSync('src/tiles/tile_renderer.h', 'utf8');
const renderer = fs.readFileSync('src/tiles/tile_renderer.cpp', 'utf8');
const switchRenderer = fs.readFileSync('src/types/switch/renderer.cpp', 'utf8');

const required = [
  [header, 'lv_obj_t* container = nullptr;'],
  [switchRenderer, 'target[index].container = container;'],
  [switchRenderer, 'lv_obj_remove_flag(container, LV_OBJ_FLAG_CLICK_FOCUSABLE)'],
  [renderer, 'state.has_state && state.is_on'],
  [renderer, 'lv_obj_get_parent(widgets.icon_label)'],
  [renderer, 'brighten_rgb_color(tile_color, 0x12)'],
  [renderer, 'lv_obj_set_style_border_color('],
  [renderer, 'tile_active ? LV_OPA_COVER : LV_OPA_TRANSP'],
  [renderer, 'tile_active ? tile_layout::scale_480(4) : 0'],
  [renderer, 'lv_obj_invalidate(live_container)'],
];

for (const [source, snippet] of required) {
  if (!source.includes(snippet)) {
    throw new Error(`Missing active Switch tile highlight contract: ${snippet}`);
  }
}

console.log('Switch active highlight contract OK');
