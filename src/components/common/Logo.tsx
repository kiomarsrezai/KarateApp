import Image from "next/image";

type LogoProps = React.ComponentProps<"div">;

export const Logo = (props: LogoProps) => {
  return (
    <div className="size-14" {...props}>
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={200}
        height={200}
        className="size-full"
      />
    </div>
  );
};
