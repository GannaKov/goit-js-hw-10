import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const base_url = 'https://restcountries.com/v3.1/name/';
function fetchCountries(name) {
  const resp = fetch(`${base_url}/${name}`);
  console.log(`${base_url}/${name}`);
  resp.then(response => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
  // .then(date => {});
}
console.log(fetchCountries('peru'));
