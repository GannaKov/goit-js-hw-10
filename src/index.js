import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './customFunction/fetchCountries';
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
  let inputValue = evt.target.value.trim();

  if (inputValue === '') {
    clearCountryInfoCard();
    clearCountryList();
    return;
  }

  fetchCountries(inputValue)
    .then(countries => {
      if (countries.length > 10) {
        clearCountryList();
        Notify.info(
          'Too many matches found. Please enter a more specific name.',
          notifyOptions
        );
        return;
      }

      if (countries.length === 1) {
        renderCountryInfoCard(...countries);
        return;
      }

      renderCountryList(countries);
    })
    .catch(error => console.log(error));
}

function renderCountryList(countries) {
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
// -------------
// // Занятие 10.2
// // https://the-one-api.dev/documentation
// // Файл 1
// const BASE_URL = 'https://the-one-api.dev/v2/';
// const character = 'character';
// const movie = 'movie';
// const bearer = 'Bearer XJlq9OFMcHAy8pAQK7xj';
// const options = {
//   headers: {
//     Authorization: bearer,
//   },
// };

// export function apiRings(page = 1) {
//   // https://the-one-api.dev/v2/character?limit=10&page=${page}
//   return fetch(`${BASE_URL}${character}?limit=300&page=${page}`, options).then(
//     response => {
//       if (!response.ok) {
//         throw new Error('fail');
//       }
//       return response.json();
//     }
//   );
// }

// export function apiRingsMovie() {
//   // https://the-one-api.dev/v2/character?limit=10&page=${page}
//   return fetch(`${BASE_URL}${movie}`, options).then(response => {
//     if (!response.ok) {
//       throw new Error('fail');
//     }
//     return response.json();
//   });
// }
// //файл 2
// const base_url = 'http://api.weatherapi.com/v1';
// const KEY = '4202b3fa59ea4adf832162138221110';
// const params = new URLSearchParams({
//   key: KEY,
//   q: 'Lviv',
//   days: 7,
// });

// export function apiWeather() {
//   return fetch(`${base_url}/forecast.json?${params}`).then(response => {
//     if (!response.ok) {
//       throw new Error();
//     }
//     return response.json();
//   });
// }
// // Основной файл
// // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// import { apiRings, apiRingsMovie } from './js/apiRings';
// import { apiWeather } from './js/apiWeather';
// import markup from './js/templates/markup.hbs';

// const list = document.querySelector('.list');
// const guard = document.querySelector('.guard');
// const options = {
//   root: null,
//   rootMargin: '50px',
//   threshold: 1,
// };
// const observer = new IntersectionObserver(onLoad, options);
// let page = 1;

// apiRings().then(data => {
//   list.insertAdjacentHTML('beforeend', markup(data.docs));
//   observer.observe(guard);
// });
// // apiWeather().then(data => run(data))
// // apiWeather().then(run)

// // function run(value){
// //     console.log(value);
// // }

// // apiRingsMovie().then(console.log).catch(err => console.log(err))

// function onLoad(entries) {
//   entries.forEach(entry => {
//     console.log(entry);
//     if (entry.isIntersecting) {
//       //true
//       page += 1;
//       apiRings(page).then(data => {
//         list.insertAdjacentHTML('beforeend', markup(data.docs));
//         if (data.page === data.pages) {
//           observer.unobserve(guard);
//         }
//       });
//     }
//   });
// }
