import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [findCoutry, setFindCountry] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountries(res.data));
  }, []);

  const handleChange = (e) => {
    setFindCountry(e.target.value);
  };

  const filter = countries.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(findCoutry.toLocaleLowerCase());
  });

  const filterLimit =
    filter.length > 11 ? (
      "Too many matches, specify another filter"
    ) : filter.length === 1 ? (
      <div>
        <h2>{filter[0].name.common}</h2>
        <div>
          <p>capital {filter[0].capital}</p>
          <p>area {filter[0].area}</p>
        </div>
        <div>
          <b>languages</b>
          <ul>
            {Object.values(filter[0].languages).map((lang, i) => (
              <li key={i}>{lang}</li>
            ))}
          </ul>
        </div>
        <div>
          <img src={filter[0].flags.png} alt="flag" />
        </div>
        {console.log(filter[0])}
      </div>
    ) : (
      filter.map((country, i) => <div key={i}>{country.name.common}</div>)
    );

  return (
    <div>
      <h1>Countries</h1>
      <div>
        find coutries <input onChange={handleChange} value={findCoutry}></input>
      </div>
      {findCoutry.length !== 0 ? filterLimit : ""}
    </div>
  );
};

export default App;
