import { UrlStore, FlowData } from "./FlowDataContext.types";
import type { Edge, Node } from "@xyflow/react";

interface SourceWithPosition {
  urls: string | string[];
  yTargetPosition: number;
  source: string;
}

export const getSources = (data: FlowData): string[] | UrlStore[] => {
  const nodeMap = data.nodes.reduce((map: Record<string, Node>, node: Node) => {
    map[node.id] = node;

    return map;
  }, {});

  const sourcesMap = data.edges.reduce((acc: Record<string, SourceWithPosition>, edge: Edge) => {
    const sourceUrl = nodeMap[edge.source].data.value as string;
    const targetNode = nodeMap[edge.target];

    if (!sourceUrl) return acc;

    if (!acc[edge.target]) {
      acc[edge.target] = {
        urls: sourceUrl,
        yTargetPosition: targetNode.position.y,
        source: edge.source,
      };
    } else {
      acc[edge.target].urls = [acc[edge.target].urls, sourceUrl] as string[];
    }

    return acc;
  }, {});

  const sourcesWithYPosition = Object.values(sourcesMap)
    .sort((a, b) => a.yTargetPosition - b.yTargetPosition)
    .map((el) => {
      if (Array.isArray(el.urls)) {
        return el.urls.map((url) => ({ [el.source]: { url } }));
      }

      return el.urls;
    })
    .flat();

  return sourcesWithYPosition as UrlStore[];
};
