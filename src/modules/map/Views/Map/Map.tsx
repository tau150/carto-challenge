import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeckGL from "@deck.gl/react";
import { Map as ReactMap } from "react-map-gl";
import toast from "react-simple-toasts";
import { ImSpinner7 } from "react-icons/im";
import { Layer } from "deck.gl";
import { MapContainer, ButtonContainer, LoadingContainer } from "./Map.styled";
import { MAP_STYLE, INITIAL_VIEW_STATE, BASE_ERRORS_MESSAGE } from "./Map.constants";
import { getLayersCollection, getTooltip } from "./Map.utils";
import { useFetchSources } from "./hooks/useFetchSources";
import { Routes } from "@/router";
import { useFlowData } from "@/hooks";
import { Button } from "@/Components";

export const Map = () => {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [isProcessingLayers, setIsProcessingLayers] = useState(true);
  const { collectionId, sources } = useFlowData();

  const navigate = useNavigate();
  const { data, isLoading: isLoadingResources, errors } = useFetchSources(sources, collectionId);

  useEffect(() => {
    if (errors.length > 0) {
      const errorsToShow = errors.map((error) => error.error);

      errorsToShow.forEach((error) => {
        const message = `${BASE_ERRORS_MESSAGE}, ${error}`;

        toast(message);
      });
    }
  }, [errors]);

  useEffect(() => {
    if (data) {
      const generatedLayers = getLayersCollection(data);

      setIsProcessingLayers(false);
      setLayers(generatedLayers as Layer[]);
    }
  }, [data]);

  if (isLoadingResources || isProcessingLayers) {
    return (
      <LoadingContainer data-testid="map-loader">
        <ImSpinner7 />
      </LoadingContainer>
    );
  }

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
