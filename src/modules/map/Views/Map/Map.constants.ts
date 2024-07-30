export const MAP_STYLE = "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";

export const INITIAL_VIEW_STATE = {
  longitude: -95.712891,
  latitude: 37.774929,
  zoom: 4,
  bearing: 0,
  pitch: 30,
};

export const LAYER_TYPES = {
  LINE_STRING: "LineString",
  MULTI_LINE_STRING: "MultiLineString",
  POINT: "Point",
  MULTI_POINT: "MultiPoint",
  POLYGON: "Polygon",
  MULTI_POLYGON: "MultiPolygon",
};

export const BASE_ERRORS_MESSAGE = "There were some errors and some layers could not be loaded";
