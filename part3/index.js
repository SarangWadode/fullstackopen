if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const { query } = require('express');

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
app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then(person => {
      res.json(person)
    })
    .catch(err => next(err))
});

//add person
app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });
  
  newPerson.save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch(err => next(err))
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
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      res.json(person)
    })
    .catch(err => next(err))
});

// find by id and delete
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

//find by id and update
app.put('/api/persons/:id', (req, res, next) => {
  body = req.body
  console.log(body)
  const person = {
    name: body.name,
    number: body.number
  }
  
  Person.findByIdAndUpdate(req.params.id, person, {new: true, runValidators: true, context: 'query'})
    .then(updatedPersons => {
      res.json(updatedPersons)
    })
    .catch(err => next(err))
})

const unknownEndpoints = (req, res, next) => {
  res.status(404).send({ error: "unknown endpoint"})
}

app.use(unknownEndpoints)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
