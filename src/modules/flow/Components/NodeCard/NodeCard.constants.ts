import { NodeType } from "@/modules/flow/domain";

export const textContent = {
  [NodeType.LAYER]: "Layer",
  [NodeType.SOURCE]: "Source",
};

export const pointerClassName = {
  [NodeType.LAYER]: "left",
  [NodeType.SOURCE]: "right",
};
