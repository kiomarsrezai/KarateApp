import Image from "next/image";

type ArtDesignProps = {
  side: "Left" | "Right";
};

export const ArtDesign = ({ side }: ArtDesignProps) => {
  const imageUrl =
    side == "Right"
      ? `/art/art-right-side.jpg`
      : side === "Left"
      ? `/art/art-left-side.jpg`
      : null;

  if (!imageUrl) return null;

  return <Image src={imageUrl} alt="art right side" width={240} height={240} />;
};
