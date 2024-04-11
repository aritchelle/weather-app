import { useGeo } from "@/app/api/geo";

export const localeTimeZone = () => {
  const localeTimezone =  Intl.DateTimeFormat().resolvedOptions().timeZone;
  const extractCity = localeTimezone.split("/");
  return  extractCity[extractCity.length - 1]
}

export const getBackgroundColor = (condition: string,temp: number, unit: string) => {
  const baseTemp = unit === 'metric' ? 30 : (unit === 'imperial' ? 86 : 303.15)
  switch (condition?.toLowerCase()) {
    case 'clear':
      if (temp > baseTemp) {
        return 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(255,69,0,1) 0%, rgba(251,243,249,1) 100%)';
      } else {
        return 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(135,206,235,1) 0%, rgba(251,243,249,1) 100%)';
      }
    case 'clouds':
      if (temp >= baseTemp) {
        return 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(255,69,0,1) 0%, rgba(251,243,249,1) 100%)';
      } else {
        return 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(169,169,169,1) 0%, rgba(251,243,249,1) 100%)';
      }
    case 'rain':
      return 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(112,128,144,1) 0%, rgba(251,243,249,1) 100%)';
    default:
      if (temp >= baseTemp) {
        return 'linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(255,69,0,1) 0%, rgba(251,243,249,1) 100%)';
      } else {
        return '#FFFFFF';
      }
  }
};

export const setSystemSymbol=(unit:string)=> {
  switch (unit.toLowerCase()) {
    case 'metric':
      return 'C'
    case 'imperial':
      return 'F'
    default:
      return 'K';
  }
}

export const toLocalDate=(timezoneSeconds: number): string => {
  const currentTime = new Date();
  const utcTime = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
  const localTime = new Date(utcTime + (1000 * timezoneSeconds));

  const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  };

  return localTime.toLocaleDateString(undefined, options);
}

export const iconUrlFromCode = (code: string) => `http://openweathermap.org/img/wn/${code}@2x.png`;
