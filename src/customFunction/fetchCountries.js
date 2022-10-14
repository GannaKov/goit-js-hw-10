export default function fetchCountries(name) {
  const base_url = 'https://restcountries.com/v3.1/name/';
  return fetch(
    `${base_url}/${name}?fields=name,capital,population,flags,languages`
  );
}
//
