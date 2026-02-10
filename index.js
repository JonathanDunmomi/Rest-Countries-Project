const modeToggle = document.getElementById('modeToggle');
const body = document.body;
const paragraphs = document.querySelectorAll('p');
const input = document.getElementById('myInput');
const textarea = document.getElementById('myTextarea');
const searchInput = document.getElementById("searchCountry");
const countriesContainer = document.getElementById('countries');

let allCountries = [];

/* ================= DARK MODE ================= */
const savedMode = localStorage.getItem('theme');
if (savedMode === 'dark') {
    body.classList.add('dark-mode');
    modeToggle.innerHTML = '🌙';
    changeParagraphColor('white');
}

function changeParagraphColor(color) {
    paragraphs.forEach(p => {
        p.style.color = color;
    });
}

modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        modeToggle.innerHTML = '🌙';
        localStorage.setItem('theme', 'dark');
        changeParagraphColor('white');
    } else {
        modeToggle.innerHTML = '☀️';
        localStorage.setItem('theme', 'light');
        changeParagraphColor('black');
        input.classList.toggle('dark-mode');
        textarea.classList.toggle('dark-mode');
    }
});

/* ================= LOAD COUNTRIES ================= */
const loadCountryAPI = () => {
    fetch("https://restcountries.com/v3.1/region/africa")
        .then(res => res.json())
        .then(data => {
            allCountries = data;
            displayCountries(allCountries);
        });
};

/* ================= SEARCH FUNCTION ================= */
searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.toLowerCase();

    const filteredCountries = allCountries.filter(country =>
        country.name.common.toLowerCase().includes(searchText)
    );

    displayCountries(filteredCountries);
});

/* ================= DISPLAY COUNTRIES ================= */
const displayCountries = countries => {
    countriesContainer.innerHTML = "";

    if (countries.length === 0) {
        countriesContainer.innerHTML = "<p>No country found</p>";
        return;
    }

    countries.forEach(country => {
        countriesContainer.innerHTML += `
            <div class="country-div">
                <h2>${country.name.common}</h2>
                <img src="${country.flags.png}" alt="${country.name.common}">
                <h4>Population: ${country.population.toLocaleString()}</h4>
                <h4>Region: ${country.region}</h4>
                <h4>Capital: ${country.capital ? country.capital[0] : 'N/A'}</h4>
            </div>
        `;
    });
};

loadCountryAPI();


