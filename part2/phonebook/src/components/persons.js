import Person from "./person";

const Persons = ({ persons, filterVal, handleDelete }) => {
  const filter =
    filterVal === ""
      ? persons.map((person) => <Person key={person.id} person={person} handleDelete={handleDelete} />)
      : persons.filter((person) => person.name.toLowerCase().includes(filterVal.toLowerCase())).map((person) => <Person key={person.id} person={person} handleDelete={handleDelete} />);
  return <div>{filter}</div>;
};

export default Persons;
