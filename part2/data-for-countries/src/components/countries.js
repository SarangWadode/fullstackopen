import { useState } from "react";
import Country from "./country";

const Countries = ({ country }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    console.log("button is clicked");
    setShow(!show);
  };

  return (
    <div>
      <>
        {!show ? (
            <>
            {country.name.common}
          </>
        ) : null}
      </>
        <button onClick={handleClick}>
            {show ? "hide" : "show"}
        </button>
        {show ? <Country country={country} /> : null}
    </div>
  );
};

export default Countries;
