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

function Weather() {
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

    
}