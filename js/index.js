// declaration of variables
let weatherCardTemps = document.querySelectorAll(".weather_card_temp");
let cardContents = document.querySelectorAll(".card_content");
let weatherCardDays = document.querySelectorAll(".weather_card_day");
let tempshow = document.getElementById("temperature");
let date_show = document.getElementById("date_show");
let condition = document.getElementById("condition");
let wimage = document.getElementById("weather_image");
let wind_speed = document.getElementById("wind_speed");
let the_humidity = document.getElementById("humidity")
let cityshow = document.getElementById("city_name");
let cards_html_show = document.getElementById("days_weather");
let saved_search = document.getElementById("saved");
let search_icon_press=document.querySelector(".search_icon_svg_inner");
let open_search=document.querySelector(".icon");
let the_toggle=document.querySelector(".search_toggle");
let toggle_on=document.querySelector(".search")



// works on mobile
// open search bar
open_search.addEventListener("click",()=>
{
    let search = document.querySelector(".search");
    let icon = document.querySelector(".search_icon");
    icon.style.display = "none";
    search.style.display = "flex";

}) 
   



// close search bar
function close_search() {
    let search = document.querySelector(".search");
    let icon = document.querySelector(".search_icon");
    icon.style.display = "flex";
    search.style.display = "none";
}

// when enter is clicked it runs
let search_city = document.getElementById("search");
let searchval = search_city.value;

search_city.addEventListener("keydown", (event) => {
    if (event.keyCode == 13) {
        searchval = search_city.value;
        localStorage.setItem("search", JSON.stringify({
            value: search_city.value
        }))
        weather();
        let saved_cards_data = localStorage.getItem("search");
        if (saved_cards_data) {
            saved_cards_data = JSON.parse(saved_cards_data);
            saved_search.innerHTML = ` Recent Search : ${saved_cards_data.value}`

        }
        searchval = ''
    }

})


// when search button is presssed
search_icon_press.addEventListener("click",()=>
{
    searchval = search_city.value;
    localStorage.setItem("search", JSON.stringify({
        value: search_city.value
    }))
    weather();
    let saved_cards_data = localStorage.getItem("search");
    if (saved_cards_data) {
        saved_cards_data = JSON.parse(saved_cards_data);
        saved_search.innerHTML = ` Recent Search : ${saved_cards_data.value}`

    }
    searchval = ''
})






// to fetch the api
function weather() {


    // to clear the previous data before display next
    weatherCardTemps.forEach(card => {
        card.innerHTML = '';
    });

    cardContents.forEach(card => {
        card.innerHTML = '';
    });

    weatherCardDays.forEach(card => {
        card.innerHTML = '';
    });

    tempshow.innerHTML = ``;
    date_show.innerHTML = ``;
    condition.innerHTML = ``;
    wimage.innerHTML = ``;
    wimage.style.display = 'none';
    wind_speed.innerHTML = ``;
    the_humidity.innerHTML = ``;
    cityshow.innerHTML = ``;
    days_weather.innerHTML = ``;
const apikey='xyz';
    
    let p = fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${searchval}&days=4&aqi=no&alerts=yes`);

    p.then((js_return) => {
        return js_return.json();
    }).then((forcast) => {


        let city = forcast.location.name;
        cityshow.innerHTML = city;

        let date = forcast.location.localtime;
        date_show.innerHTML = date;

        let temperature = forcast.current.temp_c
        tempshow.innerHTML = `${temperature} °C`;

        let weather_condition = forcast.current.condition.text;
        condition.innerHTML = weather_condition;

        let image = forcast.current.condition.icon;
        wimage.style.display = 'block';
        wimage.src = image;

        let speed = forcast.current.wind_kph;
        wind_speed.innerHTML = "Wind Speed : " + `${speed}kph`;

        let humidity_value = forcast.current.humidity;
        the_humidity.innerHTML = "Humidity : " + `${humidity_value}%`;

        let ihtml = ``;

        for (item in forcast.forecast.forecastday) {

            ihtml += `
        <div class="weather_cards">
    <div class="weather_card_day">
    
    </div>
  <div class="weather_card_temp">
  <h2> ${forcast.forecast.forecastday[item].day.avgtemp_c}</h2>
  </div>

    <div class="card_content">
    <p>${forcast.forecast.forecastday[item].day.condition.text}</p>

    </div>
 </div>
        
        `

            days_weather.innerHTML = ihtml;

            localStorage.setItem("cards", JSON.stringify({

                card_data: ihtml


            }))
        }

        // save the data in browser

        localStorage.setItem("weather", JSON.stringify({

            city: city,
            date: date,
            temperature: `${temperature} °C`,
            condition: weather_condition,
            icon: image,
            wind: "Wind Speed : " + `${speed}kph`,
            humidity: "Humidity : " + `${humidity_value}%`,

        }))



    }).catch((err) => {
        console.log("errrr" + err)
    })

}


// when window is load saved local data is loaded


window.onload = () => {
    let saved_weather = localStorage.getItem("weather")
    if (saved_weather) {
        saved_weather = JSON.parse(saved_weather);

        cityshow.innerHTML = saved_weather.city;
        date_show.innerHTML = saved_weather.date;
        tempshow.innerHTML = saved_weather.temperature;
        condition.innerHTML = saved_weather.condition;
        wimage.style.display = 'block';
        wimage.src = saved_weather.icon;
        wind_speed.innerHTML = saved_weather.wind;
        the_humidity.innerHTML = saved_weather.humidity;

        let save_cards = localStorage.getItem("cards");

        if (save_cards) {

            save_cards = JSON.parse(save_cards)
            days_weather.innerHTML = `${save_cards.card_data}`

        }
        let saved_cards_data = localStorage.getItem("search");
        if (saved_cards_data) {
            saved_cards_data = JSON.parse(saved_cards_data);
            saved_search.innerHTML = ` Previous Search : ${saved_cards_data.value}`

        }
    }


}

