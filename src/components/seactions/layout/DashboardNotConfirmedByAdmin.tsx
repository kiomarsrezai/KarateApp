type CommingSoonProps = {
  content?: string;
};

export const DashboardNotConfirmedByAdmin = ({
  content = "حساب شما هنوز توسط مدیریت تایید نشده است",
}: CommingSoonProps) => {
  return (
    <div className="py-10 text-center">
      <p className="font-medium">{content}</p>
    </div>
  );
};
