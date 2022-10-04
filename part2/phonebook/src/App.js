import { useState, useEffect } from "react";
import PersonForm from "./components/personForm";
import Persons from "./components/persons";
import Filter from "./components/filter";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  
  useEffect(() => {
    console.log("fetching data");
    axios
      .get("http://localhost:3001/persons")
      .then((res) => {
        console.log("promise fullfilled");
        setPersons(res.data);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [filterVal, setFilterVal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: number,
      id: persons.length + 1,
    };

    const check = persons.filter((person) => {
      return person.name === newName;
    });

    if (check.length > 0) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, newPerson]);
    }
    console.log(check.length);

    setNewName("");
    setNumber("");
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers" </h2>
      <Persons persons={persons} filterVal={filterVal} />
    </div>
  );
};

export default App;
