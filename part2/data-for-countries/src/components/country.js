const Country = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
      </div>
      <div>
        <b>languages</b>
        <ul>
          {Object.values(country.languages).map((lang, i) => (
            <li key={i}>{lang}</li>
          ))}
        </ul>
      </div>
      <div>
        <img width='240px' height='150px' src={country.flags.png} alt="flag" />
      </div>
    </div>
  );
};

export default Country;
