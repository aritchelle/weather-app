import { PropsType } from "@/utils/types";
import { useQuery } from "@tanstack/react-query"
import { useCityStore, useMeasurementUnitStore } from "../store";
import { localeTimeZone } from "@/lib/helper";


export function useWeather() {
  const unit  = useMeasurementUnitStore((state)=> state.unit);
  const {city}  = useCityStore();
  const url = 'https://api.openweathermap.org/data/2.5/';
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

  return useQuery<PropsType>({
    queryKey: ['weather', city,unit],
    queryFn: async () => {
      let res = await  fetch(`${url}/weather?q=${city ? city : localeTimeZone()}&appid=${apiKey}&units=${unit}`);
      if(!res.ok) {
        throw new Error("Failed to fetch data");
      }else {
        return await res.json();
      }
    },
    enabled: city != null
  })
}