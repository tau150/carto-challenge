import { FeatureCollection } from "geojson";
import { GeoJsonLayer, IconLayer, PathLayer } from "@deck.gl/layers";
import { PickingInfo } from "deck.gl";
import intersect from "@turf/intersect";
import { featureCollection } from "@turf/helpers";
import { LAYER_TYPES } from "./Map.constants";
import type {
  Feature,
  GeoJsonProperties,
  LineString,
  MultiLineString,
  MultiPolygon,
  Polygon,
} from "geojson";
import type { DataToStore } from "./hooks/useFetchSources";

interface DataToIntersect {
  data: FeatureCollection<Polygon | MultiPolygon, GeoJsonProperties>;
  order: number;
  combinationRef?: string;
}

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 70, height: 50, mask: true },
};

const applyLayerCombination = (layers: DataToIntersect[]): GeoJsonLayer => {
  const firstLayer = layers[0].data;
  const secondLayer = layers[1].data;
  const firstFeatures = firstLayer.features;
  const secondFeatures = secondLayer.features;

  const intersections: Feature<Polygon | MultiPolygon, GeoJsonProperties>[] = [];

  firstFeatures.forEach((firstFeature) => {
    secondFeatures.forEach((secondFeature) => {
      const intersection = intersect(featureCollection([firstFeature, secondFeature]));

      if (intersection) {
        intersections.push(intersection);
      }
    });
  });

  return new GeoJsonLayer({
    id: `geojson-intersection-layer-${Math.random()}`,
    data: intersections,
    stroked: true,
    filled: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getLineColor: [229, 255, 62],
    getFillColor: [0, 205, 129, 180],
    getLineWidth: 1,
  });
};

const applyRegularLayers = (
  layer: DataToStore,
): GeoJsonLayer | IconLayer | PathLayer | undefined => {
  const type = layer.data.features[0].geometry.type;

  if (type === LAYER_TYPES.MULTI_POLYGON || type === LAYER_TYPES.POLYGON) {
    return new GeoJsonLayer({
      id: `geojson-layer-${Math.random()}`,
      data: layer.data.features,
      pickable: true,
      stroked: true,
      filled: true,
      lineWidthScale: 20,
      lineWidthMinPixels: 2,
      getLineColor: [255, 0, 0],
      getFillColor: [200, 160, 0, 180],
      getLineWidth: 1,
    });
  }

  if (type === LAYER_TYPES.POINT || type === LAYER_TYPES.MULTI_POINT) {
    return new IconLayer({
      id: `icon-layer-${Math.random()}`,
      data: layer.data.features,
      pickable: true,
      iconAtlas: "../location-icon.png",
      iconMapping: ICON_MAPPING,
      sizeScale: 10,
      getIcon: () => "marker",
      getSize: () => 3,
      getPosition: (d) => d.geometry.coordinates,
      getColor: [17, 38, 65],
      parameters: {
        depthTest: false,
      },
    });
  }

  if (type === LAYER_TYPES.LINE_STRING || type === LAYER_TYPES.MULTI_LINE_STRING) {
    return new PathLayer({
      id: `path-layer-${Math.random()}`,
      data: layer.data.features,
      pickable: true,
      getPath: (d) =>
        (d.geometry as LineString | MultiLineString).coordinates as [number, number][],
      getWidth: () => 5,
      getColor: [255, 0, 0],
    });
  }
};

const isAllowedIntersection = (type: string) =>
  type === LAYER_TYPES.MULTI_POLYGON || type === LAYER_TYPES.POLYGON;

const generateLayers = (processedLayers: (DataToStore | DataToStore[])[]) => {
  return processedLayers.map((layerToProcess) => {
    if (Array.isArray(layerToProcess)) {
      return applyLayerCombination(layerToProcess as DataToIntersect[]);
    }

    return applyRegularLayers(layerToProcess as DataToStore);
  });
};

export const getLayersCollection = (layersData: DataToStore[]) => {
  const result: (DataToStore | DataToStore[])[] = [];
  let tempArray: DataToStore[] = [];

  for (let i = 0; i < layersData.length; i++) {
    const currentItem = layersData[i];
    const nextItem = layersData[i + 1];

    if (
      currentItem.combinationRef &&
      nextItem &&
      currentItem.combinationRef === nextItem.combinationRef &&
      isAllowedIntersection(currentItem.data.features[0].geometry.type) &&
      isAllowedIntersection(nextItem.data.features[0].geometry.type)
    ) {
      tempArray.push(currentItem);
      tempArray.push(nextItem);
      i++;
      result.push(tempArray);
      tempArray = [];
    } else {
      result.push(currentItem);
    }
  }

  return generateLayers(result);
};

export const getTooltip = ({ object }: PickingInfo<Record<string, string | number>>) => {
  if (!object) return null;
  const properties = object?.properties || {};
  const htmlContent = Object.entries(properties)
    .map(([key, value]) => {
      return `<p key=${key}><strong>${key}:</strong> ${value}</p>`;
    })
    .join("");

  return {
    html: `<div>${htmlContent}</div>`,
    style: {
      backgroundColor: "white",
      padding: "5px",
      border: "1px solid black",
    },
  };
};
