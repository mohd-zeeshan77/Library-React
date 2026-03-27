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
    }: {
      bookId: number;
      userId: number;
    }) => {
      return await ApiService.post<Master.IssuedItem>(
        `issued/book/${bookId}/user/${userId}`,
        { bookId, userId },
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
export function useReturnBookMutation(bookId: number, userId: number) {
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
    onSuccess: (result) => {
      if (!result) return;
      const existing = queryClient.getQueryData<Master.IssuedItem[]>(QUERY_KEY);
      if (!existing) return;
      const index = existing.findIndex(
        (item) => item.bookId === bookId && item.userId === userId,
      );
      const first = existing.slice(0, index);
      const next = existing.slice(index + 1);
      queryClient.setQueryData(QUERY_KEY, [...first, result, ...next]);
    },
  });
}
export function useRenewBookMutation(bookId: number, userId: number) {
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
    onSuccess: (result) => {
      if (!result) return;
      const existing = queryClient.getQueryData<Master.IssuedItem[]>(QUERY_KEY);
      if (!existing) return;
      const index = existing.findIndex(
        (item) => item.bookId === bookId && item.userId === userId,
      );
      const first = existing.slice(0, index);
      const next = existing.slice(index + 1);
      queryClient.setQueryData(QUERY_KEY, [...first, result, ...next]);
    },
  });
}
export function useDeleteIssueMutation() {
  const queryClient = useQueryClient();
  const rs = useMutation({
    mutationFn: (id: number) => ApiService.del(`issued/${id}`),
    onSuccess: (_, id) => {
      const data = queryClient.getQueryData<Master.IssuedItem[]>(QUERY_KEY);
      if (!data) return;
      const newData = data.filter((item) => item.id !== id);
      queryClient.setQueryData(QUERY_KEY, newData);
    },
  });
  return rs;
}
