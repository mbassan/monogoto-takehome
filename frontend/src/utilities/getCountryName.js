import countries from 'ui/components/CountryPicker/listOfCountries';

export default function getCountryName(countryCode) {
  const country = countries.filter((item) => item.value === countryCode);
  return country.length > 0 ? country[0].label : null;
}
