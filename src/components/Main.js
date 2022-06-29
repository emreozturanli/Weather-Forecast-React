import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "./Card";

export const Main = () => {
    const [country,setCountry] = useState('tallinn');
    const [weatherInfo, setWeatherInfo] = useState('');
    const [city,setCity] =useState('Tallinn');
    const [isLoading, setIsLoading] = useState(true);

    const fetchUrl = async (e) =>{
        e.preventDefault(e)
        const res = await axios(`https://api.openweathermap.org/data/2.5/forecast?q=${country}&cnt=8&appid=3dcce698f1438a6eb1e6c2f7e6644448&units=metric`);
        setCity(res.data.city.name);
        setWeatherInfo(res.data);
        setCountry('');
     console.log(weatherInfo);
    }

    const defaultUrl = async () =>{
        const res = await axios(`https://api.openweathermap.org/data/2.5/forecast?q=${country}&cnt=8&appid=3dcce698f1438a6eb1e6c2f7e6644448&units=metric`);
        setCity(res.data.city.name);
        setWeatherInfo(res.data);
        setIsLoading(false);
    }

    useEffect(()=>{
        defaultUrl();
    },[])

  if(isLoading){
    return <h1>Loading....</h1>
  }

  return (
    <main>
        <form onSubmit={(e)=> fetchUrl(e)}>
            <input onChange={(e)=> setCountry(e.target.value)} type="text" value={country} placeholder="type a city name"/>
            <button>Search</button>
        </form>
       <h2>{city}</h2>
       <section>
        {
            weatherInfo !== '' &&
            weatherInfo.list.map((item,index)=>{
                return <Card
                    key={index}
                    temp = {item.main.temp}
                    condition = {item.weather[0].main}
                    desc = {item.weather[0].description}
                    icon = {item.weather[0].icon}
                    time ={item.dt_txt}
                />
            })
        }
       </section>
    </main>
  )
}
