import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useCityStore, useMeasurementUnitStore } from "../store";

export function useGeo() {
  const url = 'https://api.openweathermap.org/geo/1.0/';
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
  const {city} = useCityStore();
  const queryClient = useQueryClient();


  return useQuery({
    queryKey: ['geoCoding', city],
    queryFn: async () => {
      let res = await  fetch(`${url}/direct?q=${city}&appid=${apiKey}`);

      if(!res.ok) {
        throw new Error("Failed to fetch data");
      }else {
        return await res.json();
      }
    },
    enabled: city != ""
  })
}