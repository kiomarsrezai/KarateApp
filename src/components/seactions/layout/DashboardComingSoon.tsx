type CommingSoonProps = {
  content?: string;
};

export const DashboardComingSoon = ({
  content = "در انتظار تایید مدارک و صدور کارت عضویت",
}: CommingSoonProps) => {
  return (
    <div className="py-10 text-center">
      <p className="font-medium">{content}</p>
    </div>
  );
};
