import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getProvincesApi } from "./api";
import { PROVINCE_KEY } from "./config";

type ProvinceInputProps = {
  value: number | null;
  onChange: (newValue: number | null) => void;
};

export const ProvinceInput = ({ onChange, value }: ProvinceInputProps) => {
  const query = useQuery({
    queryKey: [PROVINCE_KEY],
    queryFn: getProvincesApi,
  });

  return (
    <Select
      value={String(value)}
      onValueChange={(newValue) => onChange(+newValue)}
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {query.data?.map((province) => (
          <SelectItem key={province.id} value={String(province.id)}>
            {province.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
