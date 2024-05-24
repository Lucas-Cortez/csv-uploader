import { useUserContext } from "@/providers/user/context";
import { CardsList } from "../common/CardsList";
import { Header } from "../common/Header";

export const HomePageTemplate: React.FC = () => {
  const { isLoading, users, searchUser, uploadFile } = useUserContext();

  return (
    <>
      <Header onSearchChange={searchUser} onFileUpload={uploadFile} />
      <CardsList isLoading={isLoading} users={users} />
    </>
  );
};
