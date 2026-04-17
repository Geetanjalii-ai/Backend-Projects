import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const getWeatherData=async(req,res,next)=>{

    try{
        const city=req.body.city.trim();
        console.log("city recieved:",city);
        const apiKey=process.env.WEATHER_API_KEY;
        console.log("api key:",apiKey);
        
        const response = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
);
        const data = await response.json();

        console.log("City:", city);
        console.log("Status:", response.status);
        console.log("Data:", data);
        if(response.status!==200)
        {
            return res.status(404).json({message:'City not found'});
        }

        req.weather={
            temperature:data.main.temp,   
            humidity:data.main.humidity
        }
        next();
    }
    catch(error)
    {
       res.status(500).json({message:'Error getting weather data',error:error.message});
    }
};

export {getWeatherData};