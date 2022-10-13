import './css/styles.css';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
inputEl.addEventListener('input', onInput);

const base_url = 'https://restcountries.com/v3.1/name/';
// const params = new URLSearchParams({});
function onInput(evt) {
  evt.preventDefault(); //???
  let inputValue = evt.target.value;
  console.dir(inputValue);
  fetchCountries(inputValue)
    // .then(countries => renderCountryList(countries))
    // .catch(error => console.log(error));
}
function fetchCountries(name) {
    const resp = fetch(
        `${base_url}/${name}?fields=name,capital,population,flags,languages`
    )
    resp.then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    }).then(countries => {
        const markup=renderCountryList(countries)
        countryList.innerHTML = markup;
    }
    ).catch(err => console.log(err))


function renderCountryList(countries) {
  return countries
    .map(country => {
      return `<li>
  <img src="${country.flags.svg}" alt="${country.name.official}" width="60px" >
  <p>${country.name.official}</p>
</li>`;
    })
    .join('');
//   console.log(markup);
 
}
// https://restcountries.com/v3.1/name/peru?fields=name,capital,population,flags,languages
