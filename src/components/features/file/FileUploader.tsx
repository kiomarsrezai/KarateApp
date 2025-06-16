import React, { createContext, useContext, useRef, useState } from "react";
import { Button, ButtonProps } from "~/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { uploadFileApi } from "./api";

type Context = {
  value: null | string;
  loading: boolean;
  openFileChooser: () => void;
  uploadedFile: File | null;
  progress: number;
};

const context = createContext<Context>({
  value: null,
  loading: false,
  uploadedFile: null,
  progress: 0,
  openFileChooser: () => {},
});

type Props = {
  value: null | string;
  onChangeValue: (newValue: null | string) => void;
  accept?: string;
  children?: React.ReactNode;
  type: string;
};

export const FileUploaderContainer = ({
  accept,
  value,
  onChangeValue,
  children,
  type,
}: Props) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: uploadFileApi,
    onSuccess(data, formValues) {
      setUploadedFile(formValues.file);
      onChangeValue(data.path);
    },
  });
  const fileInputElement = useRef<HTMLInputElement>(null);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return null;
    setProgress(0);
    mutation.mutate({ file: selectedFile, type, onProgress: setProgress });
  };

  return (
    <context.Provider
      value={{
        value,
        loading: mutation.isPending,
        uploadedFile,
        progress,
        openFileChooser: () => {
          fileInputElement.current?.click();
        },
      }}
    >
      <input
        type="file"
        className="hidden"
        ref={fileInputElement}
        onChange={onFileChange}
        accept={accept}
      />

      {children}
    </context.Provider>
  );
};

export const useFileUploader = () => {
  return useContext(context);
};

export const FileUploaderTrigger = ({ children, ...props }: ButtonProps) => {
  const { openFileChooser } = useFileUploader();
  return (
    <Button {...props} onClick={openFileChooser}>
      {children}
    </Button>
  );
};
