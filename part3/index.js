require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
//   {
//     id: 5,
//     name: "Sarang Wadode",
//     number: "546446",
//   },
// ];

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

  // if (!person.name || !person.number) {
  //   return res.status(404).json({
  //     error: "name or number is missing",
  //   });
  // }
  // const find = persons.find((p) => p.name === person.name);
  // if (find) {
  //   return res.status(404).json({
  //     error: "name must be unique",
  //   });
  // }

});

// app.get("/info", (req, res) => {
//   const totalPersons = `PhoneBook has info for ${persons.length} people`;
//   const date = Date(Date.now());
//   res.send(`<div>
//     <p>${totalPersons}</p>
//     <p>${date}</>
//     </div>`);
// });

// fecth by id
app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      res.json(person)
    })
});

// app.post("/api/persons/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const person = persons.find((person) => person.id === id);

//   Person.findById(id).then((p) => {
//     res.json(p);
//   });
  
//   if (person) {
//     const updatedPersons = persons.filter((person) => person.id !== id);
//     res.json(updatedPersons);
//   } else {
//     res.status(404).end();
//   }
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
