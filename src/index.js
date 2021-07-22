import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from "notiflix";
import { getRefs } from './js/refs';
import {DEBOUNCE_DELAY, NOTIFICATION_FAILURE, NOTIFICATION_INFO} from './js/constants';
import API from './js/api-service';
import countryCardTemplate from './templates/country-card.hbs';
import countryListTemplate from './templates/country-list.hbs';

const refs = getRefs();

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
        Notiflix.Notify.info(NOTIFICATION_INFO);
    }
}


function errorHandler(error) {
    Notiflix.Notify.failure(NOTIFICATION_FAILURE);
}

function searchHandler(event) {
    event.preventDefault;

    let inputQuery = refs.input.value;
    if (inputQuery.trim() === '') {
        return;
    }

    API.fetchCountries(inputQuery)
        .then(renderCountryCard)
        .catch(errorHandler)
}


