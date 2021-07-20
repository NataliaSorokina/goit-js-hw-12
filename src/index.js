import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from "notiflix";
import refs from './js/refs.js';
import API from './js/api-service.js';
import countryCardTemplate from './templates/country-card.hbs';
import countryListTemplate from './templates/country-list.hbs';

const DEBOUNCE_DELAY = 300;

refs.input.insertAdjacentHTML('beforebegin', '<h1 class="page-title">Country search</h1>')

refs.input.addEventListener('input', debounce(searchHandler, DEBOUNCE_DELAY));

function renderCountryCard(countries) {
    refs.list.innerHTML = '';
    refs.card.innerHTML = '';

    if (countries.length === 1) {
        refs.card.innerHTML = countryCardTemplate(countries);
    } else if (countries.length > 1 && countries.length < 10) {
        refs.list.innerHTML = countryListTemplate(countries);
    } else if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
}


function errorHandler(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
}

function searchHandler(event) {
    event.preventDefault;

    let inputQuery = refs.input.value;
    if (inputQuery === '') {
        return;
    }

    API.fetchCountries(inputQuery)
        .then(renderCountryCard)
        .catch(errorHandler)
}


