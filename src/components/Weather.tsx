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

export default function Weather() {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
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
    const search = async (city) => {
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
                temperatuer: Math.floor(data.main.temp),
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

}