var countries = ["Ottawa, Canada","New York, United States","Cape Town, South Africa","Munich, Germany","Vancouver, Canada","London, England","Tokyo, Japan","Delhi, India","Shanghai, China","Sao Paulo, Brazil","Mexico City, Mexico","Dhaka, Bangladesh","Cairo, Egypt","Beijing, China","Mumbai, India","Osaka, Japan","Karachi, Pakistan","Chongqing, China","Istanbul, Turkey","Buenos Aires, Argentina","Kolkata, India","Lagos, Nigeria","Kinshasa, Dr Congo","Manila, Philippines","Tianjin, China","	Rio De Janeiro, Brazil","Guangzhou, China","Lahore, Pakistan","Moscow, Russia","Shenzhen, China","Bangalore, India","Paris, France","Bogota, Colombia","Chennai, India","Hamilton, Canada","Burlington, Canada","Toronto, Canada","Oakville, Canada","Auckland, New Zealand","Amsterdam, Netherlands","Atlanta, United States", "Atlantic City, United States", "Austin, United States","Baltimore, United States", "Bel Air, United States", "Berkeley, United States", "Boston, United States", "Buffalo, United States", "Cambridge, United States", "Chicago, United States", "Cincinnati, United States", "Cleveland, United States", "Colorado Springs, United States", "Columbia, United States", "Columbus, United States", "Concord, United States", "Dallas, United States", "Daly City, United States", "Danbury, United States", "Davenport, United States", "Davidson County, United States", "Dayton, United States", "Daytona Beach, United States", "Deltona, United States", "Denton, United States", "Denver, United States", "El Monte, United States", "El Paso, United States", "Elizabeth", "Elk Grove, United States", "Elkhart, United States", "Erie, United States", "Escondido, United States", "Eugene, United States", "Evansville, United States", "Fairfield, United States", "Fargo, United States", "Fayetteville, United States", "Fremont, United States", "Fresno, United States", "Fullerton, United States", "Gainesville, United States", "Garden Grove, United States", "Garland, United States", "Gastonia, United States", "Gilbert, United States", "Glendale, United States", "Grand Prairie, United States", "Grand Rapids, United States", "Hagerstown, United States", "Hampton, United States","Honolulu, United States", "Houma, United States", "Houston, United States", "Huntington Beach, United States", "Huntsville, United States", "Indianapolis, United States", "Irving, United States", "Jackson, United States", "Jacksonville, United States", "Jefferson, United States", "Jersey City, United States", "Johnson City, United States", "Joliet, United States", "Kailua, United States", "Kalamazoo, United States", "Kaneohe, United States", "Kansas City, United States", "Kennewick, United States", "Kenosha, United States", "Killeen, United States", "Kissimmee, United States", "Knoxville, United States", "Lacey, United States", "Lancaster, United States","Las Vegas, United States", "Long Beach, United States", "Lorain, United States", "Los Angeles, United States", "Louisville, United States", "Lowell, United States", "Lubbock, United States", "Macon, United States", "Madison, United States", "Manchester, United States", "Marina, United States", "Marysville, United States","Philadelphia, United States", "Phoenix, United States", "Pittsburgh, United States", "Port Saint Lucie, United States", "Port St. Lucie, United States", "Portland, United States", "Racine, United States", "Raleigh, United States", "Rancho Cucamonga, United States", "Reading, United States", "Redding, United States", "Reno, United States", "Richland, United States", "Richmond, United States", "Sacramento, United States", "Salt Lake City, United States", "San Diego, United States", "San Francisco, United States", "San Jose, United States", "Santa Ana, United States", "Santa Barbara, United States", "Santa Clara, United States", "Santa Clarita, United States", "Santa Cruz, United States", "Santa Maria, United States", "Santa Rosa, United States", "Sarasota, United States", "Savannah, United States", "Scottsdale, United States", "Scranton, United States", "Seaside, United States", "Seattle, United States", "Sebastian, United States", "Shreveport, United States", "Simi Valley, United States", "Sioux City, United States", "Sioux Falls, United States", "South Bend, United States", "South Lyon, United States", "Spartanburg, United States", "Spokane, United States", "Springdale, United States", "Springfield, United States", "St. Louis, United States", "St. Paul, United States", "St. Petersburg, United States", "Stamford, United States", "Sterling Heights, United States", "Stockton, United States", "Sunnyvale, United States", "Syracuse, United States", "Tacoma, United States", "Tallahassee, United States", "Tampa, United States", "Temecula, United States", "Tempe, United States", "Thornton, United States", "Thousand Oaks, United States", "Toledo, United States", "Topeka, United States", "Torrance, United States", "Trenton, United States", "Tucson, United States", "Tulsa, United States", "Tuscaloosa, United States", "Tyler, United States", "Utica, United States", "Vallejo, United States", "Vero Beach, United States", "Victorville, United States", "Virginia Beach, United States", "Visalia, United States", "Waco, United States", "Warren, United States", "Washington, United States", "Waterbury, United States", "Waterloo, United States", "West Covina, United States", "West Valley City, United States", "Westminster, United States", "Wichita, United States", "Wilmington, United States", "Winston, United States", "Winter Haven, United States", "Worcester, United States", "Yakima, United States", "Yonkers, United States", "York, United States", "Youngstown, United States"];
/*This is a very long array of cities around the world, I use this to make the automatic city recommendations when the user goes to enter a location in the search bar.
Most of these cities are from the United States because I found a typed array at this link: https://gist.github.com/norcal82/42440bd06a67eb7d9616. Some other locations that came up to my mind I typed in.*/
const splash = document.querySelector(".splash"); //This "splash" variable will act as a time out function, this is used for the splash screen used at the first start of the app and the resetting of the app.
document.addEventListener("DOMContentLoaded", e => { //Added event listener to detect when the content is loaded.
  setTimeout(() => { //Using the setTimeout function to add a timer to display-none which will get rid of the splash screen.
    splash.classList.add("display-none");
  }, 3000);
})

//These variables down below are set to take or give data to a certain location on the app. For example, "notification" will be the notification to the user if they did not enter something acceptable by the app.
const form = document.querySelector(".banner form"); 
const input = document.querySelector(".banner input");
const notification = document.querySelector(".banner .notification");
const list = document.querySelector(".weatherCards .grid");
const apiKey = "c5b085d99ebee7047c217a50c88e4513"; //This is the api key I got from signing up with OpenWeatherMap, this is one of the most used free providers of weather data.

//---------------------------------------------------------------------------------------prevent two requests of the same location----------------------------------------------------------------

form.addEventListener("submit", e => { //If the ENTER key is pressed, prevent the form from being submitted.
  e.preventDefault();
  let userInput = input.value; //set the input value in the search bar to "userInput".

  const items = list.querySelectorAll(".weatherCards .location"); //before making an AJAX request, I have to see if the unordered list is empty or not.  
  const itemArray = Array.from(items);

  if (itemArray.length > 0) { //if it isn’t empty, that means at least one successful request has already been made.

    //check to see if there’s a list item that has the name city name to the searchbar value the user entered.
    const handledArray = itemArray.filter(el => {
      let value = "";
      //example: hamilton,ca
      if (userInput.includes(",")) {
        //example: hamilton,caannnaaadd which is a invalid country.
        if (userInput.split(",")[1].length > 2) { //if the country code is larger than 2 letters.
          userInput = userInput.split(",")[0]; //only the first part of the userInput will be taken in.
          value = el 
            .querySelector(".location span")
            .textContent.toLowerCase();
        } else {
          value = el.querySelector(".location").dataset.name.toLowerCase();
        }
      } else {
        //hamilton
        value = el.querySelector(".location span").textContent.toLowerCase();
      }
      return value == userInput.toLowerCase();
    });
    
    //if the handled array length is still greater than zero, then there is a list item with the same location as the newly searched location.
    if (handledArray.length > 0) {
      notification.textContent = `The weather for ${handledArray[0].querySelector(".location span").textContent} is already displayed. Please search somewhere else!`;
      //tell the user that this location is already displayed and search another location.
      //clear the value of the searchbar and give it focus.
      form.reset();
      input.focus();
      return;
    }
  }
//---------------------------------------------------------------------------------------prevent two requests of the same location----------------------------------------------------------------
//---------------------------------------------------------------------------------------weather cards--------------------------------------------------------------------------------------------
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}&units=metric`; //puts the data from user for the city they selected along with api key into a variable "url".

  fetch(url) //Pass the url that is needed to be accessed to the fetch() method. 
    .then(response => response.json()) //this will method return a responce object, I will make use of the response object’s json() method.
    .then(data => { //now I am able to use the data I got and give it to my "weather cards."
      const { main, name, sys, weather } = data; //accessing the main, name, sys, weather parts of data that I got from the request. Which is all I need to complete my weather card.
      const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@4x.png`; //these are the weather icons I used, they are the icons provided for free by OpenWeatherMap via a url. I will set them under the "icon" variable.
      //how this works is that the API returns an "icon code" which holds the current weather condition for the searched city. Using this code, I can make a icon URL and display it in the weathercards by using the "img" tag.
      const display = document.createElement("display"); //now that I have the data for the city the user searched, I will create a associated list item then append it to the unordered list.
      display.classList.add("singleCity");

      //the variable "information" will organize all the data and give structure to the weathercards using html.
      const information = `
        <h2 class="location" data-name="${name},${sys.country}">
        <span>${name}</span>
        </h2>
        <div class="dataDisplayed">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="iconCity" src="${icon}" alt="${weather[0]["description"]}">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
        <div class="line"></div>
        <div class="dataDisplayed">${Math.round(main.feels_like)}<sup>°C</sup></div>
        <figcaption>FEELS LIKE</figcaption>
        <div class="line"></div>
        <div class="humidDisplayed">${Math.round(main.humidity)}<sup>%</sup></div>
        <figcaption>HUMIDITY</figcaption>`;
        
      display.innerHTML = information;
      list.appendChild(display); //append everything in "display" to the list which will display the weathercards on a grid.
    }) 
    .catch(() => { //if the request for information was unsuccessful, either if the city enter doesn't exsist or the user typed into the search bar something random.
      notification.textContent = "Please search a valid city or location."; //this message will pop up under the searchbar alerting the user.
    });

  notification.textContent = ""; //After the AJAX request, I will clear the content of the .notification element, anything in the searchbar, and give focus to it as well.
  form.reset();
  input.focus();
});

//---------------------------------------------------------------------------------------weather cards----------------------------------------------------------------

//-------------------------------------------------------------------------------------auto-complete----------------------------------------------------------------------------------

  function autocomplete(inp, arr) { //I learnt for to do this autocomplete feature from this website: https://www.w3schools.com/howto/howto_js_autocomplete.asp
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(x) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

  autocomplete(document.getElementById("myInput"), countries);

//-------------------------------------------------------------------------------------auto-complete----------------------------------------------------------------------------------