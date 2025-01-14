import { useQuery } from "@tanstack/react-query";
import { getUsers } from "apis/users";

const lawyersParams = `group=4&op=eq`;

const useLawyers = (token: any) => {
  return useQuery(
    ["abogadosAPTD", lawyersParams],
    () => getUsers(token, lawyersParams),
    {
      staleTime: 24 * 60 * 60 * 1000, // 24 hours
    }
  );
};

export default useLawyers;
