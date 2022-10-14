export default function fetchCountries(name) {
  const base_url = 'https://restcountries.com/v3.1/name/';
  return fetch(
    `${base_url}/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      Notify.failure('Oops, there is no country with that name');
      throw new Error(response.status);
    }
    return response.json();
  });
}
