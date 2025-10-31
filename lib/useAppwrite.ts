import {Alert} from "react-native";
import {Models} from "react-native-appwrite";
import {useEffect, useState} from "react";

type TFn<D> = (...args: unknown[]) => Promise<D>;

export function useAppwrite<D extends Models.DefaultRow, Fn extends TFn<D[]>>(
  fn: Fn,
) {
  const [data, setData] = useState<D[]>([] as D[]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await fn();

      setData(res);
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Unknown error",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return {data, loading, refetch};
}

export default useAppwrite;
