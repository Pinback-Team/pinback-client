import { QueryClient } from "@tanstack/react-query";
import queryClientOptions from "./queryClientOptions";

const makeQueryClient = () => {
  return new QueryClient(queryClientOptions);
};

let browserQueryClient: QueryClient | undefined;

const getQueryClient = () => {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

export default getQueryClient;