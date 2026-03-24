import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiService } from "../../services";

const QUERY_KEY = ["@categories"];

export function useCategoryQuery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      return await ApiService.get<Master.CategoryItem[]>("categories");
    },
  });
}
export function useNewCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (category: Master.CategoryForm) =>
      await ApiService.post<Master.CategoryItem>("categories", category),
    onSuccess: (result) => {
      if (!result) {
        return;
      }
      const existing =
        queryClient.getQueryData<Master.CategoryItem[]>(QUERY_KEY);
      if (!existing) {
        return;
      }
      queryClient.setQueryData(QUERY_KEY, [...existing, result]);
    },
  });
}
