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
 const searchCountry = () => {
      const input = document.getElementById("searchInput").value.trim();
      if (input === "") {
        alert("Please enter a country name");
        return;
      }

       fetch(`https://restcountries.com/v3.1/name/${input}`)
        .then(res => {
          if (!res.ok) throw new Error("Country not found");
          return res.json();
        })
        .then(data => displayCountries(data))
        .catch(err => {
          document.getElementById("countries").innerHTML = `<p style="color:red;">${err.message}</p>`;
        });
    };

     

const loadCountryAPI = () =>{
    fetch('https://restcountries.com/v3.1/region/africa')
    .then (res => res.json())
    .then(data => displayCountries(data))
    .then (data => console.log(data))
};

const displayCountries = countries =>{
    // console.log(countries);
    const countriesHTML =countries.map( country=> getCountry(country)).join('');
    const container = document.getElementById('countries');
    container.innerHTML = countriesHTML;
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

