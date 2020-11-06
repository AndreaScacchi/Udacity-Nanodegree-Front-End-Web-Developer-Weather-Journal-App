// Global variables
const baseURL = 'http://api.openweathermap.org/data/2.5/?zip=';
const apiKey = '&appid=470a765db3a57bf10f903479bd62d114';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction)

function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, zipCode, apiKey)

    .then(function(data) {
        console.log(data);
        postData('/add', {temperature: data.main.temp, date: newDate, feelings: feelings})
    })
    .then(function(res) {
        updateUI();
    })
};

// Function to GET Web API Data
const getWeather = async(baseURL, zipCode, apiKey) => {
    const res = await fetch(baseURL + zipCode + apiKey);
    try {

        const data = await res.json();
        console.log(data)
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

// Function to POST Data
const postData = async ( url = '', data = {}) => {
    const response = await fetch(url, {
       method: 'POST',
       credentials: 'same-origin',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData
    } catch(error) {
        console.log("error", error);
    }
}

// Update UI demo
const updateUI = async () => {
    const request = await fetch('/all')
    try {
        const allData = await request.json()
        console.log(allData);
        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('temp').innerHTML = allData[0].temperature;
        document.querySelector('#content').innerHTML = allData[0].feelings;
    } catch(error) {
        console.log("error", error);
    }
}
