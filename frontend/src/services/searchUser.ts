import { axiosInstance } from "@/config/axios";
import { IUser } from "@/entities/user";
import { useQuery } from "@tanstack/react-query";

export const searchUser = async (term?: string) => {
  const response = await axiosInstance.get<{ data: IUser[] }>("/api/users", {
    params: { q: term },
  });

  return response.data.data;
};

export const useSearchUser = (term?: string) => {
  return useQuery<IUser[]>({
    queryKey: ["search-user", term],
    queryFn: () => searchUser(term),
  });
};
