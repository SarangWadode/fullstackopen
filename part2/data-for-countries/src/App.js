import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/country";
import Countries from "./components/countries";

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
      <Country country={filter[0]} />
    ) : (
      filter.map((country, i) => {
        return <Countries key={i} country={country} />;
      })
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
