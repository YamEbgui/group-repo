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

app.use(express.json());

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

app.get("/api/persons", (request, response) => {
  response.json(data);
});

app.post("/api/persons", (request, response) => {
  const maxId = data.length > 0 ? Math.max(...data.map((n) => n.id)) : 0;
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({ error: "name or number is missing" });
  }
  if (isExist(body.name)) {
    return response.status(400).json({ error: "name is already exist" });
  }

  let person = {
    id: maxId + 1,
    name: body.name,
    number: body.number,
  };
  data.push(person);
  response.status(200).send("Adding person succsed");
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  data = data.filter((person) => person.id != id);
  console.log(data);
  response.status(204).end();
});

app.get("/info", (request, response) => {
  let d = new Date();
  d = d.toUTCString();
  response.send(
    `<h3>Phonebook has info for ${data.length} people</h3><br><h2>${d}</h2>`
  );
});

function isExist(name) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].name === name) {
      return true;
    }
  }
  return false;
}

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
