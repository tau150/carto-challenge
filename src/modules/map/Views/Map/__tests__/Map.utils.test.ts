import { GeoJsonLayer, IconLayer, PathLayer, PickingInfo } from "deck.gl";
import { getLayersCollection, getTooltip } from "../Map.utils";
import { DataToStore } from "../hooks/useFetchSources";

describe("getLayersCollection", () => {
  const mockData: DataToStore[] = [
    {
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: { type: "Point", coordinates: [0, 0] },
            properties: {},
          },
        ],
      },
      combinationRef: undefined,
    },
    {
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [[0] as unknown as [number, number], [0] as unknown as [number]],
              ] as unknown as number[][],
            },
            properties: {},
          },
        ],
      },
      combinationRef: undefined,
    },
    {
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "MultiPolygon",
              coordinates: [
                [[0, 1] as unknown as [number, number], [0, 6] as unknown as [number, number]],
              ] as unknown as number[][][][],
            },
            properties: {},
          },
        ],
      },
    },
    {
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "MultiPolygon",
              coordinates: [
                [[0, 1] as unknown as [number, number], [0, 6] as unknown as [number, number]],
              ] as unknown as number[][][][],
            },
            properties: {},
          },
        ],
      },
      combinationRef: "111",
    },
    {
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "MultiPolygon",
              coordinates: [
                [[0, 1] as unknown as [number, number], [0, 6] as unknown as [number, number]],
              ] as unknown as number[][][][],
            },
            properties: {},
          },
        ],
      },
      combinationRef: "111",
    },
  ];

  it("should return layers for different geometries", () => {
    const layers = getLayersCollection(mockData);

    expect(layers.length).toBe(4);
    expect(layers[0]).toBeInstanceOf(IconLayer);
    expect(layers[1]).toBeInstanceOf(PathLayer);
    expect(layers[2]).toBeInstanceOf(GeoJsonLayer);
    expect(layers[3]).toBeInstanceOf(GeoJsonLayer);
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
