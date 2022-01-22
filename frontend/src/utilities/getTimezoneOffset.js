import ct from 'countries-and-timezones';

export default function getTimezoneOffset(countryAbbr) {
  const timezoneInfo = ct.getCountry(countryAbbr);
  if (!timezoneInfo || !timezoneInfo.timezones) {
    return 0;
  }

  return timezoneInfo.timezones[0];
}
