import "./FlowPlayground.css";
import { ContentContainer, NodesContainer } from "./FlowPlayground.styled";
import { FlowContentContainer } from "./FlowPlayground.styled";
import { Flow, SidePanel, SourceNodeCard, NodeCard } from "@/modules/flow/Components";
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
