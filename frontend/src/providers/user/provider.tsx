import { useSearchUser } from "@/services/searchUser";
import { useUploadFile } from "@/services/uploadFile";
import { useCallback, useState } from "react";
import { UserContext } from "./context";

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [term, setTerm] = useState<string>("");

  const { data, isLoading, error } = useSearchUser(term);
  const { mutate } = useUploadFile();

  const searchUser = useCallback(
    async (newTerm: string) => {
      setTerm(newTerm);
    },
    [setTerm]
  );

  const uploadFile = useCallback(
    async (file: File) => {
      mutate(file);
    },
    [mutate]
  );

  return (
    <UserContext.Provider
      value={{
        users: data || [],
        term,
        isLoading,
        searchUser,
        uploadFile,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
