import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getCitiesByProvinceId } from "./api";
import { CITY_KEY } from "./config";

type CityInputProps = {
  value: number | null;
  onChange: (newValue: number | null) => void;
  provinceId: number | null;
};

export const CityInput = ({ onChange, provinceId, value }: CityInputProps) => {
  const query = useQuery({
    queryKey: [CITY_KEY, { provinceId }],
    queryFn: getCitiesByProvinceId.bind(null, provinceId!),
    enabled: !!provinceId,
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
