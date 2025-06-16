import { UploadIcon } from "lucide-react";
import {
  FileUploaderContainer,
  useFileUploader,
} from "~/components/features/file/FileUploader";
import { AnimatedCircularProgressBar } from "~/components/ui/animated-circular-progress-bar";

const FileCard = () => {
  const { loading, openFileChooser, uploadedFile, progress } =
    useFileUploader();

  return (
    <div
      className="border-2 border-dashed h-60 rounded-xl flex items-center justify-evenly cursor-pointer"
      onClick={openFileChooser}
    >
      {loading ? (
        <>
          <p className="text-layer-foreground/50">بارگذاری فایل</p>
          <AnimatedCircularProgressBar
            value={progress}
            max={100}
            min={0}
            gaugePrimaryColor="rgb(79 70 229)"
            gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
            suffix="%"
            className="size-20 text-xs"
          />
        </>
      ) : uploadedFile ? (
        <div className="text-center">
          <p className="text-layer-foreground/50">بارگذاری موفق</p>
          <p className="mt-1">{`"${uploadedFile.name}"`}</p>
        </div>
      ) : (
        <>
          <p className="text-layer-foreground/50">بارگذاری فایل</p>
          <UploadIcon className="size-10 text-layer-foreground/50" />
        </>
      )}
    </div>
  );
};

type FilePickerCardProps = {
  value: null | string;
  onChange: (newValue: null | string) => void;
};
export const FilePickerCard = ({ onChange, value }: FilePickerCardProps) => {
  return (
    <FileUploaderContainer
      value={value}
      onChangeValue={onChange}
      type="certificate"
    >
      <FileCard />
    </FileUploaderContainer>
  );
};
