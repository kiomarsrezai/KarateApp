type CommingSoonProps = {
  content?: string;
};

export const DashboardComingSoon = ({
  content = "این خدمات به زودی در دسترس قرار خواهد گرفت",
}: CommingSoonProps) => {
  return (
    <div className="py-10 text-center">
      <p className="font-medium">{content}</p>
    </div>
  );
};
