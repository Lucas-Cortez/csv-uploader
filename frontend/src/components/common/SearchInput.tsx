import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useDebounce } from "use-debounce";

interface SearchInputProps {
  onSearchChange: (term: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearchChange }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [term] = useDebounce(inputValue, 500);

  useEffect(() => {
    onSearchChange(term);
  }, [term, onSearchChange]);

  return (
    <div className="flex items-center justify-between">
      <Input
        data-testid="search-input"
        placeholder="Search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></Input>
    </div>
  );
};
