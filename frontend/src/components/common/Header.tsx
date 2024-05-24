import { UploadInput } from "./UploadInput";
import { SearchInput } from "./SearchInput";

interface HeaderProps {
  onSearchChange: (term: string) => void;
  onFileUpload: (file: File) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchChange,
  onFileUpload,
}) => {
  return (
    <header className="flex justify-center bg-white drop-shadow-lg h-16">
      <div className="flex items-center justify-between w-full max-w-screen-xl px-8">
        <SearchInput onSearchChange={onSearchChange} />
        <UploadInput onFileUpload={onFileUpload} />
      </div>
    </header>
  );
};
