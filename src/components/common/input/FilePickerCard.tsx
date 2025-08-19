import { UploadIcon } from "lucide-react";
import Image from "next/image";
import {
  FileUploaderContainer,
  useFileUploader,
} from "~/components/features/file/FileUploader";
import { AnimatedCircularProgressBar } from "~/components/ui/animated-circular-progress-bar";
import { getFilePathWithDefault } from "~/lib/utils";

const FileCard = () => {
  const { loading, openFileChooser, uploadedFile, progress, value } =
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
        <>
          <p className="text-layer-foreground/50">بارگذاری موفق</p>
          <a
            className="flex items-center gap-2 bg-layer/5 p-2 rounded-2xl hover:bg-layer/8 transition-colors"
            href={getFilePathWithDefault(value)}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getFilePathWithDefault(value)}
              alt="file"
              width={50}
              height={50}
            />
            <p className="text-sm">{`"${uploadedFile.name}"`}</p>
          </a>
        </>
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
  type: string;
};
export const FilePickerCard = ({
  onChange,
  value,
  type,
}: FilePickerCardProps) => {
  return (
    <FileUploaderContainer value={value} onChangeValue={onChange} type={type}>
      <FileCard />
    </FileUploaderContainer>
  );
};
