import { useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Upload } from "lucide-react";

interface UploadInputProps {
  onFileUpload: (file: File) => void;
}

export const UploadInput: React.FC<UploadInputProps> = ({ onFileUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (!e.target.files.length) return;

    const file = e.target.files[0];

    onFileUpload(file);

    e.target.value = "";
  };

  return (
    <>
      <Input
        className="sr-only hidden"
        type="file"
        accept=".csv"
        data-testid="upload-input"
        multiple={false}
        ref={inputRef}
        onChange={handleFileChange}
      />
      <Button
        variant={"outline"}
        data-testid="upload-button"
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="mr-2 h-4 w-4" />
        Upload
      </Button>
    </>
  );
};
