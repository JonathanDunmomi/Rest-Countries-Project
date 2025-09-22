const modeToggle = document.getElementById('modeToggle');
const body = document.body;
const paragraphs = document.querySelectorAll('p');
const input = document.getElementById('myInput');
const textarea = document.getElementById('myTextarea'); // Select all <p> elements

// Check for saved mode preference in localStorage
const savedMode = localStorage.getItem('theme');
if (savedMode === 'dark') {
    body.classList.add('dark-mode');
    modeToggle.innerHTML = '🌙'; 
    changeParagraphColor('white'); // Set initial <p> color
}

// Function to change paragraph text color
function changeParagraphColor(color) {
    paragraphs.forEach(p => {
        p.style.color = color;
    });
}

modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Change button icon and paragraph color dynamically
    if (body.classList.contains('dark-mode')) {
        modeToggle.innerHTML = '🌙'; 
        localStorage.setItem('theme', 'dark');
        changeParagraphColor('white'); // Change text color to white in dark mode
    } else {
        modeToggle.innerHTML = '☀️';
        localStorage.setItem('theme', 'light');
        changeParagraphColor('black');
         input.classList.toggle('dark-mode');
         textarea.classList.toggle('dark-mode'); // Change text color to black in light mode
    }
});


// const  con = document.getElementById('countries');
   const loadCountryAPI =() =>{
    fetch("https://restcountries.com/v3.1/region/africa")
    .then(res => res.json())
    .then(data => displayCountries(data))
   }
   

  // Display countries
  const displayCountries = countries =>{
     const countriesHTML = countries.map(country => getCountry(country));
     const container = document.getElementById('countries');
     container.innerHTML = countriesHTML.join('');
  }

const getCountry = (country) =>{
       console.log(country)
       return `
         <div class="country-div">
         <h2>${country.name.common}</h2>
         <img src="${country.flags.png}">
         <h4>Population: ${country.population} </h4>
         <h4>Region:  ${country.region} </h4>
         <h4>Capital:  ${country.capital} </h4>
         </div>
       `
}

loadCountryAPI()

