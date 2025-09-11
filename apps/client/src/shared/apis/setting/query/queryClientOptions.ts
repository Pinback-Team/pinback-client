const queryClientOptions = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
};

export default queryClientOptions;