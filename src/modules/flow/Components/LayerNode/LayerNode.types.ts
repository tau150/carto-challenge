import type { Node } from "@xyflow/react";
import { NodeType } from "@/modules/flow/domain";

export type LayerNodeType = Node<{ selected: boolean }, NodeType.LAYER>;
