console.log("Client side JavaScript is running.......");

const submit = document.querySelector("button");
const weatherResult = document.querySelector(".weatherResuult");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  weatherResult.innerHTML = "Loading.....";
  const address = document.querySelector("input").value;

  fetch("http://localhost:3000/weather?address=" + address).then((response) => {
    response.json().then((data) => {
      
      if (data.error) {
        weatherResult.style.color = "red";
        weatherResult.innerHTML = data.error;
      } else {
        weatherResult.style.color = "green";
        weatherResult.innerHTML = `Location: ${data.placeName} <br>
        ${data.forcast}`;
      }
    });
  });
});
