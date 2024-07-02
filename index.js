import express from "express"
import axios from "axios"
import bodyParser from "body-parser";

const port = 3000;
const app = express ();

const API_URL = "http://api.openweathermap.org/geo/1.0/direct?";
const APIKey = "a3f2c6ef18f90e9f2a8b734a1d4f632d"

const API_URL2 = "https://api.openweathermap.org/data/2.5/forecast?"

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs");
   

    
    
});
app.post("/", async (req, res) => {
    const country = req.body.country;
    
    try {
        const result = await axios.get(API_URL + `q=${country},ISO 3166&limit=1&appid=${APIKey}`);
        var lat = result.data[0].lat
        var lon = result.data[0].lon

    } catch (error) {
        console.log(error)
        
    }
    try {
        console.log(lat,lon);        
        const watherResult = await axios.get(API_URL2 + `lat=${lat}&lon=${lon}&appid=${APIKey}`);
        res.render("index.ejs", { content: country,
            temp: (watherResult.data.list[0].main.temp - 273.15 ).toFixed(2),
            feels_like: (watherResult.data.list[0].main.feels_like - 273.15).toFixed(2),
            weather: JSON.stringify(watherResult.data.list[1].weather[0].description),
            clouds: watherResult.data.list[2].clouds.all,
            wind: watherResult.data.list[2].wind.speed
         });
    } catch (error) {
        console.log(error)
    
    }
  });




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});