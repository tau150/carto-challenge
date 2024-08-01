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

const fetchGeoJson = async (url: string): Promise<FeatureCollection> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error in the URL: ${url}`);
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

            results[index] = dataToStore;
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Something went wrong";

            fetchErrors.push({ url: urlValue, error: errorMessage });
          }
        } else {
          const errorMessage = `invalid URL: ${url}`;

          fetchErrors.push({ url: urlValue, error: errorMessage });
        }
      });

      await Promise.allSettled(fetchPromises);
      cache[collectionId] = { results, errors: fetchErrors };

      setIsLoading(false);
      setData(results);
      setErrors(fetchErrors);
    };

    if (sourcesList.length > 0) {
      fetchData();
    }
  }, [collectionId, sourcesList]);

  return { data, errors, isLoading };
};
