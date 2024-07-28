import { Edge } from "@xyflow/react";
import type { AvailableNodes } from "./Flow.types";

export const DROP_EFFECT = "move";
export const NODES_STORAGE_KEY = "nodes";
export const EDGES_STORAGE_KEY = "edges";
export const SUCCESS_SAVE_MESSAGE = "Your work was saved!";
export const SUCCESS_AUTO_SAVE_MESSAGE = "Your progress was saved automatically";
export const ERROR_SAVE_MESSAGE = "Error saving";
export const AUTO_SAVE_INTERVAL = 1000 * 60 * 5;

export const defaultNodes: AvailableNodes = [];
export const defaultEdges: Edge[] = [];
