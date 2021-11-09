const express = require("express");
const router = express.Router();

const Phonebook = require("../data/phonebook");

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const person = Phonebook.getPerson(id);

  res.send(person);
});
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const person = Phonebook.deletePerson(id);

  res.send(person);
});

router.get("/", (req, res) => {
  const phonebook = Phonebook.getPhonebook();

  res.send(phonebook.data);
});

router.post("/", (req, res, next) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return next(400);
  }
  if (Phonebook.isNameExist(name)) {
    return next(406);
  }

  const phonebook = Phonebook.addPerson(name, number);

  res.send(phonebook.data);
});

module.exports = router;
