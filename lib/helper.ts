
/**
 *
 * by default, as we don't have city to search for,
 * we will just load localeTimezone that is set  in the browser.
 */
export const localeTimeZone = () => {
  const localeTimezone =  Intl.DateTimeFormat().resolvedOptions().timeZone;
  const extractCity = localeTimezone.split("/");
  return  extractCity[extractCity.length - 1]
}

/**
 *
 * @param condition weather condition that was return from the API, ex. clear, clouds, etc..
 * @param temp main temperature from a location,  in kelvin by default, we used this to change background color
 * @param unit What unit should we make reference for changing background color
 * @returns The gradient color  based on the weather condition.
 */
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

/**
 * @param unit  what unit of measurement user want to see
 */
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

/**
 *
 * @param timezoneSeconds  - the time zone offset in seconds from UTC coming from an API
 */
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

/**
 *
 * @param code  the weather condition icon code from OpenWeatherMap API
 */
export const iconUrlFromCode = (code: string) => `http://openweathermap.org/img/wn/${code}@2x.png`;
