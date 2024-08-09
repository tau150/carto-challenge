import { useState, useEffect } from "react";
import { FeatureCollection } from "geojson";
import type { UrlStore } from "../Map.types";
import { isValidUrl } from "@/utils";

interface SourceError {
  url: string;
  error: string;
}

interface UseFetchSourcesReturn {
  data: DataToStore[];
  errors: SourceError[];
  isLoading: boolean;
  cacheHash?: string;
}

export type DataToStore = { data: FeatureCollection; combinationRef?: string };

const ERROR_FETCHING_MESSAGE = "Error fetching";

const fetchGeoJson = async (url: string): Promise<FeatureCollection> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${ERROR_FETCHING_MESSAGE}: ${url}`);
  }

  const result = await response.json();

  if (result?.type !== "FeatureCollection") {
    throw new Error(`Invalid GeoJSON format for URL: ${url}`);
  }

  return result;
};

interface CacheStore {
  [key: string]: {
    results: DataToStore[];
    errors: SourceError[];
  };
}

let cache: CacheStore = {};

export const resetCache = () => {
  cache = {};
};

export const useFetchSources = (
  sourcesList: string[] | UrlStore[],
  collectionId: string,
): UseFetchSourcesReturn => {
  const [data, setData] = useState<DataToStore[]>([]);
  const [errors, setErrors] = useState<SourceError[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const results: DataToStore[] = [];
      const fetchErrors: SourceError[] = [];
      const resourceErrors: SourceError[] = [];

      setIsLoading(true);

      if (cache[collectionId]) {
        setData(cache[collectionId].results);
        setErrors(cache[collectionId].errors);
        setIsLoading(false);

        return;
      }

      const fetchPromises = sourcesList.map(async (url, index) => {
        const isUrlForCombine = typeof url === "object";
        let combinationRef;
        let urlValue;

        if (isUrlForCombine) {
          const [reference, urlObject] = Object.entries(url)[0];

          urlValue = urlObject.url;
          combinationRef = reference;
        } else {
          urlValue = url;
        }

        if (isValidUrl(urlValue)) {
          try {
            const json = await fetchGeoJson(urlValue);

            const dataToStore = { data: json, combinationRef, order: index };

            results.push(dataToStore);
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Something went wrong";

            const isFetchError = errorMessage.includes(ERROR_FETCHING_MESSAGE); // TODO: replace this for a specific error type

            isFetchError
              ? fetchErrors.push({ url: urlValue, error: errorMessage })
              : resourceErrors.push({ url: urlValue, error: errorMessage });
          }
        } else {
          const urlDescription = typeof url === "string" ? url : url[Object.keys(url)[0]].url;
          const errorMessage = `invalid URL: ${urlDescription}`;

          resourceErrors.push({ url: urlValue, error: errorMessage });
        }
      });

      await Promise.allSettled(fetchPromises);

      if (fetchErrors.length === 0) {
        cache[collectionId] = { results, errors: resourceErrors };
      }

      setIsLoading(false);

      setData(results);
      setErrors([...fetchErrors, ...resourceErrors]);
    };

    if (sourcesList.length > 0) {
      fetchData();
    }
  }, [collectionId, sourcesList]);

  return { data, errors, isLoading };
};
