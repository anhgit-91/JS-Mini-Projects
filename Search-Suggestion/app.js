const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

// fetch is a built in function that return a promise
fetch(endpoint)
    .then(blob => blob.json()) //change raw data to Json, return another promise
    .then(data => cities.push(...data))
    // cities.push(data) --> return a nested array

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        // we need to figure out if the city or state matches what was 
        const regex = new RegExp(wordToMatch, 'gi'); // g: global, i: insensitive
        return place.city.match(regex) || place.state.match(regex);
    });
}

// add commas to numbers and
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi'); // g: global, i: insensitive
        const cityName = place.city.replace(regex, `<span class="hl"> ${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl"> ${this.value}</span>`);
        return `
            <li> 
                <span class="name"> ${cityName}, ${stateName}</span>
                <span class="population"> ${numberWithCommas(place.population)}</span> 
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);