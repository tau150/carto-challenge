import { FeatureCollection } from "geojson";
import { GeoJsonLayer, IconLayer, PathLayer } from "@deck.gl/layers";
import { PickingInfo } from "deck.gl";
import { LAYER_TYPES } from "./Map.constants";
import type { Node, Edge } from "@xyflow/react";
import type { LineString, MultiLineString } from "geojson";
import type { FlowData } from "@/contexts";

interface SourceWithPosition {
  url: string;
  yTargetPosition: number;
}

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);

    return true;
  } catch (e) {
    return false;
  }
};

export const getSources = (data: FlowData) => {
  const nodeMap = data.nodes.reduce((map: Record<string, Node>, node: Node) => {
    map[node.id] = node;

    return map;
  }, {});

  const sourcesWithYPosition = data.edges.reduce((acc: SourceWithPosition[], edge: Edge) => {
    return [
      ...acc,
      {
        url: nodeMap[edge.source].data.value as string,
        yTargetPosition: nodeMap[edge.target].position.y,
      },
    ];
  }, [] as SourceWithPosition[]);

  return sourcesWithYPosition
    .sort((a, b) => a.yTargetPosition - b.yTargetPosition)
    .map((el) => el.url);
};

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 70, height: 50, mask: true },
};

export const getLayers = (layersData: FeatureCollection[]) => {
  return layersData.map((layer) => {
    const type = layer.features[0].geometry.type;

    if (type === LAYER_TYPES.MULTI_POLYGON || type === LAYER_TYPES.POLYGON) {
      return new GeoJsonLayer({
        id: `geojson-layer-${Math.random()}`,
        data: layer.features,
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
        data: layer.features,
        pickable: true,
        iconAtlas: "../location-icon.png",
        iconMapping: ICON_MAPPING,
        sizeScale: 10,
        getIcon: () => "marker",
        getSize: () => 3,
        getPosition: (d) => d.geometry.coordinates,
        getColor: [17, 38, 65],
      });
    }

    if (type === LAYER_TYPES.LINE_STRING || type === LAYER_TYPES.MULTI_LINE_STRING) {
      return new PathLayer({
        id: `path-layer-${Math.random()}`,
        data: layer.features,
        pickable: true,
        getPath: (d) =>
          (d.geometry as LineString | MultiLineString).coordinates as [number, number][],
        getWidth: () => 5,
        getColor: [255, 0, 0],
      });
    }
  });
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
