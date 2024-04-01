import getCreditByID from "@/actions/credit";
import { usePathname, useSearchParams } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { TCredit } from "types";

export default function useCredit() {
  const [credit, setCredit] = useState<TCredit>();
  const [isLoading, setLoading] = useState(true);
  const pathname = usePathname();

  const getData = async () => {
    const response = await getCreditByID(pathname.replace("/credit/", ""));
    setCredit(response);
    setLoading(false);
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  return { credit, isLoading };
}
