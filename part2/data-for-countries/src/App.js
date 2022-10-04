import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [findCoutry, setFindCountry] = useState('')
  
  useEffect(() => {
    console.log("document rendered")
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => setCountries(res.data))
  }, [])

  const handleChange = (e) => {
    setFindCountry(e.target.value)
  }

  const filter = countries.filter(country => {
    return (
      country.name.common.toLowerCase().includes(findCoutry.toLocaleLowerCase())
    )
  })

  const filterLimit = (filter.length > 11) ? 
  "Too many mathces, specify another filter" : 
  filter.map((country, i) => <div key={i}>{country.name.common}</div>)

  return (
    <div>
      <h1>Countries</h1>
      <div>
        find coutries <input onChange={handleChange} value={findCoutry}></input>
      </div>
      {(findCoutry.length !== 0) ? filterLimit : ''}
    </div>
    
  )
}

export default App;
