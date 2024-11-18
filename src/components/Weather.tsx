import React, { useEffect, useRef, useState } from "react";
import "./Weather.css";

// import images
import search_icon from "../assets/images/search.png";
import clear_icon from "../assets/images/clear.png";
import cloud_icon from "../assets/images/cloud.png";
import drizzle_icon from "../assets/images/drizzle.png";
import rain_icon from "../assets/images/rain.png";
import snow_icon from "../assets/images/snow.png";
import wind_icon from "../assets/images/wind.png";
import humidity_icon from "../assets/images/humidity.png";

interface WeatherData {
  humidity: number;
  windSpeed: number;
  temperature: number;
  location: string;
  icon: string;
}

type WeatherIcons = {
  [key: string]: string;
};

export default function Weather() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | false>(false);

  const allIcons: WeatherIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  // fetch api response
  const search = async (city: string) => {
    if (city === "") {
      alert("Please enter a city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.log("Error in fetching weather data");
    }
  };

  useEffect(() => {
    search("Banepa");
  }, []);

  const handleSearch = () => {
    const searchValue = inputRef.current?.value.trim();
    if (searchValue) {
      search(searchValue);
    } else {
      alert("Please enter a city name!");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <>
      <main className="weather">
        <section>
          <form onSubmit={handleSubmit} className="search-bar">
            <input
              ref={inputRef}
              type="text"
              name="city"
              placeholder="Search"
            />
            <img src={search_icon} alt="search-icon" onClick={handleSearch} />
          </form>
        </section>

        {weatherData ? (
          <>
            <section className="weather-details">
              <img src={weatherData.icon} alt="" className="weather-icon" />
              <p className="temperature">{weatherData.temperature} °C</p>
              <p className="location">{weatherData.location}</p>
            </section>
            <section className="weather-data">
              <section className="weather-data-col">
                <img src={humidity_icon} alt="" />
                <div>
                  <p>{weatherData.humidity}</p>
                  <span>Humidity</span>
                </div>
              </section>

              <section className="weather-data-col">
                <img src={wind_icon} alt="" />
                <div>
                  <p>{weatherData.windSpeed} Km/h</p>
                  <span>Wind Speed</span>
                </div>
              </section>
            </section>
          </>
        ) : (
          <></>
        )}
      </main>
    </>
  );
}
