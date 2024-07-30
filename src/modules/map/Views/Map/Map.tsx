import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DeckGL from "@deck.gl/react";
import { Map as ReactMap } from "react-map-gl";
import toast from "react-simple-toasts";
import { ImSpinner7 } from "react-icons/im";
import { MapContainer, ButtonContainer, LoadingContainer } from "./Map.styled";
import { MAP_STYLE, INITIAL_VIEW_STATE, BASE_ERRORS_MESSAGE } from "./Map.constants";
import { getLayers, getSources, getTooltip } from "./Map.utils";
import { useFetchSources } from "./hooks/useFetchSources";
import { Routes } from "@/router";
import { useFlowData } from "@/hooks";
import { Button } from "@/Components";

export const Map = () => {
  const navigate = useNavigate();
  const { flowData } = useFlowData();

  const sources = useMemo(() => getSources(flowData), [flowData]);
  const { data, isLoading, errors } = useFetchSources(sources);

  useEffect(() => {
    if (errors.length > 0) {
      const errorsToShow = errors.map((error) => error.error).join(", ");
      const message = `${BASE_ERRORS_MESSAGE}, ${errorsToShow}`;

      toast(message);
    }
  }, [errors]);

  if (isLoading || !data) {
    return (
      <LoadingContainer data-testid="map-loader">
        <ImSpinner7 />
      </LoadingContainer>
    );
  }

  const layers = getLayers(data);

  const handleGoToFlowClick = () => {
    navigate(Routes.FLOW);
  };

  return (
    <div>
      <ButtonContainer>
        <Button onClick={handleGoToFlowClick}>Flow</Button>
      </ButtonContainer>
      <MapContainer>
        <div>
          <DeckGL
            controller={true}
            getTooltip={getTooltip}
            initialViewState={INITIAL_VIEW_STATE}
            layers={layers}
          >
            <ReactMap
              mapStyle={MAP_STYLE}
              mapboxAccessToken={import.meta.env.VITE_MAP_BOX_API_KEY}
            />
          </DeckGL>
        </div>
      </MapContainer>
    </div>
  );
};
