import { createContext, useContext } from "react";
import { IUser } from "@/entities/user";

type UserContextType = {
  users: IUser[];
  term: string;
  isLoading: boolean;
  error: Error | null;
  searchUser: (term: string) => Promise<void>;
  uploadFile: (file: File) => Promise<void>;
};

export const UserContext = createContext<UserContextType>(null!);

export const useUserContext = () => {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return ctx;
};
