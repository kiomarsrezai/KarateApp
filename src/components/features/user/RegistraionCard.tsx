type ContentShape = {
  label: string;
  value: string;
};

type ContentItemProps = {
  data: ContentShape;
};
const ContentItem = ({ data }: ContentItemProps) => {
  return (
    <li>
      <div>{data.label}</div>
      <div>{data.value}</div>
    </li>
  );
};

const ContentList = () => {
  const items: ContentShape[] = [
    {
      label: "نام و نام خانوادگی",
      value: "Salam",
    },
    {
      label: "سمت",
      value: "Salam",
    },
    {
      label: "کمربند (درجه)",
      value: "Salam",
    },
    {
      label: "اعتبار عضویت",
      value: "Salam",
    },
  ];
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item, i) => (
        <ContentItem key={i} data={item} />
      ))}
    </ul>
  );
};
export const RegistraionCard = () => {
  return (
    <div className="w-[400px] bg-[#d72638] text-white rounded-4xl overflow-hidden">
      <ContentList />
    </div>
  );
};
