import { useState, useEffect } from "react";
import PersonForm from "./components/personForm";
import Persons from "./components/persons";
import Filter from "./components/filter";
import personService from "./services/person";
import Notification from "./components/notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filterVal, setFilterVal] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    personService.getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: number,
    };

    const check = persons.find(({ name }) => name === newName);
    if (check) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        const newPerson = {
          ...check,
          number: number,
        };
        personService.update(check.id, newPerson).then((res) => {
          const filter = persons.filter((person) => person.id !== check.id);
          setPersons([...filter, res.data]);
          setNewName("");
          setNumber("");

          setNotification({
            message: `${newPerson.name}'s number changed to ${newPerson.number}`,
            type: "notification",
          });
          setTimeout(() => {
            setNotification({
              message: null,
              type: null,
            });
          }, 5000);
        });
      }
    } else {
      personService.create(newPerson).then((res) => {
        setPersons([...persons, res.data]);
        setNewName("");
        setNumber("");

        setNotification({
          message: `Added ${newPerson.name}`,
          type: "notification",
        });

        setTimeout(() => {
          setNotification({
            message: null,
            type: null,
          });
        }, 5000)
        
        .catch((err) => {
          setNotification({
            message: `${err.response.data.error}`,
            type: "error",
          });

          setTimeout(() => {
            setNotification({
              message: null,
              type: null,
            });
          }, 5000);
        });
      });
    }
  };

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };

  const handleChangeNumber = (e) => {
    setNumber(e.target.value);
  };

  const handeChangeFilter = (e) => {
    setFilterVal(e.target.value);
  };

  const handleDelete = (e) => {
    const id = e.target.id;
    const person = persons.find((person) => person.id === id);
    const name = person.name
    console.log(persons)
    if (window.confirm(`Delete ${name} ?`)) {
      const newPersons = persons.filter((person) => person.id !== id);
      personService
        .del(id)
        .then(() => {
          setPersons([...newPersons]);
        })
        .catch((err) => {
          setNotification({
            message: `Information of ${name} has been already deleted from the server`,
            type: "error",
          });

          setTimeout(() => {
            setNotification({
              message: null,
              type: null,
            });
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter
        value={filterVal}
        handleChangeFilter={handeChangeFilter}
        persons={persons}
      />
      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        number={number}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />
      <h2>Numbers </h2>
      <Persons
        persons={persons}
        filterVal={filterVal}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
