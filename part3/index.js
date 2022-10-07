const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

let persons = [
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
  {
    id: 5,
    name: "Sarang Wadode",
    number: "546446",
  },
];

app.use(cors());
app.use(express.json());

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

const generateId = () => {
  const maxId =
    persons.length > 0
      ? Math.max(...persons.map((person) => person.id)) + 1
      : 0;
  return maxId;
};

morgan.token("person", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] :response-time ms :person")
);

app.post("/api/persons", (req, res) => {
  const person = req.body;
  person.id = generateId();

  console.log(person.name, person.number);

  if (!person.name || !person.number) {
    return res.status(404).json({
      error: "name or number is missing",
    });
  }
  const find = persons.find((p) => p.name === person.name);
  if (find) {
    return res.status(404).json({
      error: "name must be unique",
    });
  }
  persons = persons.concat(person);

  res.json(persons);
});

app.get("/info", (req, res) => {
  const totalPersons = `PhoneBook has info for ${persons.length} people`;
  const date = Date(Date.now());
  res.send(`<div>
    <p>${totalPersons}</p>
    <p>${date}</>
    </div>`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.post("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    const updatedPersons = persons.filter((person) => person.id !== id);
    res.json(updatedPersons);
  } else {
    res.status(404).end();
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
