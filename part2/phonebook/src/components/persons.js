const Persons = ({ persons, filterVal }) => {
    const filter = (filterVal === '') ?
    persons.map((person) => <div key={person.id}>{person.name} {person.number}</div>) :
    persons.filter((person) => person.name.toLowerCase().includes(filterVal.toLowerCase())).map((person) => <div key={person.id}>{person.name} {person.number}</div>)

    return (
        <div>
            {filter}
        </div>
    )
}

export default Persons;
