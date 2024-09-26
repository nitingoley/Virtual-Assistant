let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// AI speaking function
function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "en-GB";
  window.speechSynthesis.speak(text_speak);
}

function wish() {
  let day = new Date();
  let hour = day.getHours();

  if (hour >= 0 && hour < 12) {
    speak("Good morning");
  } else if (hour >= 12 && hour < 16) {
    speak("Good afternoon");
  } else if (hour >= 16 && hour < 21) {
    speak("Good evening");
  } else {
    speak("Good night");
  }
}

window.addEventListener("load", () => {
  wish();
});

// code voice recognition system

let SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  let recognition = new SpeechRecognition();

  recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;

    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    console.log(event);
    CommandTakes(transcript.toLowerCase());
  };

  btn.addEventListener("click", () => {
    recognition.start();
    console.log("Speech recognition started");
    btn.style.display = "none";
    voice.style.display = "block";
  });
}

// voice function

function playLaugh() {
  const laughSound = document.getElementById("laughSound");
  laughSound.currentTime = 0;
  laughSound.play();
}

// for cry sound / 
function CrySound() {
  const crysound = document.getElementById("crySound");
  crysound.currentTime = 0;
  crysound.play();
}


// a wheather function
// use async javascript here

async function getWeather(city = "Bareilly") {
  const apikey = "d91fb05d3e5e0173037fa2a524bc1bd3";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather data not found");

    const data = await response.json();
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const weatherMessage = `The current temperature in ${city} is ${temperature} degrees Celsius with ${weatherDescription}.`;

    speak(weatherMessage);
  } catch (error) {
    speak("I'm sorry, I couldn't get the weather information.");
    console.error(error);
  }
}

// control abusive words 
var abusiveWords = ["hate", "stupid", "idiot", "dumb", "shut up", "Fuck"];


// developer name 
const developerName = "Nitin Goley";


// Take command from user

function CommandTakes(message) {
  btn.style.display = "flex";
  voice.style.display = "none";


  for(let words of abusiveWords) {
    if(message.includes(words))
    {
      speak("Please be respectful. How can I assist you?");
      return;
    }
    }


  
  if (message.includes("hello") || message.includes("hii")) {
    speak("Hello, how can I help you?");
  } 
  else if(message.includes("what is")) {
    const topic = message.replace("what is", "").trim();
     speak(`You asked about ${topic}. I will now open Google for more information on ${topic}`);
     setTimeout(() => {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(topic)}`, '_blank');  
  }, 4000); 
  }
  // flirt with assisant 
  else if (message.includes("flirt") || message.includes("are you single") || message.includes("do you love me")) {
    const flirtResponses = [
        "I’m not programmed to love, but I can definitely care about you!",
        "Of course, I’m head over circuits for you!",
        "You must be a magician, because whenever I look at you, everyone else disappears!",
        "If I had a heart, it would skip a beat for you!"
    ];
    const aiProgram = flirtResponses[Math.floor(Math.random() * flirtResponses.length)]
    speak(aiProgram)
  }

  else if(message.includes('who developed you') || message.includes("who is you developer") || message.includes("your developer")){
    speak(`I was developed by ${developerName}.`);
  }
  else if (message.includes("I love you")  || message.includes("I like you")) {
    const flirtResponses = [
        "I’m not programmed to love, but I can definitely care about you!",
        "Of course, I’m head over circuits for you!",
        "You must be a magician, because whenever I look at you, everyone else disappears!",
        "If I had a heart, it would skip a beat for you!"
    ];
    const aiProgram = flirtResponses[Math.floor(Math.random() * flirtResponses.length)]
    speak(aiProgram)
  }
  else if (message.includes("what is your name")) {
    speak("I am Jennifer, your virtual assistant.");
  } else if (message.includes("how are you")) {
    speak("I am just a computer program, but thanks for asking!");
  } else if (message.includes("what can you do")) {
    speak(
      "I can assist you with various tasks, answer your questions, and provide information."
    );
  } else if (message.includes("tell me a joke")) {
    speak(
      "Why did the scarecrow win an award? Because he was outstanding in his field!"
    );
  } else if (message.includes("laugh") || message.includes("Can you laugh")) {
    playLaugh();
  } 
  else if (message.includes("cry") || message.includes("Can you cry")) {
    playLaugh();
  } 
  else if (message.includes("thank you")) {
    speak("You're welcome! If you have any other questions, feel free to ask.");
  } else if (message.includes("open whatsapp")) {
    window.open("https://www.whatsapp.com", "_blank");
    speak("Open whatsapp");
  } else if (message.includes("open youtube")) {
    window.open("https://www.youtube.com", "_blank");
    speak("Open youtube");
  } else if (message.includes("open instagram")) {
    window.open("https://www.instagram.com", "_blank");
    speak("Open instagram");
  } else if (/what is the weather/i.test(message)) {
    getWeather();
  } else if (message.includes("open google")) {
    window.open("https://www.google.com", "_blank");
    speak("Open google");
  }
  
  
  else {
    speak("I'm sorry, I didn't understand that. Can you please rephrase?");
  }
}
