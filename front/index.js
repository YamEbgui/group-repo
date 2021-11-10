// const bootstrap = require("bootstrap");
// const styles = require("./style.css");
//import axios from "axios";
//Dom Element Section
const nameInput = document.getElementById("inputName");
const phoneInput = document.getElementById("inputPhone");
const addButton = document.getElementById("addBtn");

const serverUrl = "http://localhost:3001/";

const addRequest = async (name, phoneNumber) => {
  console.log(`name:${name}  phone:${phoneNumber}`);
  axios
    .post(
      `${serverUrl}api/persons`,
      {
        name: `${name}`,
        number: `${phoneNumber}`,
      },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    )
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const addNewPerson = (event) => {
  const name = nameInput.value;
  const phoneNumber = phoneInput.value;
  console.log(`name:${name}  phone:${phoneNumber}`);
  if (name !== "" && phoneNumber !== "") {
    addRequest(name, phoneNumber);
  }
};

addButton.addEventListener("click", addNewPerson);
