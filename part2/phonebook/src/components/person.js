const Person = ({ person, handleDelete }) => {
  return (
    <div key={person.id}>
      {person.name} {person.number} 
      <button id={person.id} onClick={handleDelete}>
        delete
      </button>
    </div>
  );
};

export default Person;
