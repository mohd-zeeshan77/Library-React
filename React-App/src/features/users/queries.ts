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
export function useMembersQuery() {
  return useQuery({
    queryKey: MEMBER_KEY,
    queryFn: async () => {
      return await ApiService.get<Master.MemberItem[]>("members");
    },
  });
}
export function useMemberTypeMutation(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, memberId }: { id: number; memberId: number }) => {
      return await ApiService.patch(`users/userid/${id}`, { memberId });
    },
    onSuccess: (result) => {
      if (!result) return;
      const existing = queryClient.getQueryData<Master.UserItems[]>(QUERY_KEY);
      if (!existing) return;

      const index = existing.findIndex((item) => item.id === id);
      const first = existing.slice(0, index);
      const next = existing.slice(index + 1);
      queryClient.setQueryData(QUERY_KEY, [...first, result, ...next]);
    },
  });
}
