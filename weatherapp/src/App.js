import React ,{ useState } from 'react'


function App() {

  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e)=>{
    setCity(e.target.value)
  }

  const handleSubmit = async(event)=>{
    event.preventDefault()
    console.log('searching', city);
    setLoading(true)
    setWeather(null)
    const weatherUrl = process.env.REACT_APP_WEATHER_API
    const weatherUrlKey = process.env.REACT_APP_WEATHER_API_KEY
    
      try {
        const response = await fetch(`${weatherUrl}?q=${city}&appid=${weatherUrlKey}&units=matric`)
        if (!response.ok){
          throw new Error('City not found')
        }
        const data = await response.json()
        setWeather(data)
      } catch (error) {
        console.log('error fetching city weather', error.message);
        setWeather({error:error.message}) 
      }
      finally{
        setLoading(false)
      }    
  }
  return (
    <div className="App">
      <h1>Weather App</h1>
      <h3>Search you City to Know the Weather conditions...</h3>
      <form onSubmit={handleSubmit}>
        <p>Search City...</p>
        <input type="text" name='city' value={city} placeholder="Enter City Name" onChange={handleChange}/>
        <button type='submit'>Search</button>
      </form>
      
      {loading && <p>Loading...</p>}

      {weather && (
        <div>
          {weather.error ? (
            <p>{weather.error}</p>
          ): (
            <div>
              <h2>City: {weather.name}</h2>
              <p>Weather: {weather.main.temp}°C</p>
              <p>Weather condition: {weather.weather[0].description}</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default App;
