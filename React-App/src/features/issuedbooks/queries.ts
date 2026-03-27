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
      issued,
    }: {
      bookId: number;
      userId: number;
      issued: Master.IssuedForm;
    }) => {
      return await ApiService.post<Master.IssuedItem>(
        `issued/book/${bookId}/user/${userId}`,
        { issued },
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
export function useReturnBookMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookId,
      userId,
      isReturned,
    }: {
      bookId: number;
      userId: number;
      isReturned: boolean;
    }) => {
      return await ApiService.patch(
        `issued/book/${bookId}/user/${userId}/returned`,
        { boolRequest: isReturned },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
export function useRenewBookMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookId,
      userId,
      renewStatus,
    }: {
      bookId: number;
      userId: number;
      renewStatus: boolean;
    }) => {
      return await ApiService.patch(
        `issued/book/${bookId}/user/${userId}/renew`,
        { boolRequest: renewStatus },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
