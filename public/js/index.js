console.log("dev tools");

const form = document.querySelector("form");
const input = document.querySelector("input");
const massageOne = document.querySelector(".massageOne");
const massageTwo = document.querySelector(".massageTwo");

massageOne.textContent = "loading...";
massageTwo.textContent = "";

form.addEventListener("submit", (e) => {
    e.preventDefault();
    massageOne.textContent = "loading...";
    massageTwo.textContent = "";

    const  address = input.value;
    fetch(`api/weather?address=${address}`)
      .then((response) => {
        response.json().then((data) => {
          if (data.error) {
            massageOne.textContent = data.error;
          } else {
            massageOne.textContent = `your location is ${data.location}, `;
            massageTwo.textContent = `${data.forecast.status}, it is currently ${data.forecast.temperature} degress out. There is ${data.forecast.precip}% chance of rain.`;
          }
        });
      })
      .catch((error) => (massageOne.textContent = error));
})