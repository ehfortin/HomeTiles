#include "src/types/switch/web_handler.h"

void apply_switch_fields_from_request(WebServer& server, Tile& tile) {
  tile.sensor_entity = server.hasArg("switch_entity") ? server.arg("switch_entity") : "";
  uint8_t style = 0;
  uint8_t active_style = 0;
  uint8_t popup_mode = TILE_POPUP_OPEN_SHORT_PRESS;
  if (server.hasArg("switch_style")) {
    int raw = server.arg("switch_style").toInt();
    style = (raw == 1) ? 1 : 0;
  }
  if (server.hasArg("switch_active_style")) {
    int raw = server.arg("switch_active_style").toInt();
    active_style = (raw >= 0 && raw <= 2) ? static_cast<uint8_t>(raw) : 0;
  }
  if (server.hasArg("popup_open_mode")) {
    popup_mode = (server.arg("popup_open_mode").toInt() == TILE_POPUP_OPEN_SHORT_PRESS)
                     ? TILE_POPUP_OPEN_SHORT_PRESS
                     : TILE_POPUP_OPEN_LONG_PRESS;
  }
  tile.sensor_decimals = style;
  setTilePopupOpenMode(tile, popup_mode);
  tile.sensor_value_font = active_style;
  tile.sensor_display_mode = 0;
  tile.sensor_gauge_min = 0;
  tile.sensor_gauge_max = 100;
}
