require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

morgan.token("person", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :person")
);

// fetch all persons
app.get("/api/persons", (req, res) => {
  Person.find({})
    .then(person => {
      res.json(person)
    })
});

//add person
app.post("/api/persons", (req, res) => {
  const body = req.body;

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });
  
  newPerson.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

// get info of db
app.get("/info", (req, res) => {
  Person.find({})
  .then((persons) => {
    const totalPersons = `PhoneBook has info for ${persons.length} people`;
    const date = Date(Date.now());
    res.send(`<div>
      <p>${totalPersons}</p>
      <p>${date}</>
      </div>`);
  })
});

// fetch by id
app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      res.json(person)
    })
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
