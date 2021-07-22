import {BASE_URL, FILTER} from './constants';

function fetchCountries(name) {
    const url = `${BASE_URL}/name/${name}?${FILTER}`;
    return  fetch(url)
            .then(response => {
                // console.log(response);
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
}

export default { fetchCountries };