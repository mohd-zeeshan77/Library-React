import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { ApiService } from "../../services";

const QUERY_KEY = ["@issued"];

export function useIssuedQuery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      return await ApiService.get<Master.IssuedItem[]>("issued");
    },
  });
}

export function useNewIssuedMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookId,
      userId,
      dues,
    }: {
      userId: number;
      bookId: number;
      dues: number;
    }) => {
      return await ApiService.post<Master.IssuedItem>(
        `issued/book/${bookId}/user/${userId}`,
        { dues },
      );
    },

    onSuccess: (result) => {
      if (!result) return;

      const existing = queryClient.getQueryData<Master.IssuedItem[]>(QUERY_KEY);

      if (!existing) return;

      queryClient.setQueryData(QUERY_KEY, [...existing, result]);
    },
  });
}
