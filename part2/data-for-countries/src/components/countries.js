import { useState } from "react";
import Country from "./country";

const Countries = ({ country }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div>
      {country.name.common}
      <button onClick={handleClick}>{show ? "hide" : "show"}</button>
      {show ? <Country country={country} /> : null}
    </div>
  );
};

export default Countries;
