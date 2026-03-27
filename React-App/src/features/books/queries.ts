import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiService } from "../../services";

const QUERY_KEY = ["@books"];

export function useBooksQuery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      return await ApiService.get<Master.BookItem[]>("books");
    },
  });
}
export function useNewBookMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      categoryId,
      book,
    }: {
      categoryId: number;
      book: Master.BookForm;
    }) =>
      await ApiService.post<Master.BookItem>(
        `books/category/${categoryId}`,
        book,
      ),

    onSuccess: (result) => {
      if (!result) return;

      const existing = queryClient.getQueryData<Master.BookItem[]>(QUERY_KEY);
      if (!existing) return;

      queryClient.setQueryData(QUERY_KEY, [...existing, result]);
    },
  });
}
