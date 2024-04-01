import { getCredits } from "@/actions/credit";
import { useLayoutEffect, useState } from "react";
import { TCredit } from "types";

export default function useCredits() {
  const [credits, setCredit] = useState<TCredit[]>([]);
  const [isLoading, setLoading] = useState(true);

  const getData = async () => {
    const response = await getCredits();
    setCredit(response);
    setLoading(false);
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  return { credits, isLoading };
}
