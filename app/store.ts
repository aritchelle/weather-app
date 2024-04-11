import { localeTimeZone } from "@/lib/helper";
import { TUnitStore } from "@/utils/types";
import { create } from "zustand";

type TCity = {
  city: string,
  setCity: (city: string) => void;
  cityCoordinates: {
    lat: number | undefined,
    lon: number | undefined };
  setCoordinates: (lat: number | undefined, lon: number | undefined) => void;
}

export const useCityStore = create<TCity>((set) => ({
  city: localeTimeZone(),
  setCity: (searchedCity: string) => {
    set(({ city: searchedCity }));
  },
  cityCoordinates: {
    lat: undefined,
    lon: undefined
  },
  setCoordinates: (paramsLat, paramsLng) => {
    set((state)=> ({
      ...state,
      cityCoordinates: {
        lat: paramsLat,
        lon: paramsLng
      }
    }))
  }
}));

export const useMeasurementUnitStore = create<TUnitStore>((set) => ({
  unit: "",
  setUnit: (selectedUnit: string) => {
    set(({ unit: selectedUnit }));
  }
}));