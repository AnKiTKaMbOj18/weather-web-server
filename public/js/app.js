console.log("client side javascript file is loaded!");

// fetch("http://localhost:3000/test").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.getElementById("message-1");
const message2 = document.getElementById("message-2");

weatherForm.addEventListener("submit", (e) => {
  message1.textContent = "";
  message2.textContent = "";
  const location = search.value;
  e.preventDefault();
  console.log(location);
  message1.textContent = "loading...";
  fetch("/weather?address=" + location).then(
    (response) => {
      response.json().then((resp) => {
        if (resp.error) {
          console.log("Error: ", resp.error);
          message1.textContent = resp.error;
        } else {
          console.log(resp);
          message1.textContent = resp.location;
          message2.textContent = JSON.stringify(resp.forecast);
        }
      });
    }
  );
});
