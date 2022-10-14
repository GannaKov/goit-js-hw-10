import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './customFunction/fetchCountries';
const DEBOUNCE_DELAY = 300;
const notifyOptions = {
  position: 'center-top',
  showOnlyTheLastOne: true,
  timeout: 2000,
};
const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
  //   evt.preventDefault(); //???
  let inputValue = evt.target.value.trim();
  if (inputValue === '') {
    clearCountryInfoCard();
    clearCountryList();
    return;
  }

  fetchCountries(inputValue)
    .then(response => {
      if (!response.ok) {
        notifyFailure();

        throw new Error(response.status);
      }
      return response.json();
    })
    .then(countries => {
      if (countries.length > 10) {
        // countryList.innerHTML = '';
        clearCountryList();
        Notify.info(
          'Too many matches found. Please enter a more specific name.',
          notifyOptions
        );
        return;
      }
      if (countries.length === 1) {
        // countryList.innerHTML = '';
        // clearCountryList();
        renderCountryInfoCard(...countries);
        return;
      }
      renderCountryList(countries);
    })
    .catch(error => console.log(error));
}

function renderCountryList(countries) {
  //   countryInfo.innerHTML = '';
  clearCountryInfoCard();
  const markup = countries
    .map(country => {
      return `<li>
  <img src="${country.flags.svg}" alt="${country.name.official}" width="60px" >
  <p>${country.name.official}</p>
</li>`;
    })
    .join('');

  countryList.innerHTML = markup;
}

function renderCountryInfoCard(country) {
  //   countryList.innerHTML = '';
  clearCountryList();
  const markup = `<div class="tiltle-row">
  <img src="${country.flags.svg}" alt="${country.name.official}" width="60px" />
  <h1>${country.name.official}</h1>
</div>
<ul class="country__card">
  <li>
    <h2>Capital:</h2>
    <p>${country.capital}</p>
  </li>
  <li>
    <h2>Population:</h2>
    <p>${country.population}</p>
  </li>
  <li>
    <h2>Languages:</h2>
    <p>${Object.values(country.languages)}</p>
  </li>
</ul>`;

  countryInfo.innerHTML = markup;
}
function clearCountryList() {
  countryList.innerHTML = '';
}
function clearCountryInfoCard() {
  countryInfo.innerHTML = '';
}
function notifyFailure() {
  Notify.failure('Oops, there is no country with that name', notifyOptions);
}

// -----------------------------
// .then(countries => {
//     const markup=renderCountryList(countries)
//     countryList.innerHTML = markup;
// }
// ).catch(err => console.log(err))

// https://restcountries.com/v3.1/name/peru?fields=name.nativeName,capital,population,flags,languages
