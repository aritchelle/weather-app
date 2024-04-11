import { useQuery } from "@tanstack/react-query"
import { useCityStore, useMeasurementUnitStore } from "../store";

function getPastDate(day: number): string {
  const date = new Date();
  date.setDate(date.getDate() - day);
  return date.toISOString().split('T')[0];
}
export function useHistory() {
  const url = 'http://api.weatherapi.com/v1';
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const {city,cityCoordinates} = useCityStore();
  const date = new Date();
  const today = date.toISOString().split('T')[0];


  return useQuery({
    queryKey: ['history', city],
    queryFn: async () => {
      let res = await  fetch(`${url}/history.json?key=${apiKey}&q=${city}&dt=${getPastDate(10)}&end_dt=${getPastDate(1)}`);

      if(!res.ok) {
        throw new Error("Failed to fetch data");
      }else {
        return await res.json();
      }
    },
    enabled: city != "",
    refetchOnMount: false,
    staleTime: 1
  })
}