import "./FlowPlayground.css";
import { ContentContainer, NodesContainer } from "./FlowPlayground.styled";
import { FlowContentContainer } from "./FlowPlayground.styled";
import { Flow } from "@/modules/flow/Components";
import {
  SidePanel,
  SourceNodeCard,
  NodeCard,
} from "@/modules/flow/Components/SidePanel/Components";
import { NodeType } from "@/modules/flow/domain";

export const FlowPlayground = () => {
  return (
    <>
      <ContentContainer>
        <SidePanel>
          <NodesContainer>
            <SourceNodeCard />
            <NodeCard nodeType={NodeType.LAYER} />
          </NodesContainer>
        </SidePanel>
        <FlowContentContainer>
          <Flow />
        </FlowContentContainer>
      </ContentContainer>
    </>
  );
};
