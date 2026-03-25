import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiService } from "../../services";

const QUERY_KEY = ["@users"];

export function useUsersQuery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      return await ApiService.get<Master.UserItems[]>("users");
    },
  });
}

export function useNewUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      typeId,
      user,
    }: {
      typeId: number;
      user: Master.UserForm;
    }) => await ApiService.post<Master.UserItems>(`users/type/${typeId}`, user),
    onSuccess: (result) => {
      if (!result) return;
      const existing = queryClient.getQueryData<Master.UserItems[]>(QUERY_KEY);
      if (!existing) return;
      queryClient.setQueryData(QUERY_KEY, [...existing, result]);
    },
  });
}
const MEMBER_KEY = ["@members"];
export function useMembersForUsersQuery() {
  return useQuery({
    queryKey: MEMBER_KEY,
    queryFn: async () => {
      return await ApiService.get<Master.MemberTypeDto[]>("members");
    },
  });
}
