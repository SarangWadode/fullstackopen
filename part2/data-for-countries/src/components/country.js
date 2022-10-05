import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    console.log(process.env.REACT_APP_API_KEY);
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
      )
      .then((res) => {
        console.log(res.data.current);
        setWeather(res.data.current);
      })
      .catch((e) => console.log(e));
  }, [country.capital]);

  return (
    <div>
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
          <img
            width="240px"
            height="150px"
            src={country.flags.png}
            alt="flag"
          />
        </div>
        <div>
          <h2>Weather in {country.name.common}</h2>
          <div>
            <p>temperature: {weather.temperature} Celsius</p>
            <p>weather descriptions: {weather.weather_descriptions}</p>
            <img
              width="160px"
              height="100px"
              src={weather.weather_icons}
              alt="weather icon"
            />
            <p>wind speed: {weather.wind_speed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;
