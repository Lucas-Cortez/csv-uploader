import { axiosInstance } from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  await axiosInstance.post("/api/files", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const useUploadFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      toast.success("File uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["search-user"] });
    },
    onError: (error) => {
      console.log(error);

      const message =
        error instanceof AxiosError
          ? error.response?.data.message
          : error.message;

      toast.error("An error occurred while uploading the file", {
        description: message,
      });
    },
  });
};
