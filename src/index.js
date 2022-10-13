import './css/styles.css';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;
let markup;
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

const base_url = 'https://restcountries.com/v3.1/name/';
// const params = new URLSearchParams({});
function onInput(evt) {
  evt.preventDefault(); //???
  let inputValue = evt.target.value.trim();
  if (inputValue === '') {
    console.log('i', inputValue); //del
    // markup = '';
    // countryList.innerHTML = markup;
    //&& markup
    countryList.innerHTML = '';
    return;
  }
  console.log(inputValue);
  fetchCountries(inputValue)
    .then(countries => renderCountryList(countries))
    .catch(error => console.log(error));
}
function fetchCountries(name) {
  return fetch(
    `${base_url}/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function renderCountryList(countries) {
  markup = countries
    .map(country => {
      return `<li>
  <img src="${country.flags.svg}" alt="${country.name.official}" width="60px" >
  <p>${country.name.official}</p>
</li>`;
    })
    .join('');
  //   console.log(markup);
  countryList.innerHTML = markup;
}
// .then(countries => {
//     const markup=renderCountryList(countries)
//     countryList.innerHTML = markup;
// }
// ).catch(err => console.log(err))

// https://restcountries.com/v3.1/name/peru?fields=name,capital,population,flags,languages
