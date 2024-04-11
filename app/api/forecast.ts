import { useQuery } from "@tanstack/react-query"
import { useCityStore, useMeasurementUnitStore } from "../store";

export function useForecast(lat: number, lon: number) {
  const url = 'https://api.openweathermap.org/data/2.5';
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
  const {unit}  = useMeasurementUnitStore();
  const {city,cityCoordinates} = useCityStore();


  return useQuery({
    queryKey: ['forecast',city,unit],
    queryFn: async () => {
      let res = await  fetch(`${url}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`);

      if(!res.ok) {
        throw new Error("Failed to fetch data");
      }else {
        return await res.json();
      }
    },
    enabled: city != ""
  })
}