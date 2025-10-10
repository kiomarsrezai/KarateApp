import { useRef, useState } from "react";
import html2canvas from "html2canvas";

export const useToImage = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const handleCapture = async () => {
    if (!cardRef.current) return;
    try {
      setLoading(true);
      const canvas = await html2canvas(cardRef.current, { allowTaint: true });
      const dataURL = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "screenshot.png";
      link.click();
    } catch (er) {
      throw er;
    } finally {
      setLoading(false);
    }
  };

  return {
    toImage: handleCapture,
    ref: cardRef,
    isPending: loading,
  };
};
