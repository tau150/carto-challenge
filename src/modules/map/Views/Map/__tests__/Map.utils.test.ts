import { Edge } from "@xyflow/react";
import { FeatureCollection } from "geojson";
import { GeoJsonLayer, IconLayer, PickingInfo } from "deck.gl";
import { isValidUrl, getSources, getLayers, getTooltip } from "../Map.utils";
import type { FlowData } from "@/contexts";
import type { AvailableNodes } from "@/modules/flow/domain";
describe("isValidUrl", () => {
  it("should return true for a valid URL", () => {
    expect(isValidUrl("https://www.example.com")).toBe(true);
  });

  it("should return false for an invalid URL", () => {
    expect(isValidUrl("not-a-valid-url")).toBe(false);
  });

  it("should return false for an empty string", () => {
    expect(isValidUrl("")).toBe(false);
  });
});

describe("getSources", () => {
  const flowData: FlowData = {
    nodes: [
      { id: "1", data: { value: "https://node1.com" }, position: { y: 100 } },
      { id: "2", position: { y: 200 } },
      { id: "3", data: { value: "https://node2.com" }, position: { y: 100 } },
      { id: "4", position: { y: 400 } },
    ] as AvailableNodes,
    edges: [
      { source: "1", target: "2" },
      { source: "3", target: "4" },
    ] as Edge[],
  };

  it("should return sorted URLs based on yTargetPosition", () => {
    const result = getSources(flowData);

    expect(result).toEqual(["https://node1.com", "https://node2.com"]);
  });
});

describe("getLayers", () => {
  const mockData: FeatureCollection[] = [
    {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: { type: "Point", coordinates: [0, 0] },
          properties: {},
        },
      ],
    },
    {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [0, 0],
                [1, 1],
                [1, 0],
                [0, 0],
              ],
            ],
          },
          properties: {},
        },
      ],
    },
  ];

  it("should return layers for different geometries", () => {
    const layers = getLayers(mockData);

    expect(layers.length).toBe(2);
    expect(layers[0]).toBeInstanceOf(IconLayer);
    expect(layers[1]).toBeInstanceOf(GeoJsonLayer);
  });
});

describe("getTooltip", () => {
  it("should return null if object is null", () => {
    expect(getTooltip({ object: null } as PickingInfo)).toBeNull();
  });

  it("should return tooltip HTML for valid object", () => {
    const object = { properties: { key1: "value1", key2: "value2" } };
    const result = getTooltip({ object } as PickingInfo);

    expect(result).toEqual({
      html: "<div><p key=key1><strong>key1:</strong> value1</p><p key=key2><strong>key2:</strong> value2</p></div>",
      style: {
        backgroundColor: "white",
        padding: "5px",
        border: "1px solid black",
      },
    });
  });
});
