console.log("Client side JavaScript is running.......");

const submit = document.querySelector("button");
const weatherResult = document.querySelector(".weatherResuult");
const img = document.querySelector("img");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  img.classList.add('hide');
  weatherResult.innerHTML = "Loading.....";
  const address = document.querySelector("input").value;

  fetch("/weather?address=" + address).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        weatherResult.style.color = "red";
        weatherResult.innerHTML = data.error;
      } else {
        weatherResult.style.color = "green";
        img.src = data.img;
        img.classList.remove('hide');
        weatherResult.innerHTML = `Location: ${data.placeName} <br>
        ${data.forcast}`;
      }
    });
  });
});
