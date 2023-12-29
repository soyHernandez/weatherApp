import { useState } from 'react'
export const WeatherApp = () => {
    const [City, setCity] = useState('')
    const [weather, setweather] = useState(null)

    const url = `https://api.openweathermap.org/data/2.5/weather`
    const API_KEY = 'dead2c7645d208e7972c13edb2746205'
    const tempCalvin = 273.15
    const handleChangeCity = (e) => {
        setCity(e.target.value)
    }

    const fetchClima = async () => {
        try {
            const res = await fetch(`${url}?q=${City}&appid=${API_KEY}`)
            const data = await res.json()
            setweather(data)

        } catch (error) {
            console.log(error)
        }
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (City.length > 0) fetchClima()
    }
    const result = () => {
        if (weather.cod == '404') {
            return (
                <div className='errorFoundMessage'>
                    <div className='noFound'>
                        <p>{weather.message}</p>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className='found-weather'>
                    <div className='weater-info'>
                        <div>
                            <h1>{weather.name}</h1>
                            <p><b>Temperature: </b>{parseInt(weather?.main?.temp - tempCalvin)}°C</p>
                            <p><b>Meteorological condition:</b> {weather?.weather[0].description}</p>
                        </div>
                        <img className='weatherImage' src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} />
                    </div>
                </div>
            )
        }
    }
    return (
        <>
            <div className="container">
                <h1>Weather App</h1>
                <hr />
                <form onSubmit={onSubmit}>
                    <input type="text" value={City} placeholder='Search a country or City' onChange={handleChangeCity} />
                    <button type="submit">search</button>
                </form>
            </div>
            {
                weather && (
                    result()
                )
            }
        </>
    )


}