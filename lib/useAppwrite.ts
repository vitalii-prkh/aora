import {Alert} from "react-native";
import {useEffect, useState} from "react";

// Generic helpers to infer function argument and return types
type AwaitedReturn<F extends (...args: any) => Promise<any>> = Awaited<
  ReturnType<F>
>;

type ArgOf<F> = F extends (arg: infer A) => any ? A : undefined;

// Overloads for better inference and required args enforcement
export function useAppwrite<F extends () => Promise<any>>(
  fn: F,
): {
  data: AwaitedReturn<F>;
  loading: boolean;
  refetch: () => Promise<void>;
};
export function useAppwrite<F extends (arg: A) => Promise<any>, A>(
  fn: F,
  arg: A,
): {
  data: AwaitedReturn<F>;
  loading: boolean;
  refetch: (nextArg?: A) => Promise<void>;
};

// Implementation
export function useAppwrite<F extends (...args: any[]) => Promise<any>, A>(
  fn: F,
  arg?: A,
) {
  const [data, setData] = useState<AwaitedReturn<F>>(
    [] as unknown as AwaitedReturn<F>,
  );
  const [loading, setLoading] = useState(true);

  const fetchData = async (nextArg?: A) => {
    setLoading(true);

    try {
      const effectiveArg = (nextArg !== undefined ? nextArg : arg) as ArgOf<F>;
      const res: AwaitedReturn<F> = await fn(effectiveArg);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refetch = (nextArg?: A) => fetchData(nextArg);

  return {data, loading, refetch};
}

export default useAppwrite;
