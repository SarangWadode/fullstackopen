import { useState } from 'react'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import Filter from './components/filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filterVal, setFilterVal] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName,
      number: number,
      id: persons.length +1
    }

    const check = persons.filter(person => {
      return person.name === newName
    })

    if (check.length > 0) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([...persons, newPerson])
    }
    console.log(check.length)

    setNewName("")
    setNumber("")
  }

  const handleChangeName = (e) => {
    setNewName(e.target.value)
  }

  const handleChangeNumber = (e) => {
    setNumber(e.target.value)
  }

  const handeChangeFilter = (e) => {
    setFilterVal(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterVal} handleChangeFilter={handeChangeFilter} persons={persons} />
      <h2>Add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} number={number} handleChangeName={handleChangeName} handleChangeNumber={handleChangeNumber} />
      <h2>Numbers" </h2>
      <Persons persons={persons} filterVal={filterVal} />
    </div>
  )
}

export default App