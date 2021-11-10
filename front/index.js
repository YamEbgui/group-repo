// const bootstrap = require("bootstrap");
// const styles = require("./style.css");
//import axios from "axios";

//const { Button } = require("bootstrap");

//const { default: axios } = require("axios");

//Dom Element Section
const nameInput = document.getElementById("inputName");
const phoneInput = document.getElementById("inputPhone");
const addButton = document.getElementById("addBtn");
const personsListElement = document.getElementById("personsList");

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
      alert("You are trying to add exist person");
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

const getAllPersonsRequest = async () => {
  axios
    .get(`${serverUrl}api/persons`)
    .then((result) => {
      cleanPersonsList();
      displayAllPersons(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const displayAllPersons = (personsList) => {
  for (let i = 0; i < personsList.length; i++) {
    const deleteBtn = createElement("button", "🗑️", ["deleteBtn"], {
      id: `${personsList[i].id}`,
    });
    //add event listener for delete
    const newItem = createElement(
      "li",
      [personsList[i].name, deleteBtn],
      ["person", "list-group-item"]
    );
    //eventListener for new item
    personsListElement.append(newItem);
  }
};

const cleanPersonsList = () => {
  personsListElement.innerHTML = "";
};

const createElement = (
  tagName,
  children = [],
  classes = [],
  attributes = {}
) => {
  // create new element in more comfortable
  const el = document.createElement(tagName);
  for (let child of children) {
    // append childs of element
    el.append(child);
  }
  for (let cls of classes) {
    // add all the classes to the element
    el.classList.add(cls);
  }
  for (let attr in attributes) {
    // add all attributes to the element
    el.setAttribute(attr, attributes[attr]);
  }
  return el;
};
addButton.addEventListener("click", addNewPerson);
