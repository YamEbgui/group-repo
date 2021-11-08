// Import Section
const express = require("express");
const app = express();

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(data);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = data.find((person) => person.id == id);
  if (person) {
    response.json(person);
  } else {
    response.status(400).send();
  }
});

app.get("/info", (request, response) => {
  let d = new Date();
  d = d.toUTCString();
  response.send(
    `<h3>Phonebook has info for ${data.length} people</h3><br><h2>${d}</h2>`
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
