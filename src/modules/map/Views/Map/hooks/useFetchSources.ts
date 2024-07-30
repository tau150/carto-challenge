import { useState, useEffect } from "react";
import { FeatureCollection } from "geojson";
import { isValidUrl } from "../Map.utils";

interface SourceError {
  url: string;
  error: string;
}

interface UseFetchSourcesReturn {
  data: FeatureCollection[];
  errors: SourceError[];
  isLoading: boolean;
}

let cache: Record<string, FeatureCollection[]> = {};

export const useFetchSources = (sourcesList: string[]): UseFetchSourcesReturn => {
  const [data, setData] = useState<FeatureCollection[]>([]);
  const [errors, setErrors] = useState<SourceError[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const results: FeatureCollection[] = [];
      const fetchErrors: SourceError[] = [];

      setIsLoading(true);
      const uniqueUrlsIdentifier = sourcesList.join("-");

      if (cache[uniqueUrlsIdentifier]) {
        setData(cache[uniqueUrlsIdentifier]);
        setIsLoading(false);

        return;
      }

      const fetchPromises = sourcesList.map(async (url, index) => {
        if (isValidUrl(url)) {
          try {
            const response = await fetch(url);

            if (!response.ok) {
              throw new Error(`Error in the URL: ${url}`);
            }
            const json = await response.json();

            results[index] = json;
            cache = { ...cache, [uniqueUrlsIdentifier]: results };
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Something went wrong";

            fetchErrors.push({ url, error: errorMessage });
          }
        } else {
          const errorMessage = `invalid URL: ${url}`;

          fetchErrors.push({ url, error: errorMessage });
        }
      });

      await Promise.allSettled(fetchPromises);

      setIsLoading(false);
      setData(results);
      setErrors(fetchErrors);
    };

    fetchData();
  }, [sourcesList]);

  return { data, errors, isLoading };
};
