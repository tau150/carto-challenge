import type { Node } from "@xyflow/react";
import { NodeType } from "@/modules/flow/domain";

export type SourceNodeType = Node<
  { value: string; id: string; selected: boolean },
  NodeType.SOURCE
>;
