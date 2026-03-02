// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
//SCREEN ORIENTATION LOCK
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

if (screen.orientation && screen.orientation.lock) {
  screen.orientation.lock("portrait").catch(() => {});
}
let temp;
//https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation


// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
//STATS
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

var scenesCompleted = {
  phoneScene: {
    appSelection: false,
    mapsApp: false,
    messagesNotification: false,
    healthNotification: false,
    surveillanceNotification: false,
    remindersApp: false,
  },
  computerScene: {
    docsScene: false,
    chatbotScene: false,
    emailScene: false
  }
}

var userStats = {
  cash: false,
  card: false,
  mobilePay: false,
  messagingApps: false,
  healthApps: false,
  surveillanceApps: false,
  walk: false,
  bike: false,
  car: false,
  publicTransit: false,
  rideshare: false,
  plane: false,
  socialApps: false,
  learningApps: false,
  shoppingApps: false,
  musicApps: false,
  gamesApps: false,
  locationApps: false,
  datingApps: false,
  religionApps: false,
  superStores: false,
  groceryStores: false,
  clothingStores: false,
  pharmacies: false,
  luxuryStores: false,
  homeImprovementStores: false,
  onlineStores: false,
  occupation: null,
  education: null,
  graduationYear: null,
  studentStatus: false,
  chatbotUse: false,
  scamEmails: false,
  isParentGuardian: false,
  insuranceProvider: null
};

function updateStatBlock(stat, value) {
  userStats[stat] = value;
  console.log(stat, value)
}
function markSceneComplete(scene, section) {
  if (!(scene in scenesCompleted)) return;

  // Only mark if section exists
  if (section && scenesCompleted[scene].hasOwnProperty(section)) {
    scenesCompleted[scene][section] = true;
  }

  // Check if all sections are complete
  const allComplete = Object.values(scenesCompleted[scene]).every(val => val === true);

  if (allComplete) {
    if (scene === "phoneScene") {
      scenesCompleted.phoneSceneComplete = true;
      phoneScroll();
    }
    // else if (scene === "computerScene") {
    //   scenesCompleted.computerSceneComplete = true; 
    //   // computerScroll();
    // }
  }
}

function phoneScroll() {
  if (!scenesCompleted.phoneSceneComplete) return;
  console.log("SCENE COMPLETED");

  const phoneWallpaper = document.getElementById("phone-wallpaper");
  const currentScene = document.getElementById("apps-scene");


  setTimeout(() => {
    homeScreen.style.display = "none";
    phoneWallpaper.style.display = "none";
    lockSound.currentTime = 0;
    lockSound.play();


    setTimeout(() => {

      requestAnimationFrame(() => {
        if (currentScene) {
          scrollToNextScene(currentScene);
        }
      });
    }, 1000);
  }, 1000);
}

function computerScroll() {
  const terminalScene = document.getElementById("terminal-scene");
  if (!terminalScene) return;


  setTimeout(() => {
    nextSound.play()
    terminalScene.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 5000);
}

function scrollToNextScene(currentSceneElement) {
  if (!currentSceneElement) return;

  const nextScene = currentSceneElement.nextElementSibling?.classList.contains("scene")
    ? currentSceneElement.nextElementSibling
    : currentSceneElement.parentElement.querySelector(
      ".scene:nth-of-type(" +
      (Array.from(document.querySelectorAll(".scene")).indexOf(currentSceneElement) + 2) +
      ")"
    );

  if (nextScene) {
    nextScene.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
// HELP SCREEN
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

const helpButton = document.getElementById("help-button");
const helpOverlay = document.getElementById("help-overlay");

helpButton.addEventListener("click", () => {
  const isActive = helpButton.classList.toggle("active");
  helpOverlay.style.display = isActive ? "flex" : "none";


  helpButton.querySelector("img").src = isActive ? "assets/x.png" : "assets/settings.png";
});


helpOverlay.addEventListener("click", (e) => {
  if (e.target === helpOverlay) {
    helpOverlay.style.display = "none";
    helpButton.classList.remove("active");
    helpButton.querySelector("img").src = "assets/settings.png";
  }
});

// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
// HELP HIGHLIGHTS
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

const tipButtons = document.querySelectorAll("#eye-app");
const tipElements = document.querySelectorAll(".tip-element");


let highlightDuration = 3000;
let inactivityTimer;
let highlightTimeout;

function highlight() {

  tipElements.forEach(el => el.classList.add("highlight-tip"));


  clearTimeout(highlightTimeout);
  highlightTimeout = setTimeout(() => {
    tipElements.forEach(el => el.classList.remove("highlight-tip"));
  }, highlightDuration);
}


tipButtons.forEach(button => {
  button.addEventListener("click", () => {
    highlight();
    clearTimeout(inactivityTimer);
    resetInactivityTimer();
  });
});

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    highlight();
  }, 6000);
}



["keydown", "scroll", "click"].forEach(event => {
  document.addEventListener(event, resetInactivityTimer);
});

resetInactivityTimer();


// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
// STREAMER MODE and SKIP GUIDE
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

const streamerButton = document.getElementById("streamer-mode");
const modal = document.getElementById("streamer-modal");
const modalTitle = document.getElementById("streamer-modal-title");
const confirmBtn = document.getElementById("confirm-streamer");
const cancelBtn = document.getElementById("cancel-streamer");

let streamerModeOn = false;

function updateModalText() {
  if (streamerModeOn) {
    modalTitle.textContent = "Turn OFF Streamer Mode";
  } else {
    modalTitle.textContent = "Turn ON Streamer Mode";
  }
}

streamerButton.addEventListener("click", () => {
  updateModalText();
  modal.classList.remove("hidden");
});

confirmBtn.addEventListener("click", () => {
  streamerModeOn = !streamerModeOn;

  if (streamerModeOn) {
    streamerButton.textContent = "STREAMER MODE ON";
    document.body.classList.add("streamer-active");
  } else {
    streamerButton.textContent = "STREAMER MODE OFF";
    document.body.classList.remove("streamer-active");
  }

  modal.classList.add("hidden");
});

cancelBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

const guideButton = document.getElementById("view-complete-guide");
const guideModal = document.getElementById("guide-warning-modal");
const confirmGuideBtn = document.getElementById("confirm-guide");
const cancelGuideBtn = document.getElementById("cancel-guide");
const resultsScene = document.getElementById("results-scene");

let includeReasoningInPdf = true;

guideButton.addEventListener("click", () => {
  guideModal.classList.remove("hidden");
});

confirmGuideBtn.addEventListener("click", () => {
  guideModal.classList.add("hidden");


  userStats = {
    cash: true,
    card: true,
    mobilePay: true,
    messagingApps: false,
    healthApps: true,
    surveillanceApps: true,
    walk: false,
    bike: false,
    car: true,
    publicTransit: true,
    rideshare: true,
    plane: true,
    socialApps: true,
    learningApps: true,
    shoppingApps: true,
    musicApps: true,
    gamesApps: true,
    locationApps: true,
    datingApps: true,
    religionApps: true,
    superStores: true,
    groceryStores: true,
    clothingStores: true,
    pharmacies: true,
    luxuryStores: true,
    homeImprovementStores: true,
    onlineStores: true,
    occupation: true,
    education: true,
    graduationYear: true,
    studentStatus: true,
    chatbotUse: true,
    scamEmails: true,
    insuranceProvider: true
  };

  includeReasoningInPdf = false;

  if (resultsScene) {
    resultsScene.scrollIntoView();
    setTimeout(() => { slideBackgroundDown(); }, 1000);
  }
});
cancelGuideBtn.addEventListener("click", () => {
  guideModal.classList.add("hidden");
});


// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
// OPTIONS
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

const effectsButton = document.getElementById("effect-controls");
const effectsModal = document.getElementById("effects-modal");
const closeEffectsBtn = document.getElementById("close-effects");

const toggleStaticSound = document.getElementById("toggle-static-sound");
const toggleAllSounds = document.getElementById("toggle-all-sounds");
const toggleStaticOverlay = document.getElementById("toggle-static-overlay");


const staticSound = document.getElementById("static-sound");


const allAudio = document.querySelectorAll("audio");


const staticOverlays = document.querySelectorAll(".background-video");


effectsButton.addEventListener("click", () => {
  effectsModal.classList.remove("hidden");
});


closeEffectsBtn.addEventListener("click", () => {
  effectsModal.classList.add("hidden");
});


toggleStaticSound.addEventListener("change", () => {
  if (toggleStaticSound.checked) {
    staticSound.muted = false;
    staticSound.play();
  } else {
    staticSound.muted = true;
  }
});


toggleAllSounds.addEventListener("change", () => {
  allAudio.forEach(audio => {
    audio.muted = !toggleAllSounds.checked;
  });
});


toggleStaticOverlay.addEventListener("change", () => {
  staticOverlays.forEach(overlay => {
    if (toggleStaticOverlay.checked) {
      overlay.classList.remove("fade-out");
      overlay.style.display = "block";
      requestAnimationFrame(() => {
        overlay.style.opacity = ".1";
      });
    } else {
      overlay.classList.add("fade-out");
      setTimeout(() => {
        if (!toggleStaticOverlay.checked) {
          overlay.style.display = "none";
        }
      }, 600);
    }
  });
});


// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
// HELP POPUP SETTINGS SYNC
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

const helpToggleStreamer = document.getElementById("help-toggle-streamer");
const helpToggleStaticSound = document.getElementById("help-toggle-static-sound");
const helpToggleAllSounds = document.getElementById("help-toggle-all-sounds");
const helpToggleStaticOverlay = document.getElementById("help-toggle-static-overlay");

if (helpToggleStreamer && helpToggleStaticSound && helpToggleAllSounds && helpToggleStaticOverlay) {
  helpButton.addEventListener("click", () => {
    helpToggleStreamer.checked = streamerModeOn;
    helpToggleStaticSound.checked = toggleStaticSound.checked;
    helpToggleAllSounds.checked = toggleAllSounds.checked;
    helpToggleStaticOverlay.checked = toggleStaticOverlay.checked;
  });

  helpToggleStreamer.addEventListener("change", () => {
    if (helpToggleStreamer.checked !== streamerModeOn) {
      streamerModeOn = helpToggleStreamer.checked;
      if (streamerModeOn) {
        streamerButton.textContent = "STREAMER MODE ON";
        document.body.classList.add("streamer-active");
      } else {
        streamerButton.textContent = "STREAMER MODE OFF";
        document.body.classList.remove("streamer-active");
      }
    }
  });

  helpToggleStaticSound.addEventListener("change", () => {
    toggleStaticSound.checked = helpToggleStaticSound.checked;
    toggleStaticSound.dispatchEvent(new Event("change"));
  });

  helpToggleAllSounds.addEventListener("change", () => {
    toggleAllSounds.checked = helpToggleAllSounds.checked;
    toggleAllSounds.dispatchEvent(new Event("change"));
  });

  helpToggleStaticOverlay.addEventListener("change", () => {
    toggleStaticOverlay.checked = helpToggleStaticOverlay.checked;
    toggleStaticOverlay.dispatchEvent(new Event("change"));
  });
}


// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
// NEXT SCENE TRIGGER
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

// console.log(document.querySelectorAll(".scroll-to-next-screen"));

document.querySelectorAll(".scroll-to-next-screen").forEach(trigger => {
  trigger.addEventListener("click", () => {
    const currentScene = trigger.closest(".scene");
    if (!currentScene) return;

    const nextScene = currentScene.nextElementSibling?.classList.contains("scene")
      ? currentScene.nextElementSibling
      : currentScene.parentElement.querySelector(
        ".scene:nth-of-type(" +
        (Array.from(document.querySelectorAll(".scene")).indexOf(currentScene) + 2) +
        ")"
      );

    if (nextScene) {
      const delay = currentScene.classList.contains("instant") ? 0 : 2000;

      if (delay === 0) {
        // Instant: play sound and scroll immediately
        nextSound.currentTime = 0;
        nextSound.play();
        nextScene.scrollIntoView({ behavior: "smooth", block: "start" });
        if (nextScene.id === "results-scene") {
          setTimeout(() => { slideBackgroundDown(); }, 1000);
        }
      } else {
        nextSound.currentTime = 0;
        nextSound.play();// Delayed: play sound after 1 second, scroll after 2 seconds
        setTimeout(() => {


          setTimeout(() => {
            nextScene.scrollIntoView({ behavior: "smooth", block: "start" });
            if (nextScene.id === "results-scene") {
              setTimeout(() => { slideBackgroundDown(); }, 1000);
            }
          }, 1000); // scroll 1s after sound
        }, 1000); // start sound after 1s
      }
    }
  });
});




// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
// SOUND EFFECTS  
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

const tapSound = new Audio("assets/sounds/tap.mp3");
const notificationSound = new Audio("assets/sounds/notification.mp3");
// notificationSound.volume = 0.5;
const penSound = new Audio("assets/sounds/pen.mp3");
penSound.volume = 0.4;
const typingSound = new Audio("assets/sounds/typing.mp3");
typingSound.volume = 0.2;
const popSound = new Audio('assets/sounds/pop.mp3');
const clickSound = new Audio('assets/sounds/mouse-click.mp3');
const removeCardSound = new Audio('assets/sounds/remove-card.mp3')
removeCardSound.volume = 0.5
const lockSound = new Audio('assets/sounds/lock.mp3')
const cashRegisterSound = new Audio('assets/sounds/cash-register.mp3')
cashRegisterSound.volume = 0.5
const tapToPaySound = new Audio('assets/sounds/tap-to-pay.mp3')
tapToPaySound.volume = 0.5
const buttonPressSound = new Audio('assets/sounds/button-press.mp3')
const shineSound = new Audio('assets/sounds/shine.mp3')
const crashSound = new Audio('assets/sounds/crash.mp3')
const nextSound = new Audio('assets/sounds/next.mp3')
nextSound.volume = 0.5


// BACKGROUND STATIC
const staticAudio = new Audio("assets/sounds/static.mp3");
staticAudio.volume = 0.05;

// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
// INTRO: TYPING ANIMATION
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

function typeWriter(element, speed = 40) {
  const nodes = Array.from(element.childNodes);
  element.innerHTML = ""; // clear for typing

  let nodeIndex = 0;
  let charIndex = 0;
  let typing = true;

  function finishTyping() {
    typing = false;
    // restore full content
    element.innerHTML = "";
    nodes.forEach(node => element.appendChild(node.cloneNode(true)));

    // show the next button
    const button = element.parentElement.querySelector(".after-typewriter");
    if (button) button.classList.add("show");
  }

  function type() {
    if (!typing) return;

    if (nodeIndex >= nodes.length) {
      finishTyping();
      return;
    }

    const currentNode = nodes[nodeIndex];

    if (currentNode.nodeType === Node.TEXT_NODE) {
      const text = currentNode.textContent;
      if (charIndex < text.length) {
        element.append(text.charAt(charIndex));
        charIndex++;
        setTimeout(type, speed);
      } else {
        nodeIndex++;
        charIndex = 0;
        type();
      }
    } else if (currentNode.nodeName === "BR") {
      element.appendChild(document.createElement("br"));
      nodeIndex++;
      type();
    } else {
      // clone other elements like <span>
      const clone = currentNode.cloneNode(false);
      element.appendChild(clone);
      nodeIndex++;
      type();
    }
  }

  // skip typing if user clicks inside container
  function skipTyping(e) {
    if (!element.parentElement.contains(e.target)) return;
    finishTyping();
    document.removeEventListener("click", skipTyping);
  }

  document.addEventListener("click", skipTyping);

  type();
}

// Scroll observer to start typing when container enters viewport
document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".typewriter-container");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const typewriter = entry.target.querySelector(".typewriter");
        typeWriter(typewriter, 40);
        obs.unobserve(entry.target); // only start once
      }
    });
  }, { threshold: 0.3 });

  containers.forEach(container => observer.observe(container));
});




// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
// INTRO: FIELD OFFICE SCENE
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

async function getLocation() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();

    return {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name
    };

  } catch (err) {
    console.error("Failed to fetch location info:", err);
    return null;
  }
}

function getRandomName() {
  const names = [
    "Jack", "Grace", "Sofia", "Dominique", "Cheyenne", "Tony", "Hana"
  ];
  return names[Math.floor(Math.random() * names.length)];
}

const startButton = document.getElementById("game-start");

startButton.addEventListener("click", async () => {
  const container = document.getElementById("field-office-text");
  const fieldOfficeWindow = document.getElementById("field-office-ui")
  const location = await getLocation();
  const agentName = getRandomName();
  const streamerModeValue = streamerModeOn;
  staticAudio.play()



  // const cityText = location && location.city && location.country
  //   ? `${location.city}, ${location.country}`
  //   : "an undisclosed location";

  // const ipText = location && location.ip
  //   ? location.ip
  //   : "Unknown IP";

  const paragraph = document.createElement("p");

  if (!streamerModeValue && location && location.city && location.country) {
    // show location-based text
    paragraph.innerHTML = `
      Based on your IP address: <strong>${location.ip}</strong> (completely public by the way), 
      it looks like the closest Eyes on AI field office is<br><br> 
      <span>${location.city}, ${location.country}</span>. <br><br>
      Agent ${agentName} will be helping you create your personalized guide today. <br><br>
      Keep in mind that all the questions you answer in this quiz are completely anonymous and we do not save any data during or after you leave this website. Be honest as possible to get the most relevant results.
      Be sure to download your results at the end or it will be gone forever (unlike the data that the government has on you). <br><br>
      Progress is not saved. Also Agent ${agentName} isn't real.
    `;
  } else {
    // fallback text if location missing or streamer mode ON
    paragraph.innerHTML = `
      Welcome to Eyes on AI.
      Agent ${agentName} will still be helping you create your personalized guide today. <br><br>
      Keep in mind that all the questions you answer in this quiz are completely anonymous and we do not save any data during or after you leave this website. Be honest as possible to get the most relevant results.
      Be sure to download your results at the end or it will be gone forever. <br><br>
      Progress is not saved. Also Agent ${agentName} isn't real.
    `;
  }

  container.appendChild(paragraph);
  fieldOfficeWindow.style.display = "flex"
});


// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
//LOCK SCREEN
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️


//🕰️🕰️🕰️🕰️🕰️🕰️🕰️
//CLOCK
//🕰️🕰️🕰️🕰️🕰️🕰️🕰️

const clockText = document.getElementById("clock");
const lockScreen = document.getElementById("lock-screen")
const homeScreen = document.getElementById("home-screen")

const clock = () => {
  const date = new Date();

  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");

  clockText.textContent = `${hours}:${minutes}`;
};

clock();
setInterval(clock, 1000);

// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
//INSTRUCTIONS
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

const phrases = [
  // "Warrantless surveillance is entirely legal.",
  // "Explore our devices to find out what data is being stolen from you.",
  // "We will create a personalized guide to keeping yourself safe.",
  // "This might feel like a game, but the stakes are very real.",
  "Click the screen to begin."
];

const notificationsGroup = document.getElementById("intro-notifications");
const template = document.getElementById("intro-notification-popup");
template.style.display = "none";

const screenSpace = document.getElementById("screen-space");


let currentIndex = 0;
let lastNotificationShown = false;
const spacing = 87;

function wrapText(text, maxCharsPerLine = 35) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + word).length > maxCharsPerLine) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  }
  if (currentLine) lines.push(currentLine.trim());
  return lines;
}

function showNextNotification() {
  if (currentIndex >= phrases.length) return;

  const text = phrases[currentIndex];

  const clone = template.cloneNode(true);
  clone.style.display = "block";
  clone.removeAttribute("id");


  const originalTransform = template.getAttribute("transform") || "translate(0,0)";
  const translateMatch = originalTransform.match(/translate\(([^,]+),\s*([^)]+)\)/);
  let origX = 0, origY = 0;
  if (translateMatch) {
    origX = parseFloat(translateMatch[1]);
    origY = parseFloat(translateMatch[2]);
  }
  const newY = origY + currentIndex * spacing;
  clone.setAttribute("transform", `translate(${origX}, ${newY})`);


  const textEl = clone.querySelector("text:nth-of-type(2)");
  if (textEl) {
    const oldTransform = textEl.getAttribute("transform") || "";
    textEl.innerHTML = '';

    const lines = wrapText(text, 35);

    const lineHeight = 18;



    lines.forEach((line, i) => {
      const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      tspan.setAttribute("x", "0");
      tspan.setAttribute("y", `${i * lineHeight}`);
      tspan.textContent = line;
      textEl.appendChild(tspan);
    });

    // preserve existing transform on the text
    if (oldTransform) {
      textEl.setAttribute("transform", oldTransform);
    }
  }

  notificationsGroup.appendChild(clone);
  currentIndex++;

  if (currentIndex === phrases.length) {
    lastNotificationShown = true;
  }
}

let autoInterval = null;

function startNotifications() {
  if (autoInterval) return; // prevent starting twice

  autoInterval = setInterval(() => {
    if (currentIndex >= phrases.length) {
      clearInterval(autoInterval);
      return;
    }
    showNextNotification();
    notificationSound.currentTime = 0;
    notificationSound.play();
  }, 2000);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startNotifications();
      observer.disconnect(); // run only once
    }
  });
}, {
  threshold: 0.3 // starts when 30% visible (adjust if needed)
});

observer.observe(screenSpace);

screenSpace.addEventListener("click", () => {
  if (lastNotificationShown) {
    if (lockScreen && homeScreen && lockSound) {
      lockScreen.style.display = "none";
      homeScreen.style.display = "block";
      lockSound.currentTime = 0;
      lockSound.play();

    }
    lastNotificationShown = false;
  }
});


// //TESTING PURPOSES 
// function showAllNotificationsInstantly() {
//   while (currentIndex < phrases.length) {
//     showNextNotification();
//   }
// }
// // showAllNotificationsInstantly(); // TURN OFF FOR DEPLOYMENT




// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
//HOME SCREEN
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

// var appsSelected = false
// var storesSelected = false
// var transportationSelected = false

//all home screen apps

const homeScreenApps = document.getElementById("home-screen-apps");

//app-select scene
const appFolder = document.getElementById("app-folder")
const appSelection = document.getElementById("app-selection")

// directions scene
const mapsApp = document.getElementById("maps-app")
const directions = document.getElementById("directions")

//reminders scene
const remindersApp = document.getElementById("reminders-app")
const reminders = document.getElementById("reminders")

//notifications
// const notification = document.getElementById("phone-notification");

//Eye App
const eyeApp = document.getElementById("eye-app");


//popup-options
const messagesApp = document.getElementById("messages-app");
const healthApp = document.getElementById("health-app");
const surveillanceApp = document.getElementById("surveillance-app")

//Home Screen Options

//Open App Select
appFolder.addEventListener("click", () => {
  appSelection.style.display = "block";
  homeScreen.style.display = "none";
  tapSound.currentTime = 0;
  tapSound.play();
})

//Open Directions App
mapsApp.addEventListener("click", () => {
  directions.style.display = "block";
  homeScreen.style.display = "none";
})

//Open Reminders App
remindersApp.addEventListener("click", () => {
  reminders.style.display = "block";
  homeScreen.style.display = "none";
})

//pop-up

//NOTIFICATIONS

const notifications = {
  messages: {
    title: "NEW MESSAGE",
    body: "DO YOU USE MESSAGING APPS LIKE WHATSAPP OR MESSENGER?",
    image: "assets/messages.png",
    statKey: "messagingApps",
    sceneKey: "messagesNotification",
    userResponse: null,
  },
  health: {
    title: "HIGH HEART RATE DETECTED",
    body: "DO YOU USE HEALTH APPS, USE PERIOD TRACKERS, OR WEAR A SMART WATCH?",
    image: "assets/health.png",
    statKey: "healthApps",
    sceneKey: "healthNotification",
    userResponse: null,
  },
  surveillance: {
    title: "MOTION DETECTED",
    body: "DO YOU USE SURVEILLANCE CAMERA APPS LIKE RING?",
    image: "assets/app-icons/app-logo-ring.png",
    statKey: "surveillanceApps",
    sceneKey: "surveillanceNotification",
    userResponse: null,
  }
};


let currentNotification = null;

function showNotification(appKey) {
  const app = notifications[appKey];
  if (!app) return;

  currentNotification = appKey;

  notificationSound.currentTime = 0;
  notificationSound.play();

  const notification = document.querySelector("#phone-notification");
  notification.style.display = "block";
  // mapsApp.classList.add("transparent");
  // appFolder.classList.add("transparent");
  // eyeApp.classList.add("transparent");
  homeScreenApps.classList.add("transparent")
  homeScreenApps.classList.add("unclickable")


  const notifImageContainer = document.getElementById("app-notif-icon");
  notifImageContainer.innerHTML = `<image class="notification-image" href="${app.image}" x="12.46" y="20.51" width="38.9" height="38.9"
              clip-path="url(#notifIconClip)" preserveAspectRatio="xMidYMid slice" />`
  setSVGText(".notification-title", app.title, 300);
  setSVGText(".notification-body", app.body, 300);



}


const yesButton = document.querySelector("#yes-button");
const noButton = document.querySelector("#no-button");

yesButton.addEventListener("click", () => {
  if (!currentNotification) return;

  const notif = notifications[currentNotification];

  notif.userResponse = "yes";
  updateStatBlock(notif.statKey, true);
  markSceneComplete('phoneScene', notif.sceneKey);

  hideNotification();
});

noButton.addEventListener("click", () => {

  if (!currentNotification) return;

  const notif = notifications[currentNotification];

  notif.userResponse = "no";
  updateStatBlock(notif.statKey, false);
  markSceneComplete('phoneScene', notif.sceneKey);

  hideNotification();
});

function hideNotification() {
  const notification = document.querySelector("#phone-notification");
  notification.style.display = "none";
  // mapsApp.classList.remove("transparent");
  // appFolder.classList.remove("transparent");
  // eyeApp.classList.remove("transparent");
  homeScreenApps.classList.remove("transparent")
  homeScreenApps.classList.remove("unclickable")

  currentNotification = null; // reset
}

messagesApp.addEventListener("click", () => showNotification("messages"));
healthApp.addEventListener("click", () => showNotification("health"));
surveillanceApp.addEventListener("click", () => showNotification("surveillance"));

function setSVGText(containerSelector, text, maxWidth) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = ""; // clear old tspans

  const words = text.split(" ");
  let line = "";
  let lineNumber = 0;
  const lineHeight = 18; // spacing between lines

  words.forEach((word, index) => {
    const testLine = line ? line + " " + word : word;

    // Create a temporary off-DOM tspan for measurement
    const tempTspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
    tempTspan.setAttribute("x", 0);
    tempTspan.setAttribute("y", 0);
    tempTspan.textContent = testLine;

    container.appendChild(tempTspan);
    const bbox = tempTspan.getBBox();
    container.removeChild(tempTspan); // remove immediately after measuring

    if (bbox.width > maxWidth && line !== "") {
      // commit current line
      const newTspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      newTspan.setAttribute("x", 0);
      newTspan.setAttribute("y", lineNumber * lineHeight);
      newTspan.textContent = line;
      container.appendChild(newTspan);

      line = word; // start new line
      lineNumber++;
    } else {
      line = testLine; // keep building current line
    }

    // Commit last line at the end
    if (index === words.length - 1) {
      const finalTspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      finalTspan.setAttribute("x", 0);
      finalTspan.setAttribute("y", lineNumber * lineHeight);
      finalTspan.textContent = line;
      container.appendChild(finalTspan);
    }
  });
}


// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
//app-select scene
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

var app = $(".app")
app.on("click", function() {
  $(this).toggleClass("transparent")
  $(this).toggleClass("opaque")
})

document.querySelectorAll(".app-slot").forEach(slot => {
  slot.addEventListener("click", () => {
    const rect = slot.querySelector("rect");
    rect.classList.toggle("transparent");
  });
});

const selectedApps = [];

const appSlots = document.querySelectorAll(".app-slot");
const doneButton = document.getElementById("phone-done-button");

// sound on click 🔈🔈🔈🔈🔈🔈
appSlots.forEach(app => {
  app.addEventListener("click", () => {

    tapSound.currentTime = 0;
    tapSound.play();

    const appId = app.dataset.app;
    const index = selectedApps.indexOf(appId);

    if (index === -1) {
      selectedApps.push(appId);
      app.classList.add("selected");
    } else {
      selectedApps.splice(index, 1);
      app.classList.remove("selected");
    }

    updateDoneButton();
  });
});

function updateDoneButton() {
  if (selectedApps.length > 0) {
    doneButton.classList.remove("transparent");
    doneButton.classList.remove("unclickable");
  } else {
    doneButton.classList.add("transparent");
    doneButton.classList.add("unclickable");
  }
}

doneButton.addEventListener("click", () => {
  markSceneComplete('phoneScene', 'appSelection')
  tapSound.currentTime = 0;
  tapSound.play();


  appSlots.forEach(app => {
    const statKey = app.id;
    const isSelected = selectedApps.includes(app.dataset.app);

    updateStatBlock(statKey, isSelected);
  });

  appSelection.style.display = "none";
  homeScreen.style.display = "block";
});




// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
//directions scene
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

// const directionsBlock = document.getElementById("directions-block")
const directionsInstructions = document.getElementById("directions-instructions");
const miniDirections = document.getElementById("mini-directions-instructions")
const goButton = document.getElementById("go-button")


goButton.addEventListener("click", () => {
  markSceneComplete('phoneScene', 'mapsApp')
  if (selectedOptions.length === 0) return;

  const statMap = {
    "car": "car",
    "walk": "walk",
    "bike": "bike",
    "public-transit": "publicTransit",
    "rideshare": "rideshare",
    "plane": "plane"
  };

  Object.keys(statMap).forEach(id => {
    const statKey = statMap[id];
    const isSelected = selectedOptions.includes(id);

    updateStatBlock(statKey, isSelected);
  });

  directions.style.display = "none";
  homeScreen.style.display = "block";
});


const travelOptions = document.getElementById('travel-options');

const order = [
  'car',
  'walk',
  'bike',
  'public-transit',
  'rideshare',
  'plane'
];

const selectedSet = new Set();
let selectedOptions = [];

function updateSelectedArray() {

  selectedOptions = order.filter(id => selectedSet.has(id));


  //  console.log('Selected options:', selectedOptions);
}

function updateTransitUI() {

  order.forEach(id => {
    const group = travelOptions.querySelector(`#${id}`);
    const rect = group.querySelector('rect.blue');

    rect.classList.toggle('active', selectedSet.has(id));
  });


  order.forEach((id, index) => {
    if (index === order.length - 1) return;

    const nextId = order[index + 1];
    const connector = travelOptions.querySelector(
      `.connector.${id}-${nextId}`
    );

    connector.classList.toggle(
      'active',
      selectedSet.has(id) && selectedSet.has(nextId)
    );
  });
}

order.forEach(id => {
  const group = document.getElementById(id);

  group.addEventListener('click', () => {
    if (selectedSet.has(id)) {
      selectedSet.delete(id);
    } else {
      selectedSet.add(id);
    }

    updateSelectedArray();
    updateTransitUI();
    updateTravelTextUI();
    updateGoButton();
  });

});


let previousVisibleCount = 0;
const ANIMATION_DURATION = 350;

function updateTravelTextUI() {
  directionsInstructions.style.display = "none";
  miniDirections.style.display = "block";
  const rows = Array.from(
    document.querySelectorAll('.travel-text-row')
  );

  const newCount = selectedOptions.length;

  // start bg animation immediately
  resizeTransportBg(newCount);

  // REMOVE rows immediately if count went down
  if (newCount < previousVisibleCount) {
    for (let i = previousVisibleCount - 1; i >= newCount; i--) {
      const rowIndex = rows.length - 1 - i;
      rows[rowIndex].classList.remove('active');
    }
  }

  // UPDATE text for all visible rows
  for (let i = 0; i < newCount; i++) {
    const rowIndex = rows.length - 1 - i;
    const text = rows[rowIndex].querySelector('tspan');
    text.textContent = selectedOptions[i].replace('-', ' ');
  }

  // ADD only the new rows (after bg starts growing)
  if (newCount > previousVisibleCount) {
    const startIndex = previousVisibleCount;

    setTimeout(() => {
      for (let i = startIndex; i < newCount; i++) {
        const rowIndex = rows.length - 1 - i;
        rows[rowIndex].classList.add('active');
      }
    }, ANIMATION_DURATION * 0.6);
  }

  previousVisibleCount = newCount;
}


const DIRECTIONS_BG_BASE_Y = 200.52;
const DIRECTIONS_BG_BASE_HEIGHT = 683.07;
const ROW_HEIGHT = 52;      // vertical spacing per row
// const MIN_HEIGHT = 120;    // when nothing is selected

const transportBg = document.getElementById('transport-bg');
const directionsTitle =
  document.querySelector('.directions-title');

const travelOptionsGroup =
  document.getElementById('travel-options');
const directionsBg =
  document.getElementById('directions-background');


function resizeTransportBg(count) {
  const baseY = 348.13;
  const originalHeight = 312.31;

  let height;
  let newY;

  if (count === 0) {
    // fully collapsed
    height = 0;
    newY = baseY + originalHeight;
  } else {
    height = count * ROW_HEIGHT;
    newY = baseY + (originalHeight - height);
  }

  transportBg.setAttribute('height', height);
  transportBg.setAttribute('y', newY);

  const deltaY = newY - baseY;

  // resize + move directions background
  directionsBg.setAttribute(
    'y',
    DIRECTIONS_BG_BASE_Y + deltaY
  );

  directionsBg.setAttribute(
    'height',
    DIRECTIONS_BG_BASE_HEIGHT - deltaY
  );

  // move title
  directionsTitle.setAttribute(
    'transform',
    `translate(42.67 ${257.08 + deltaY})`
  );

  // move travel options bar
  travelOptionsGroup.setAttribute(
    'transform',
    `translate(0 ${deltaY})`
  );
}

function updateGoButton() {
  const goText = goButton.querySelector('.go-button');

  if (selectedOptions.length > 0) {
    goText.classList.remove('transparent');
    goButton.style.pointerEvents = 'auto';
    goButton.style.cursor = 'pointer';
  } else {
    goText.classList.add('transparent');
    goButton.style.pointerEvents = 'none';
    goButton.style.cursor = 'default';
  }
}



// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
//notification scene
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

function playTap() {
  tapSound.currentTime = 0;
  tapSound.play().catch(() => { });
}

document.getElementById("yes-button").addEventListener("click", playTap);
document.getElementById("no-button").addEventListener("click", playTap);



// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
//Reminders App
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

const selectedStores = [];

const items = document.querySelectorAll('.shopping-list-item');

items.forEach(item => {
  item.addEventListener('click', () => {
    const store = item.dataset.store;

    if (selectedStores.includes(store)) {

      const index = selectedStores.indexOf(store);
      selectedStores.splice(index, 1);


      item.classList.remove('transparent');
    } else {

      selectedStores.push(store);


      item.classList.add('transparent');
      popSound.currentTime = 0;
      popSound.play();
    }
    changeDoneButton();
    // console.log(selectedStores);
  });
});

const shoppingDoneButton = document.getElementById('shopping-done-button');
const doneText = document.getElementById('done-text');
const plusIcon = document.getElementById('plus-icon');
const rect = document.getElementById('done-rect');

const EXPANDED = {
  width: 116.46,
  x: 277.25
};

const COLLAPSED = {
  width: 49.26,
  x: 344.45
};

function changeDoneButton() {
  if (selectedStores.length > 0) {


    rect.setAttribute('width', EXPANDED.width);
    rect.setAttribute('x', EXPANDED.x);

    plusIcon.style.display = 'none';
    doneText.style.display = 'block';


    shoppingDoneButton.classList.remove('unclickable');

  } else {


    rect.setAttribute('width', COLLAPSED.width);
    rect.setAttribute('x', COLLAPSED.x);

    plusIcon.style.display = 'block';
    doneText.style.display = 'none';


    shoppingDoneButton.classList.add('unclickable');
  }
}

shoppingDoneButton.addEventListener("click", () => {
  markSceneComplete('phoneScene', 'remindersApp')
  items.forEach(item => {
    const statKey = item.dataset.store;
    const isSelected = selectedStores.includes(statKey);

    updateStatBlock(statKey, isSelected);
  });

  reminders.style.display = "none";
  homeScreen.style.display = "block";
});

// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
// COMPUTER SCENE
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

var docsSceneComplete = false;
var chatbotSceneComplete = false;

function enableComputerShortcutSounds() {

  document.querySelectorAll('.computer-shortcut').forEach(el => {
    el.addEventListener('click', () => {
      clickSound.currentTime = 0;
      clickSound.play();
    });
  });
}

const docsShortcut = document.getElementById("docs-shortcut");
const chatbotShortcut = document.getElementById("chatbot-shortcut");
const emailShortcut = document.getElementById("email-shortcut");
const emailNotification = document.getElementById("email-notification");

docsShortcut.addEventListener("click", () => {
  document.getElementById("google-docs-scene").scrollIntoView();
});

chatbotShortcut.addEventListener("click", () => {
  document.getElementById("chatbot-scene").scrollIntoView();
});

emailShortcut.addEventListener("click", () => {
  document.getElementById("email-scene").scrollIntoView();
  deliverFirstEmail();
});

document.querySelectorAll(".go-to-computer").forEach(button => {
  button.addEventListener("click", () => {
    const computerScene = document.getElementById("computer-scene");
    if (computerScene) {

      computerScene.scrollIntoView();
    }
  });
});

// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
// GOOGLE DOCS SCENE
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️


// ======== DOCUMENT TYPING LOGIC ========
const docContainer = document.querySelector("#doc");
const lines = Array.from(
  docContainer.querySelectorAll("p:not(#education-risk):not(#job-risk), select, input, button#docs-next")
);
const nextButton = document.getElementById("docs-next");
let currentLine = 0;

docContainer.scrollTop = 0;

function scrollToLine(line) {
  const containerHeight = docContainer.clientHeight;
  const contentHeight = docContainer.scrollHeight;

  if (contentHeight > containerHeight) {
    docContainer.style.overflowY = "auto";
    const lineTop = line.offsetTop;
    if (lineTop > docContainer.scrollTop + containerHeight - line.offsetHeight) {
      docContainer.scrollTo({
        top: lineTop - containerHeight + line.offsetHeight + 10,
        behavior: "smooth"
      });
    }
  } else {
    docContainer.style.overflowY = "hidden";
  }
}

function typeLine(line, index = 0) {
  if (!line) return;

  if (line.tagName === "INPUT" || line.tagName === "SELECT") {
    line.style.opacity = 1;
    const event = line.tagName === "INPUT" ? "input" : "change";
    line.addEventListener(event, () => {
      line.classList.add("selected");
      typingSound.currentTime = 0;
      typingSound.play();

      // Skip auto-typing next line for year select
      if (line.id !== "education-years") {
        currentLine++;
        if (currentLine < lines.length) typeLine(lines[currentLine]);
      }
      scrollToLine(line);
    }, { once: true });
    scrollToLine(line);
    return;
  }

  if (line.tagName === "BUTTON") {
    line.style.opacity = 0;
    line.style.pointerEvents = "none";
    const text = line.textContent;
    line.textContent = "";

    function typeChar() {
      if (index < text.length) {
        line.textContent += text[index];
        index++;
        setTimeout(typeChar, 20);
        scrollToLine(line);
      } else {
        line.style.opacity = 1;
        line.style.pointerEvents = "auto";
        currentLine++;
        if (currentLine < lines.length) {
          setTimeout(() => typeLine(lines[currentLine]), 150);
        }
      }
    }
    typeChar();
    return;
  }

  // Text paragraph
  const text = line.textContent;
  line.textContent = "";
  line.style.opacity = 1;

  function typeChar() {
    if (index < text.length) {
      line.textContent += text[index];
      index++;
      setTimeout(typeChar, 15);
      scrollToLine(line);
    } else {
      currentLine++;
      if (currentLine < lines.length) {
        setTimeout(() => typeLine(lines[currentLine]), 150);
      }
    }
  }

  typeChar();
}

lines.forEach(l => l.style.opacity = 0);

if (lines.length > 0) typeLine(lines[currentLine]);

// ======== STAR POP SouND ========
const docsStar = $("#docs-star");
let popped = false;

docsStar.on("click", function() {
  $(this).toggleClass("light-blue yellow");
  if (!popped) {
    popSound.currentTime = 0;
    popSound.play();
    popped = true;
  } else {
    popped = false;
  }
});

// ======== YEAR SELECT & EDU RISK ========
const yearSelect = document.getElementById("education-years");
const startYear = 1940;
const endYear = 5 + new Date().getFullYear(); // current year + 5

for (let y = startYear; y <= endYear; y++) {
  const option = document.createElement("option");
  option.value = y;
  option.textContent = y;
  if (y === endYear) option.selected = true;
  yearSelect.appendChild(option);
}

const eduSelect = document.getElementById("education");
const eduRisk = document.getElementById("education-risk");

yearSelect.addEventListener("change", () => {
  const selectedEduValue = eduSelect.value || "other";
  const riskId = educationRiskMap[selectedEduValue] || 3;
  const template = educationRiskTemplates[riskId];
  const roleName = eduSelect.options[eduSelect.selectedIndex].text || "Other";


  typeRiskText(eduRisk, template, roleName);


  const nextIndex = lines.findIndex(l => l.tagName === "BUTTON" && l.id === "docs-next");
  if (nextIndex >= 0) {
    currentLine = nextIndex;
    typeLine(lines[currentLine]);
  }
});

// ======== JOB-RISK ========
const jobSelect = document.getElementById("job");
const jobRisk = document.getElementById("job-risk");

jobSelect.addEventListener("change", (e) => {
  const selected = e.target.value;
  const riskId = jobRiskMap[selected] || 4;
  const template = jobRiskTemplates[riskId];
  const roleName = jobSelect.options[jobSelect.selectedIndex].text;
  typeRiskText(jobRisk, template, roleName);
});

// ======== TYPING FUNCTION ========
function typeRiskText(element, template, roleName) {
  element.innerHTML = "";
  const html = template.replace("{role}", roleName);
  element.style.opacity = 1;
  element.style.display = "block";

  if (element._typingTimer) clearTimeout(element._typingTimer);
  if (element._cancelRef) element._cancelRef.value = true;

  const temp = document.createElement("div");
  temp.innerHTML = html;
  const nodes = Array.from(temp.childNodes);

  let nodeIndex = 0;
  let charIndex = 0;
  const cancelled = { value: false };
  element._cancelRef = cancelled;

  function typeChar() {
    if (cancelled.value) return;

    if (nodeIndex >= nodes.length) {
      element._typingTimer = null;
      return;
    }

    const currentNode = nodes[nodeIndex];

    if (currentNode.nodeType === Node.TEXT_NODE) {
      const text = currentNode.textContent;
      if (charIndex === 0) {
        element._currentTextNode = document.createTextNode("");
        element.appendChild(element._currentTextNode);
      }
      if (charIndex < text.length) {
        element._currentTextNode.textContent += text.charAt(charIndex);
        charIndex++;
        element._typingTimer = setTimeout(typeChar, 15);
      } else {
        nodeIndex++;
        charIndex = 0;
        typeChar();
      }
    } else {
      const clone = currentNode.cloneNode(false);
      element.appendChild(clone);
      const innerText = currentNode.textContent || "";
      if (innerText.length > 0) {
        clone.textContent = "";
        let innerIdx = 0;
        function typeInner() {
          if (cancelled.value) return;
          if (innerIdx < innerText.length) {
            clone.textContent += innerText.charAt(innerIdx);
            innerIdx++;
            element._typingTimer = setTimeout(typeInner, 15);
          } else {
            nodeIndex++;
            charIndex = 0;
            typeChar();
          }
        }
        typeInner();
      } else {
        nodeIndex++;
        typeChar();
      }
    }
  }

  typeChar();
}

const jobRiskTemplates = {
  1: "74% of employers currently use some kind of employee surveillance tools—known as bossware—to spy on their workers. (Source: <a href='https://www.expressvpn.com/blog/expressvpn-survey-surveillance-on-the-remote-workforce/?srsltid=AfmBOor3Xacmvu5S1ghQ2i3RC3eZ0vQBtkp1aolLw4Hs750eTsnoJVbd'>ExpressVPN</a>)",
  2: "Being a {role} puts you at greater risk of additional surveillance beyond your employer.",
  3: "48% of hiring managers use AI to screen your resume to decide if they should even view your application. (Source: <a href='https://www.cnn.com/2025/04/08/tech/ai-resume-job-hunters'>CNN</a>)"

};

const educationRiskTemplates = {
  1: `Nearly half of all K-12 students are subject to AI-facilitated surveillance tools in the classroom that track and analyze their every move online. (Source: <a href="https://knightcolumbia.org/blog/school-surveillance-systems-threaten-student-privacy-new-knight-institute-lawsuit-alleges" target="_blank">Knight Columbia</a>)`,
  2: "In recent years, several colleges and universities have started surveilling students with the same services government agencies use to surveil the general public. One AI company’s founder claims that hundreds of schools in a majority of US states have bought into such technologies. (Source: <a href='https://www.nytimes.com/2019/07/02/opinion/surveillance-state-schools.html'>NYT</a>)",
  3: "Many educational tech platforms and tools collect engagement data, behavioral logs, and personal information that can be accessed or shared with third parties. (Source: <a href='https://edtechrce.org/ai-in-education-data-privacy-concerns/'>ED Tech RCE</a>)"
};

const jobRiskMap = {
  "academic-research": 1,
  "activist": 1,
  "attorney": 1,
  "campaign-staff": 1,
  "civil-servant": 1,
  "community-organizer": 2,
  "corporate worker": 1,
  "content-creator": 2,
  "education": 2,
  "fast-food-worker": 1,
  "human-rights-advocate": 1,
  "investigative-researcher": 1,
  "journalist": 2,
  "labor-organizer": 1,
  "nonprofit-worker": 1,
  "physical laborer": 1,
  "policy-analyst": 1,
  "political-advocate": 1,
  "public-defender": 1,
  "social-worker": 1,
  "union-representative": 1,
  "unemployed": 3,
  "retired": 1,
  "other": 1
};

const educationRiskMap = {
  "high-school": 1,
  "some-college": 2,
  "associate-degree": 2,
  "bachelor-degree": 2,
  "master-degree": 2,
  "professional-degree": 2,
  "doctorate-degree": 2,
  "other": 3
};

// ======== NEXT BUTTON ========
nextButton.addEventListener("click", () => {
  markSceneComplete('computerScene', 'docsScene');

  const selectedJobValue = jobSelect.value;
  const selectedEduValue = eduSelect.value;
  const selectedYear = yearSelect.value ? Number(yearSelect.value) : null;

  updateStatBlock("occupation", selectedJobValue || null);
  updateStatBlock("education", selectedEduValue || null);
  updateStatBlock("graduationYear", selectedYear);

  const currentYear = new Date().getFullYear();
  const isStudent = selectedYear && selectedYear > currentYear - 10;
  updateStatBlock("studentStatus", isStudent);

  docsSceneComplete = true;
  sendEmail();
});


// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
// CHATBOT SCENE
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

const yesWords = ["yes", "yep", "yeah", "y", "sure", "ok", "okay", "sometimes", "occasionally", "maybe"];
const noWords = ["no", "nah", "nope", "n"];

const messagesContainer = document.querySelector("#chatbot-message-container");
const inputField = document.querySelector("#chatbot-input");
const sendButton = document.querySelector("#chatbot-send-button");
const closeButton = document.querySelector("#chatbot-close-button");

let stage = 0; // 0 = ask yes/no

function appendMessage(text, sender = "bot") {
  const p = document.createElement("p");
  p.className = sender === "bot" ? "chatbot-message" : "user-message";
  p.textContent = text;
  messagesContainer.appendChild(p);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


function handleInput(text) {
  appendMessage(text, "user");
  const lower = text.toLowerCase().trim();

  if (stage === 0) {
    if (yesWords.some(word => lower.includes(word))) {
      appendMessage("Every prompt you write is being used to train AI models.");
      updateStatBlock("chatbotUse", true);
      stage = 2;
      closeButton.classList.remove("hidden");
      inputField.classList.add("hidden");
      sendButton.classList.add("hidden");
    }
    else if (noWords.some(word => lower.includes(word))) {
      appendMessage("Good, because otherwise every prompt you write would be used to train AI models.");
      updateStatBlock("chatbotUse", false);
      stage = 2;
      closeButton.classList.remove("hidden");
      inputField.classList.add("hidden");
      sendButton.classList.add("hidden");
    } else {
      appendMessage("Please answer yes or no.");
    }
  }
}

sendButton.addEventListener("click", () => {
  const text = inputField.value.trim();
  if (!text) return;
  handleInput(text);
  inputField.value = "";
  chatbotSceneComplete = true;
  markSceneComplete('computerScene', 'chatbotScene')
});

inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendButton.click();
});

closeButton.addEventListener("click", () => {
  sendEmail()
})

appendMessage("Hi! Do you currently use any AI chatbots? This includes but isn't limited to chatbots like ChatGPT, Google Gemini, or Grok.");

function sendEmail() {
  if (chatbotSceneComplete && docsSceneComplete) {
    setTimeout(() => {
      notificationSound.play();
      emailShortcut.classList.remove("unclickable");
      emailShortcut.classList.add("clickable");
      emailShortcut.classList.remove("transparent");
      document.getElementById("letter-icon").classList.add("tip-element")
    }, 1000);
  }
}


// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
// EARTH SCENE
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️


// async function getLocation() {

//   try {
//     const res = await fetch("https://ipapi.co/json/");
//     const data = await res.json();

//     const locationInfo = {
//       latitude: data.latitude,
//       longitude: data.longitude,
//       city: data.city,
//       region: data.region,
//       country: data.country_name,
//       timezone: data.timezone,
//       ip: data.ip,
//       org: data.org  
//     };

//     console.log("Location info:", locationInfo);

//     // Adjust longitude for spinning logic
//     // let adjustedLongitude = data.longitude;
//     // if (adjustedLongitude < 0) adjustedLongitude = Math.abs(adjustedLongitude);
//     // else adjustedLongitude = adjustedLongitude + 180;

//     // const frames = 94;
//     // const degrees = 360;
//     // const degreesPerFrame = degrees / frames;
//     // const goalFrame = Math.floor(adjustedLongitude / degreesPerFrame);

//     // // Call the separate spin function
//     // spinToFrame(goalFrame);

//     return locationInfo;

//   } catch (err) {
//     console.error("Failed to fetch location info:", err);
//     return null;
//   }
// }


// getLocation();


// function displayScaryLocation(info) {
//   if (!info) return;

//   const detailsDiv = document.getElementById("location-details");

//   // VPN detection
//   const vpnIndicators = [
//     "digitalocean",
//     "aws",
//     "google cloud",
//     "vultr",
//     "linode",
//     "hetzner",
//     "ovh",
//     "azure"
//   ];
//   const org = info.org ? info.org.toLowerCase() : "";
//   const isVPN = vpnIndicators.some(keyword => org.includes(keyword));

//   // Timezone mismatch detection
//   const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//   const timezoneMismatch = info.timezone && userTimezone && info.timezone !== userTimezone;

//   // If either VPN or timezone mismatch, hide location info
//   if (isVPN || timezoneMismatch) {
//     detailsDiv.innerHTML = `
//       <strong>We respect your privacy.</strong><br>
//       Your location information is hidden because you are using a VPN or your local time doesn't match your IP.
//     `;
//     return;
//   }

//   // Normal user — show full info
//   detailsDiv.innerHTML = `
//     <strong>Your information is public.</strong><br>
//     ${info.city}, ${info.region}, ${info.country}<br>
//     IP: ${info.ip}<br>
//     Latitude: ${info.latitude}<br>
//     Longitude: ${info.longitude}<br>
//     <em>We see you...</em>
//   `;
// }



// async function initLocation() {
//   const info = await getLocation();   
//   displayScaryLocation(info);     
// }

// initLocation();

// const testLocationNormal = {
//   latitude: "37.77",
//   longitude: "-122.42",
//   city: "San Francisco",
//   region: "California",
//   country: "United States",
//   timezone: "America/Los_Angeles",
//   ip: "192.168.0.1",
//   org: "Comcast Cable Communications" // normal ISP
// };

// const testLocationVPN = {
//   latitude: "51.51",
//   longitude: "-0.13",
//   city: "London",
//   region: "England",
//   country: "United Kingdom",
//   timezone: "Europe/London",
//   ip: "185.220.101.1",
//   org: "DigitalOcean, LLC"  // cloud/datacenter provider
// };

// displayScaryLocation(testLocationNormal);

// function spinToFrame(frame) {
//   const frameWidth = 48;

//   const targetPosition = -frameWidth * (frame);


//   const oldStyle = document.getElementById("dynamic-spin-style");
//   if (oldStyle) oldStyle.remove();


//   const style = document.createElement("style");
//   style.id = "dynamic-spin-style";
//   style.textContent = `
//     @keyframes spinEarth {
//       0% { background-position-x:0px; }
//       100%   { background-position-x: ${targetPosition}px; }
//     }
//   `;
//   document.head.appendChild(style);


//   const earth = document.getElementById("earth");
//   earth.style.animation = `spinEarth 1s steps(${frame}) forwards`;

// }

// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
//EMAIL APP
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

const emailScene = document.getElementById("email-scene");
const firstEmail = document.querySelector('.email-row[data-email="0"]');
const otherEmails = document.querySelectorAll('.email-row[data-email]:not([data-email="0"])');
let firstEmailArrived = false;
let emailDelay = 1500;


firstEmail.style.opacity = 0;
firstEmail.style.transform = "translateY(-20px)";
firstEmail.style.transition = "opacity 0.5s ease, transform 0.5s ease";

const firstEmailBody = firstEmail.querySelector(".email-body");
firstEmailBody.style.height = "0";
firstEmailBody.style.overflow = "hidden";
firstEmailBody.style.transition = "height 0.4s ease";


otherEmails.forEach(email => {
  email.style.opacity = 0.3;
  email.style.fontFamily = "redacted";
});


const disabledFolders = document.querySelectorAll('#email-sidebar .folder:not(.active)');
disabledFolders.forEach(folder => {
  folder.style.pointerEvents = "none";
  folder.style.opacity = 0.5;
  folder.style.fontFamily = "redacted";
});

function getCurrentTimeString() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  return `${hours}:${minutes} ${ampm}`;
}

// deliver the email
function deliverFirstEmail() {
  if (!firstEmailArrived) {
    firstEmailArrived = true;
    setTimeout(() => {
      firstEmail.querySelector('.timestamp').textContent = getCurrentTimeString();

      firstEmail.style.opacity = 1;
      firstEmail.style.transform = "translateY(0)";
      notificationSound.currentTime = 0;
      notificationSound.play();
    }, emailDelay);
  }
}

// Accordion toggle for the first email
firstEmail.querySelector(".email-summary").addEventListener("click", () => {
  const body = firstEmail.querySelector(".email-body");
  if (body.style.height === "0px" || body.style.height === "0") {
    body.style.height = body.scrollHeight + "px";
  } else {
    body.style.height = "0";
  }
});

// Scroll detection to trigger email delivery
function handleScroll() {
  const rect = emailScene.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight && rect.bottom > 0) {
    deliverFirstEmail();
    window.removeEventListener("scroll", handleScroll);
  }
}

window.addEventListener("scroll", handleScroll);


document.addEventListener('DOMContentLoaded', () => {
  const yesButton = document.getElementById('spam-yes');
  const noButton = document.getElementById('spam-no');
  var spamResponse = null;

  yesButton.addEventListener('click', () => {
    clickSound.play();
    spamResponse = true;
  });

  noButton.addEventListener('click', () => {
    clickSound.play();
    spamResponse = false;
  });
});


const spamYes = document.getElementById("spam-yes");
const spamNo = document.getElementById("spam-no");

[spamYes, spamNo].forEach(button => {
  button.addEventListener("click", () => {
    markSceneComplete('computerScene', 'emailScene')


    const isScam = button === spamYes;
    updateStatBlock("scamEmails", isScam);


    const emailUi = document.getElementById("email-ui");
    crashSound.currentTime = 0;
    crashSound.play();


    const clippyLineOne = document.getElementById("clippy-line-1");
    const clippyLineTwo = document.getElementById("clippy-line-2");
    const clippyLineThree = document.getElementById("clippy-line-3");

    clippyLineOne.textContent = "Please don't click";
    clippyLineTwo.textContent = "random links in your";
    clippyLineThree.textContent = "emails.";

    setTimeout(() => { emailUi.classList.add("shake"); }, 1000);

    const computerPopup = document.getElementById("computer-popup");
    computerPopup.style.display = "block";

    setTimeout(() => {
      const computerScene = document.getElementById("computer-scene");
      if (computerScene) {
        computerScene.scrollIntoView();
        computerScroll();
        document.getElementById("google-docs-scene").style.display = "none";
        document.getElementById("chatbot-scene").style.display = "none";
        document.getElementById("email-scene").style.display = "none";
      }
    }, 2000);
  });
});

// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
// PAYMENT TERMINAL ANIMATION
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️

// const mobilePayButton = document.getElementById("mobile-pay-button");
const paymentMethods = document.querySelectorAll(".payment-method");
const terminalButton = document.querySelectorAll(".terminal-button");
const terminalDoneButton = document.getElementById("terminal-done-button");
const terminalEye = document.getElementById("terminal-eye");
const selectedMethods = [];
const doneRectangle = document.getElementById("done-button-rectangle");
const doneCircle = document.getElementById("done-button-circle");

terminalButton.forEach(button => {
  button.addEventListener("click", () => {
    buttonPressSound.currentTime = 0;
    buttonPressSound.play();
  })
})


const sounds = {
  "cash-button": cashRegisterSound,
  "card-button": removeCardSound,
  "mobile-pay-button": tapToPaySound
};

paymentMethods.forEach(method => {
  method.addEventListener("click", () => {
    const id = method.id;

    if (selectedMethods.includes(id)) {
      method.classList.remove("selected");

      const index = selectedMethods.indexOf(id);
      selectedMethods.splice(index, 1);
    }
    else {
      method.classList.add("selected");
      selectedMethods.push(id);
    }

    updateTerminalDoneButton();
  });
});


const priorityOrder = [
  "mobile-pay-button",
  "card-button",
  "cash-button"
];

terminalDoneButton.addEventListener("click", () => {


  const statMap = {
    "cash-button": "cash",
    "card-button": "card",
    "mobile-pay-button": "mobilePay"
  };


  Object.keys(statMap).forEach(buttonId => {
    const statKey = statMap[buttonId];
    const isSelected = selectedMethods.includes(buttonId);

    updateStatBlock(statKey, isSelected);
  });

  const selectedByPriority = priorityOrder.find(method =>
    selectedMethods.includes(method)
  );

  if (selectedByPriority && sounds[selectedByPriority]) {
    const sound = sounds[selectedByPriority];
    sound.currentTime = 0;
    sound.play();
  }

  if (
    selectedByPriority === "mobile-pay-button" ||
    selectedByPriority === "card-button"
  ) {
    const elements = terminalEye.querySelectorAll(".black");

    elements.forEach(el => {
      el.classList.remove("black");
      el.classList.add("white");
    });

    setTimeout(() => {
      elements.forEach(el => {
        el.classList.remove("white");
        el.classList.add("black");
      });
    }, 1000);
  }
});

function updateTerminalDoneButton() {
  if (selectedMethods.length === 0) {

    // OFF
    doneRectangle.classList.remove("pulsing-rect");
    doneCircle.classList.remove("pulsing-circle");


    terminalDoneButton.classList.remove("clickable");
    terminalDoneButton.classList.add("unclickable");

  } else {

    // ON
    doneRectangle.classList.add("pulsing-rect");
    doneCircle.classList.add("pulsing-circle");

    terminalDoneButton.classList.remove("unclickable");
    terminalDoneButton.classList.add("clickable");
  }
}



// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
// IPAD SCENE
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️


document.addEventListener('DOMContentLoaded', enableComputerShortcutSounds);


const parentGuardianSelect = document.getElementById("parent-guardian");
const insuranceSelect = document.getElementById("insurance-provider");
const insuranceSubmit = document.getElementById("insurance-submit");

const checkBothFields = () => {
  if (parentGuardianSelect.value && insuranceSelect.value) {
    insuranceSubmit.classList.remove("transparent", "unclickable");
  } else {
    insuranceSubmit.classList.add("transparent", "unclickable");
  }
};

parentGuardianSelect.addEventListener("change", checkBothFields);
insuranceSelect.addEventListener("change", checkBothFields);

insuranceSubmit.addEventListener("click", () => {
  updateStatBlock("isParentGuardian", parentGuardianSelect.value === "yes");
  updateStatBlock("insuranceProvider", insuranceSelect.value || null);
});



// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
// RESULTS SCENE
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️


const scene = document.getElementById('results-scene');
const backgroundElements = document.querySelectorAll('#envelope .background');

function isSceneVisible() {
  const rect = scene.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

function slideBackgroundDown() {
  backgroundElements.forEach(el => {
    el.style.transform = 'translateY(200%)';
  });
}


let triggered = false;
window.addEventListener('scroll', () => {
  if (!triggered && isSceneVisible()) {
    triggered = true;
    setTimeout(() => {
      slideBackgroundDown();
    }, 1000);
  }
});

const paperResults = document.getElementById("paper-results");

paperResults.addEventListener("click", () => {
  generatePdfFromCsv(userStats);
  generatePDFFromUserStats(userStats);
})


// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
// PDF GENERATOR
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️


const sectionTriggers = {
  "ALPR": ["car", "publicTransit", "rideshare", "plane", "walk", "bike", "groceryStores"],

  "Facial Recognition & Behavior Monitoring": [
    "groceryStores",
    "superStores",
    "socialApps",
    "surveillanceApps"
  ],

  "Online Media Surveillance & Sentiment Analysis": [
    "socialApps",
    "messagingApps"
  ],

  "Employee Surveillance – Bossware": [
    "occupation"

  ],

  "Student Surveillance": [
    "studentStatus",
    "graduationYear",
    "learningApps"
  ],

  "Predictive Policing": [
    "chatbotUse"
  ],

  "Stingray/CSS": [
    "chatbotUse"
  ],

  "OSINT & Pattern of Life Analysis": [
    "chatbotUse"
  ],

  "Surveillance Advertising & Real Time Bidding": [
    "onlineStores",
    "mobilePay",
    "card"
  ],

  "Predictive Analytics — Healthcare": [
    "healthApps",
    "insuranceProvider"
  ]
};

function generateReasoning(sectionName, userStats) {
  const triggers = sectionTriggers[sectionName];
  if (!triggers) return "";

  const transportation = new Set();
  const shopping = new Set();
  const apps = new Set();
  const studentInfo = new Set();
  const finance = new Set();
  const health = new Set();
  const work = new Set();
  const other = new Set();


  const readableNames = {
    car: "driving",
    publicTransit: "public transit",
    rideshare: "rideshare services",
    plane: "flying",
    walk: "walking",
    bike: "biking",
    socialApps: "social apps",
    messagingApps: "messaging apps",
    datingApps: "dating apps",
    shoppingApps: "shopping apps",
    musicApps: "music apps",
    gamesApps: "games apps",
    locationApps: "location apps",
    religionApps: "religion apps",
    chatbotUse: "chatbot use",
    surveillanceApps: "surveillance apps",
    groceryStores: "grocery stores",
    superStores: "superstores",
    clothingStores: "clothing stores",
    pharmacies: "pharmacies",
    luxuryStores: "luxury stores",
    homeImprovementStores: "home improvement stores",
    onlineStores: "online stores",
    cash: "cash",
    card: "card",
    mobilePay: "mobile pay",
    healthApps: "health apps"
  };

  const jobTitles = {
    "academic-research": "an Academic Researcher",
    "activist": "an Activist",
    "attorney": "an Attorney",
    "campaign-staff": "a Campaign Staff Member",
    "civil-servant": "a Civil Servant",
    "community-organizer": "a Community Organizer",
    "content-creator": "a Content Creator",
    "corporate-worker": "a Corporate Worker",
    "education": "an Educator",
    "fast-food-worker": "a Fast Food Worker",
    "healthcare-professional": "a Healthcare Professional",
    "human-rights-advocate": "a Human Rights Advocate",
    "investigative-researcher": "an Investigative Researcher",
    "journalist": "a Journalist",
    "labor-organizer": "a Labor Organizer",
    "nonprofit-worker": "a Nonprofit Worker",
    "physical-laborer": "a Physical Laborer",
    "policy-analyst": "a Policy Analyst",
    "political-advocate": "a Political Advocate",
    "public-defender": "a Public Defender",
    "social-worker": "a Social Worker",
    "union-representative": "a Union Representative",
    "unemployed": "Unemployed",
    "retired": "Retired",
    "other": "Other"
  };

  triggers.forEach(key => {
    const val = userStats[key];
    if (!val) return;
    const name = readableNames[key] || key; // fallback if missing


    switch (key) {
      case "car":
      case "publicTransit":
      case "rideshare":
      case "plane":
      case "walk":
      case "bike":
        transportation.add(name);
        break;

      case "socialApps":
      case "messagingApps":
      case "datingApps":
      case "shoppingApps":
      case "musicApps":
      case "gamesApps":
      case "locationApps":
      case "religionApps":
      case "chatbotUse":
      case "surveillanceApps":
      case "healthApps":
        apps.add(name);
        break;

      case "groceryStores":
      case "superStores":
      case "clothingStores":
      case "pharmacies":
      case "luxuryStores":
      case "homeImprovementStores":
      case "onlineStores":
        shopping.add(name);
        break;

      case "educationLevel":
        const currentYear = new Date().getFullYear();
        const gradYear = parseInt(userStats.graduationYear);

        if (val === "high-school") {
          studentInfo.add("your status as a high school student");
        }

        else if (val === "some-college") {
          studentInfo.add("your status as a college student");
        }

        else if (
          [
            "associate-degree",
            "bachelor-degree",
            "master-degree",
            "professional-degree",
            "doctorate-degree"
          ].includes(val)
        ) {
          if (!isNaN(gradYear) && currentYear - gradYear <= 5) {
            studentInfo.add("your status as a recent graduate");
          }
        }

        break;

      case "insuranceProvider":
        if (val === "none") break;
        const specificInsurance = {
          "united-healthcare": "UnitedHealthcare",
          "kaiser-permanente": "Kaiser Permanente",
          "humana": "Humana"
        };
        if (specificInsurance[val]) {
          health.add(`your insurance is ${specificInsurance[val]}`);
        } else {
          health.add("the fact that you have health insurance");
        }
        break;

      case "cash":
      case "card":
      case "mobilePay":
        finance.add(name);
        break;

      case "occupation":
        if (
          val &&
          val !== "retired" &&
          val !== "unemployed" &&
          val !== "other"
        ) {
          work.add(jobTitles[val] || val);
        }
        break;

      default:
        other.add(name);
    }
  });

  function joinWithAnd(arr) {
    if (arr.length === 0) return "";
    if (arr.length === 1) return arr[0];
    return arr.slice(0, -1).join(", ") + " and " + arr[arr.length - 1];
  }

  const phrases = [];
  if (transportation.size) phrases.push(`your modes of transportation: ${joinWithAnd(Array.from(transportation))}`);
  if (shopping.size) phrases.push(`your visits to ${joinWithAnd(Array.from(shopping))}`);
  if (apps.size) phrases.push(`your use of ${joinWithAnd(Array.from(apps))}`);
  if (studentInfo.size)
    phrases.push(Array.from(studentInfo).join(", "));
  if (finance.size) phrases.push(`your payment methods:  ${joinWithAnd(Array.from(finance))}`);
  if (health.size)
    phrases.push(Array.from(health).join(", "));
  if (work.size) phrases.push(`your occupation as ${Array.from(work).join(", ")}`);
  if (other.size) phrases.push(Array.from(other).join(", "));

  if (!phrases.length) return "";
  return `Based on ${phrases.join(", ")}, you may be exposed to ${sectionName} systems.`;
}


const { PDFDocument, StandardFonts, rgb } = PDFLib;

async function generatePdfFromCsv(userStats, csvPath = 'assets/data.csv') {

  try {
    const response = await fetch(csvPath);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const csv = await response.text();

    const result = Papa.parse(csv, { header: true, skipEmptyLines: true });
    const allData = result.data;

    const dictionary = {};


    allData.forEach((item, index) => {
      const companies = item.company ? item.company.split(",") : [];
      const dataCollected = item.dataCollected ? item.dataCollected.split(",") : [];
      const thirdParty = item.thirdPartySourcesOfExposure ? item.thirdPartySourcesOfExposure.split(",") : [];



      const fields = [
        { label: "Introduction", value: item.introduction }, { label: "ICE Usage", value: item.iceUsage },
        { label: "Interventions", value: item.interventionsParagraph },
        { label: "Further Reading", value: item.resourceLinks },
        { label: "Sources", value: item.sourceLinks },
      ].filter(f => f.value);

      dictionary[`section${index + 1}`] = {
        title: (item.section || `Section ${index + 1}`).replace(/[“”]/g, '"').replace(/[‘’]/g, "'"),
        columns: {
          labels: ["Data Buyers", "Data Collected", "Data Collectors"],
          values: [companies, dataCollected, thirdParty]
        },
        fields: fields.map(f => ({
          label: f.label.replace(/[“”]/g, '"').replace(/[‘’]/g, "'"),
          value: f.value.replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/–/g, "-").replace(/—/g, "-")
        })),
        reasoning: generateReasoning(item.section, userStats)
      };
    });


    const { sectionsForPDF, vagueSectionsForPDF, surveillersForPDF, isHealthcareProfessional, isParentNotStudent, chatbotServices } = await generatePDFFromUserStats(userStats);

    const surveillerGlossary = await loadSurveillerGlossary();

    //adding the logo
    const logoBytes = await loadLogo("assets/eye.png");

    //assigning the header and naming the file
    let url = await createPdf(dictionary, {
      title: "EYES ON AI",
      subtitle: includeReasoningInPdf ? "Your Personalized Results" : "Unabridged Version",
      logoImageBytes: logoBytes,
      filename: "eyes_on_ai_results.pdf",
      sectionsForPDF: sectionsForPDF,
      vagueSectionsForPDF: vagueSectionsForPDF,
      surveillersForPDF: surveillersForPDF,
      isHealthcareProfessional: isHealthcareProfessional,
      isParentNotStudent: isParentNotStudent,
      surveillerGlossary: surveillerGlossary,
      chatbotServices: chatbotServices
    });



    console.log("PDF generation complete!");

    return url
  } catch (error) {
    console.error("Error generating PDF from CSV:", error);
  }
};

// This makes the data appendable for the font and format
const cleanText = (text) => {
  if (!text) return "";
  return text
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/–/g, "-")
    .replace(/—/g, "-")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n");
};

const drawWrappedText = (page, font, text, x, cursorY, maxWidth, fontSize, onPageBreak) => {
  if (!text) return { cursorY, page };
  let currentPage = page;
  const lineSpacing = fontSize + 9;
  const paragraphSpacing = fontSize + 12;
  const paragraphs = text.split("\n");
  for (let pIdx = 0; pIdx < paragraphs.length; pIdx++) {
    const p = paragraphs[pIdx];
    const words = p.split(" ");
    let line = "";
    for (let word of words) {
      const testLine = line + word + " ";
      if (font.widthOfTextAtSize(testLine, fontSize) > maxWidth) {
        if (onPageBreak && cursorY < 60) {
          const result = onPageBreak();
          currentPage = result.page;
          cursorY = result.cursorY;
        }
        currentPage.drawText(line.trim(), { x, y: cursorY, size: fontSize, font });
        line = word + " ";
        cursorY -= lineSpacing;
      } else line = testLine;
    }
    if (line) {
      if (onPageBreak && cursorY < 60) {
        const result = onPageBreak();
        currentPage = result.page;
        cursorY = result.cursorY;
      }
      currentPage.drawText(line.trim(), { x, y: cursorY, size: fontSize, font });
      cursorY -= lineSpacing;
    }
    if (pIdx < paragraphs.length - 1) {
      cursorY -= paragraphSpacing;
    }
  }
  return { cursorY, page: currentPage };
};


// This creates the PDF
async function createPdf(dictionary, options = {}) {
  const pdfDoc = await PDFDocument.create();
  const normalFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const italicFont = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const surveilLinkPositions = [];
  const glossaryPositions = {};

  const margin = 50;
  const headerHeight = 60;

  // =========================
  // ===== INTRO PAGE ========
  // =========================

  let embeddedLogo = null;
  if (options.logoImageBytes) {
    embeddedLogo = await pdfDoc.embedPng(options.logoImageBytes);
  }

  const introPage = pdfDoc.addPage();
  const { width, height } = introPage.getSize();
  let introY = height - margin;

  // --- HEADER ---
  if (embeddedLogo) {
    const logoDims = embeddedLogo.scale(0.1);
    introPage.drawImage(embeddedLogo, {
      x: margin,
      y: introY - logoDims.height,
      width: logoDims.width,
      height: logoDims.height,
    });
  }

  const title = options.title || "PDF Title";
  const subtitle = options.subtitle || "PDF Subtitle";

  const titleFontSize = 20;
  const subtitleFontSize = 12;

  const titleWidth = boldFont.widthOfTextAtSize(title, titleFontSize);
  const subtitleWidth = normalFont.widthOfTextAtSize(subtitle, subtitleFontSize);

  introPage.drawText(title, {
    x: width - margin - titleWidth,
    y: introY - titleFontSize,
    size: titleFontSize,
    font: boldFont,
  });

  introPage.drawText(subtitle, {
    x: width - margin - subtitleWidth,
    y: introY - titleFontSize - subtitleFontSize - 5,
    size: subtitleFontSize,
    font: normalFont,
    color: rgb(0.4, 0.4, 0.4),
  });

  introY -= headerHeight + 60; // pushes content LOWER on page

  // =====================
  // WHAT IS EYES ON AI
  // =====================

  introPage.drawText("What is Eyes on AI?", {
    x: margin,
    y: introY,
    size: 22,
    font: boldFont,
  });

  introY -= 30;

  const introText =
    options.introText ||
    "Eyes on AI is a transparency initiative created by Gen-Z for Change that helps users understand how artificial intelligence systems collect, use, and share their data. Each section outlines who collects data, what data is gathered, and who ultimately uses that information.";

  introY = drawWrappedText(
    introPage,
    normalFont,
    introText,
    margin,
    introY,
    width - margin * 2,
    12
  ).cursorY;

  // =====================
  // TABLE OF CONTENTS (BOTTOM ANCHORED)
  // =====================

  const sections = Object.values(dictionary);
  const tocFontSize = 12;
  const bottomMargin = 60;

  const hasGlossary = options.surveillerGlossary && Object.keys(options.surveillerGlossary).length > 0;
  const tocEntryCount = sections.length + (hasGlossary ? 1 : 0);
  let tocY =
    bottomMargin +
    tocEntryCount * (tocFontSize + 6) +
    30; // space for label

  const tocSpacing = 20; // space between line and label

  // Draw divider line ABOVE TOC
  introPage.drawLine({
    start: { x: margin, y: tocY + tocSpacing },
    end: { x: width - margin, y: tocY + tocSpacing },
    thickness: 1,
    color: rgb(0.7, 0.7, 0.7),
  });

  // TOC Label
  introPage.drawText("Table of Contents", {
    x: margin,
    y: tocY,
    size: 16,
    font: boldFont,
  });

  tocY -= 20;

  // TOC Entries
  sections.forEach((section, index) => {
    introPage.drawText(`${index + 1}. ${section.title}`, {
      x: margin + 10,
      y: tocY,
      size: tocFontSize,
      font: normalFont,
    });
    tocY -= tocFontSize + 6;
  });
  if (hasGlossary) {
    introPage.drawText(`${sections.length + 1}. Glossary`, {
      x: margin + 10,
      y: tocY,
      size: tocFontSize,
      font: normalFont,
    });
    tocY -= tocFontSize + 6;
  }
  // =========================
  // ===== SECTION PAGES =====
  // =========================

  for (const key in dictionary) {
    const section = dictionary[key];
    let page = pdfDoc.addPage();
    let { width, height } = page.getSize();
    let cursorY = height - margin;
    const bottomLimit = 60;

    const drawPageHeader = (pg) => {
      let y = height - margin;
      if (embeddedLogo) {
        const logoDims = embeddedLogo.scale(0.1);
        pg.drawImage(embeddedLogo, {
          x: margin,
          y: y - logoDims.height,
          width: logoDims.width,
          height: logoDims.height,
        });
      }
      const t = options.title || "PDF Title";
      const st = options.subtitle || "PDF Subtitle";
      const tfs = 20;
      const sfs = 12;
      const tw = boldFont.widthOfTextAtSize(t, tfs);
      const sw = normalFont.widthOfTextAtSize(st, sfs);
      pg.drawText(t, { x: width - margin - tw, y: y - tfs, size: tfs, font: boldFont });
      pg.drawText(st, { x: width - margin - sw, y: y - tfs - sfs - 5, size: sfs, font: normalFont, color: rgb(0.4, 0.4, 0.4) });
      return y - headerHeight - 20;
    };

    const addContinuationPage = () => {
      page = pdfDoc.addPage();
      cursorY = drawPageHeader(page);
      return { page, cursorY };
    };

    const checkPageBreak = (needed = 20) => {
      if (cursorY - needed < bottomLimit) {
        addContinuationPage();
      }
    };

    if (embeddedLogo) {
      const logoDims = embeddedLogo.scale(0.1);
      page.drawImage(embeddedLogo, {
        x: margin,
        y: cursorY - logoDims.height,
        width: logoDims.width,
        height: logoDims.height,
      });
    }

    const title = options.title || "PDF Title";
    const subtitle = options.subtitle || "PDF Subtitle";

    const titleFontSize = 20;
    const subtitleFontSize = 12;

    const titleWidth = boldFont.widthOfTextAtSize(title, titleFontSize);
    const subtitleWidth = normalFont.widthOfTextAtSize(subtitle, subtitleFontSize);

    page.drawText(title, {
      x: width - margin - titleWidth,
      y: cursorY - titleFontSize,
      size: titleFontSize,
      font: boldFont,
    });

    page.drawText(subtitle, {
      x: width - margin - subtitleWidth,
      y: cursorY - titleFontSize - subtitleFontSize - 5,
      size: subtitleFontSize,
      font: normalFont,
      color: rgb(0.4, 0.4, 0.4),
    });

    cursorY -= headerHeight + 20;

    // --- SECTION TITLE ---
    const subheaderFontSize = 16;
    const isHealthSection = section.title === "Predictive Analytics — Healthcare" && options.isHealthcareProfessional;
    const isParentStudentSection = section.title === "Student Surveillance" && options.isParentNotStudent;
    const displayTitle = (isHealthSection || isParentStudentSection) ? section.title + " *" : section.title;
    page.drawText(displayTitle, {
      x: margin,
      y: cursorY,
      size: subheaderFontSize,
      font: boldFont,
    });

    cursorY -= subheaderFontSize + 20;

    // --- INTRODUCTION ---
    const introField = section.fields.find(f => f.label === "Introduction");
    if (introField) {
      const result = drawWrappedText(
        page,
        normalFont,
        introField.value,
        margin,
        cursorY,
        width - margin * 2,
        11,
        addContinuationPage
      );
      cursorY = result.cursorY;
      page = result.page;
    }

    const iceUsage = section.fields.find(f => f.label === "ICE Usage");
    if (iceUsage) {
      checkPageBreak(30);
      const result = drawWrappedText(
        page,
        boldFont,
        "This data is used by ICE to surveil, identify, and target immigrant communities.",
        margin,
        cursorY,
        width - margin * 2,
        11,
        addContinuationPage
      );
      cursorY = result.cursorY;
      page = result.page;
    }

    checkPageBreak(10);
    page.drawLine({
      start: { x: margin, y: cursorY },
      end: { x: width - margin, y: cursorY },
      thickness: 1,
      color: rgb(0.7, 0.7, 0.7),
    });

    cursorY -= 30;

    if (includeReasoningInPdf) {
      if (section.reasoning || isHealthSection || isParentStudentSection) {
        checkPageBreak(60);
        page.drawText("Relevancy", {
          x: margin,
          y: cursorY,
          size: 14,
          font: boldFont
        });

        cursorY -= 20;

        if (section.reasoning) {
          const result = drawWrappedText(
            page,
            normalFont,
            section.reasoning,
            margin,
            cursorY,
            width - margin * 2,
            11,
            addContinuationPage
          );
          cursorY = result.cursorY;
          page = result.page;
        }

        if (isHealthSection) {
          const healthcareNote = "As a healthcare professional, we recommend you also consider the risks that AI surveillance systems pose to your patients.";
          const result2 = drawWrappedText(
            page,
            normalFont,
            healthcareNote,
            margin,
            cursorY,
            width - margin * 2,
            11,
            addContinuationPage
          );
          cursorY = result2.cursorY;
          page = result2.page;

          const asteriskNote = "* No information has been redacted from this section, so you can understand how AI surveillance may affect your patients regardless of their personal circumstances.";
          const result3 = drawWrappedText(
            page,
            italicFont,
            asteriskNote,
            margin,
            cursorY,
            width - margin * 2,
            11,
            addContinuationPage
          );
          cursorY = result3.cursorY;
          page = result3.page;
        }

        if (isParentStudentSection) {
          const parentNote = "Although you are not currently a student, as a parent or guardian, this information may be relevant to understanding how AI surveillance systems could affect your children.";
          const result4 = drawWrappedText(
            page,
            normalFont,
            parentNote,
            margin,
            cursorY,
            width - margin * 2,
            11,
            addContinuationPage
          );
          cursorY = result4.cursorY;
          page = result4.page;

          const parentAsteriskNote = "* No information has been redacted from this section, so you can understand the full scope of student surveillance regardless of your own enrollment status.";
          const result5 = drawWrappedText(
            page,
            italicFont,
            parentAsteriskNote,
            margin,
            cursorY,
            width - margin * 2,
            11,
            addContinuationPage
          );
          cursorY = result5.cursorY;
          page = result5.page;
        }

        cursorY -= 10;
      }
    }


    if (options.sectionsForPDF) {
      const matchingData = options.sectionsForPDF[section.title];
      if (matchingData && matchingData.length > 0) {
        checkPageBreak(60);
        page.drawText("Data Collected From Your Services:", {
          x: margin,
          y: cursorY,
          size: 14,
          font: boldFont,
        });
        cursorY -= 20;

        matchingData.forEach(item => {
          checkPageBreak(50);
          page.drawText(`${item.service}`, {
            x: margin + 10,
            y: cursorY,
            size: 11,
            font: boldFont,
          });
          cursorY -= 18;

          const result = drawWrappedText(
            page,
            normalFont,
            item.dataCollected,
            margin + 20,
            cursorY,
            width - margin * 2 - 20,
            11,
            addContinuationPage
          );
          cursorY = result.cursorY;
          page = result.page;
          cursorY -= 5;
        });

        cursorY -= 10;
      }
    }

    if (options.vagueSectionsForPDF) {
      const vagueData = options.vagueSectionsForPDF[section.title];
      if (vagueData && vagueData.length > 0) {
        checkPageBreak(55);
        page.drawText("Limited Transparency:", { x: margin, y: cursorY, size: 12, font: boldFont, color: rgb(0, 0, 0) });
        cursorY -= 20;
        vagueData.forEach(item => {
          checkPageBreak(40);
          const surveillerNames = item.surveillers.join(", ");
          const vagueText = `${surveillerNames} are collecting data from ${item.service}, but the specific vendors are not public information. Be aware that this data could be used in ways that affect your privacy and safety.`;
          const result = drawWrappedText(
            page,
            normalFont,
            vagueText,
            margin,
            cursorY,
            width - margin * 2,
            11,
            addContinuationPage
          );
          cursorY = result.cursorY;
          page = result.page;
          cursorY -= 5;
        });
        cursorY -= 10;
      }
    }

    if (options.chatbotServices && options.chatbotServices.length > 0 && section.title === "Online Media Surveillance & Sentiment Analysis") {
      checkPageBreak(60);
      page.drawText("Data Training:", { x: margin, y: cursorY, size: 12, font: boldFont });
      cursorY -= 20;
      const chatbotNames = options.chatbotServices.join(", ");
      const chatbotText = `Chatbots like ${chatbotNames} use your conversations, prompts, and inputs to train and improve their AI models. Your data may be retained, reviewed, and used to refine future responses — meaning your private queries could influence how these systems behave for others.`;
      const chatbotResult = drawWrappedText(page, normalFont, chatbotText, margin, cursorY, width - margin * 2, 11, addContinuationPage);
      cursorY = chatbotResult.cursorY;
      page = chatbotResult.page;
      cursorY -= 15;
    }

    if (options.surveillersForPDF) {
      const surveillerList = options.surveillersForPDF[section.title];
      if (surveillerList && surveillerList.length > 0) {
        checkPageBreak(55);
        page.drawText("Surveillers:", { x: margin, y: cursorY, size: 12, font: boldFont, color: rgb(0, 0, 0) });
        cursorY -= 20;
        const survFontSize = 11;
        const hasGlossary = options.surveillerGlossary || {};
        const maxLineWidth = width - margin * 2 - 10;
        let lineX = margin + 10;
        const sep = "   ";
        const sepWidth = normalFont.widthOfTextAtSize(sep, survFontSize);

        surveillerList.forEach((name, idx) => {
          const inGlossary = !!hasGlossary[name];
          const textColor = inGlossary ? rgb(0, 0.2, 0.8) : rgb(0, 0, 0);
          const nameWidth = normalFont.widthOfTextAtSize(name, survFontSize);
          const totalWidth = nameWidth + (idx < surveillerList.length - 1 ? sepWidth : 0);

          if (lineX + nameWidth > margin + 10 + maxLineWidth && lineX > margin + 10) {
            cursorY -= survFontSize + 8;
            lineX = margin + 10;
            checkPageBreak(20);
          }

          page.drawText(name, {
            x: lineX,
            y: cursorY,
            size: survFontSize,
            font: normalFont,
            color: textColor,
          });
          if (inGlossary) {
            page.drawLine({
              start: { x: lineX, y: cursorY - 2 },
              end: { x: lineX + nameWidth, y: cursorY - 2 },
              thickness: 0.5,
              color: rgb(0, 0.2, 0.8),
            });
            surveilLinkPositions.push({
              name: name,
              page: page,
              x: lineX,
              y: cursorY - 2,
              width: nameWidth,
              height: survFontSize + 4,
            });
          }
          lineX += nameWidth + sepWidth;
        });
        cursorY -= survFontSize + 14;
      }
    }

    // --- OTHER FIELDS ---
    section.fields.filter(f => !["Introduction", "ICE Usage", "Sources", "Source Links"].includes(f.label)).forEach(f => {
      checkPageBreak(55);
      page.drawText(f.label + ":", { x: margin, y: cursorY, size: 12, font: boldFont, color: rgb(0, 0, 0) });
      cursorY -= 20;

      if (f.label === "Further Reading") {
        const regex = /(\S+)\s*\(([^)]+)\)/g;
        let match;
        const linkFontSize = 11;
        const maxLinkWidth = width - margin * 2 - 10;
        while ((match = regex.exec(f.value)) !== null) {
          checkPageBreak(20);
          const url = match[1];
          const displayText = match[2];

          const textWidth = normalFont.widthOfTextAtSize(displayText, linkFontSize);
          if (textWidth > maxLinkWidth) {
            const words = displayText.split(" ");
            let line = "";
            let firstLine = true;
            for (const word of words) {
              const testLine = line + word + " ";
              if (normalFont.widthOfTextAtSize(testLine, linkFontSize) > maxLinkWidth && line) {
                checkPageBreak(16);
                const lineWidth = normalFont.widthOfTextAtSize(line.trim(), linkFontSize);
                if (firstLine) {
                  page.drawText(line.trim(), { x: margin + 10, y: cursorY, size: linkFontSize, font: normalFont, color: rgb(0, 0.2, 0.8), link: url });
                  page.drawLine({ start: { x: margin + 10, y: cursorY - 2 }, end: { x: margin + 10 + lineWidth, y: cursorY - 2 }, thickness: 0.5, color: rgb(0, 0.2, 0.8) });
                  firstLine = false;
                } else {
                  page.drawText(line.trim(), { x: margin + 10, y: cursorY, size: linkFontSize, font: normalFont, color: rgb(0, 0.2, 0.8) });
                  page.drawLine({ start: { x: margin + 10, y: cursorY - 2 }, end: { x: margin + 10 + lineWidth, y: cursorY - 2 }, thickness: 0.5, color: rgb(0, 0.2, 0.8) });
                }
                cursorY -= linkFontSize + 3;
                line = word + " ";
              } else {
                line = testLine;
              }
            }
            if (line.trim()) {
              checkPageBreak(16);
              const lineWidth = normalFont.widthOfTextAtSize(line.trim(), linkFontSize);
              if (firstLine) {
                page.drawText(line.trim(), { x: margin + 10, y: cursorY, size: linkFontSize, font: normalFont, color: rgb(0, 0.2, 0.8), link: url });
              } else {
                page.drawText(line.trim(), { x: margin + 10, y: cursorY, size: linkFontSize, font: normalFont, color: rgb(0, 0.2, 0.8) });
              }
              page.drawLine({ start: { x: margin + 10, y: cursorY - 2 }, end: { x: margin + 10 + lineWidth, y: cursorY - 2 }, thickness: 0.5, color: rgb(0, 0.2, 0.8) });
              cursorY -= linkFontSize + 5;
            }
          } else {
            page.drawText(displayText, { x: margin + 10, y: cursorY, size: linkFontSize, font: normalFont, color: rgb(0, 0.2, 0.8), link: url });
            page.drawLine({ start: { x: margin + 10, y: cursorY - 2 }, end: { x: margin + 10 + textWidth, y: cursorY - 2 }, thickness: 0.5, color: rgb(0, 0.2, 0.8) });
            cursorY -= linkFontSize + 5;
          }
        }

        const resourcesLineSpacing = 20;
        cursorY -= resourcesLineSpacing;
        checkPageBreak(10);
        page.drawLine({
          start: { x: margin, y: cursorY },
          end: { x: width - margin, y: cursorY },
          thickness: 1,
          color: rgb(0.7, 0.7, 0.7)
        });
        cursorY -= resourcesLineSpacing;
      } else {
        const result = drawWrappedText(page, normalFont, f.value, margin + 10, cursorY, width - margin * 2 - 10, 11, addContinuationPage);
        cursorY = result.cursorY;
        page = result.page;
      }
    });


    // --- SOURCE LINKS AT THE BOTTOM ---
    const sourceField = section.fields.find(f => f.label === "Source Links");
    if (sourceField) {
      const links = sourceField.value.split(",").map(l => l.trim());
      const linkFontSize = 11;
      const spaceNeeded = (links.length + 1) * (linkFontSize + 5) + 20;
      checkPageBreak(spaceNeeded);

      page.drawText("Source Links:", { x: margin, y: cursorY, size: 12, font: boldFont, color: rgb(0, 0, 0) });
      cursorY -= 20;

      links.forEach(link => {
        checkPageBreak(20);
        page.drawText(link, {
          x: margin + 10,
          y: cursorY,
          size: linkFontSize,
          font: normalFont,
          color: rgb(0, 0.2, 0.8),
          link: link
        });

        const textWidth = normalFont.widthOfTextAtSize(link, linkFontSize);
        page.drawLine({
          start: { x: margin + 10, y: cursorY - 2 },
          end: { x: margin + 10 + textWidth, y: cursorY - 2 },
          thickness: 0.5,
          color: rgb(0, 0.2, 0.8)
        });

        cursorY -= linkFontSize + 5;
      });
    }
  }

  if (options.surveillerGlossary && options.surveillersForPDF) {
    const allSurveillers = new Set();
    Object.values(options.surveillersForPDF).forEach(list => {
      if (Array.isArray(list)) {
        list.forEach(name => allSurveillers.add(name));
      }
    });

    const glossaryEntries = Array.from(allSurveillers)
      .filter(name => options.surveillerGlossary[name] && options.surveillerGlossary[name].description)
      .sort((a, b) => a.localeCompare(b));

    if (glossaryEntries.length > 0) {
      let glossaryPage = pdfDoc.addPage([width, height]);
      let glossaryCursorY = height - margin;

      if (embeddedLogo) {
        const logoDims = embeddedLogo.scale(0.1);
        glossaryPage.drawImage(embeddedLogo, {
          x: margin,
          y: glossaryCursorY - logoDims.height,
          width: logoDims.width,
          height: logoDims.height,
        });
      }

      const glossaryHeaderHeight = 60;
      glossaryCursorY -= glossaryHeaderHeight + 20;

      glossaryPage.drawText("Glossary", {
        x: margin,
        y: glossaryCursorY,
        size: 20,
        font: boldFont,
      });
      glossaryCursorY -= 30;

      const glossaryAddPage = () => {
        glossaryPage = pdfDoc.addPage([width, height]);
        glossaryCursorY = height - margin;
        if (embeddedLogo) {
          const logoDims = embeddedLogo.scale(0.1);
          glossaryPage.drawImage(embeddedLogo, {
            x: margin,
            y: glossaryCursorY - logoDims.height,
            width: logoDims.width,
            height: logoDims.height,
          });
        }
        glossaryCursorY -= 80;
        return { page: glossaryPage, cursorY: glossaryCursorY };
      };

      const glossaryCheckPageBreak = (needed) => {
        if (glossaryCursorY - needed < 60) {
          const result = glossaryAddPage();
          glossaryPage = result.page;
          glossaryCursorY = result.cursorY;
        }
      };

      for (const name of glossaryEntries) {
        const entry = options.surveillerGlossary[name];
        const fullDesc = cleanText(entry.description);
        const firstParagraph = fullDesc.split("\n").filter(p => p.trim().length > 0)[0] || fullDesc;
        const description = firstParagraph.length > 400 ? firstParagraph.substring(0, 397) + "..." : firstParagraph;
        glossaryCheckPageBreak(70);

        glossaryPositions[name] = { page: glossaryPage, y: glossaryCursorY };

        glossaryPage.drawText(name, {
          x: margin,
          y: glossaryCursorY,
          size: 12,
          font: boldFont,
        });
        glossaryCursorY -= 18;

        const result = drawWrappedText(
          glossaryPage,
          normalFont,
          description,
          margin + 10,
          glossaryCursorY,
          width - margin * 2 - 10,
          10,
          glossaryAddPage
        );
        glossaryCursorY = result.cursorY;
        glossaryPage = result.page;

        if (entry.url) {
          glossaryCheckPageBreak(20);
          const linkText = "Source and more information";
          const linkFontSize = 10;
          const linkWidth = normalFont.widthOfTextAtSize(linkText, linkFontSize);
          glossaryPage.drawText(linkText, {
            x: margin + 10,
            y: glossaryCursorY,
            size: linkFontSize,
            font: normalFont,
            color: rgb(0, 0.2, 0.8),
            link: entry.url,
          });
          glossaryPage.drawLine({
            start: { x: margin + 10, y: glossaryCursorY - 2 },
            end: { x: margin + 10 + linkWidth, y: glossaryCursorY - 2 },
            thickness: 0.5,
            color: rgb(0, 0.2, 0.8),
          });
          glossaryCursorY -= linkFontSize + 6;
        }

        glossaryCursorY -= 10;
      }
    }
  }

  surveilLinkPositions.forEach(link => {
    const dest = glossaryPositions[link.name];
    if (!dest) return;

    const annotDict = pdfDoc.context.obj({
      Type: 'Annot',
      Subtype: 'Link',
      Rect: [link.x, link.y, link.x + link.width, link.y + link.height],
      Border: [0, 0, 0],
      Dest: [dest.page.ref, 'XYZ', null, dest.y + 20, null],
    });

    const annotRef = pdfDoc.context.register(annotDict);
    const existingAnnots = link.page.node.get(PDFLib.PDFName.of('Annots'));
    if (existingAnnots) {
      existingAnnots.push(annotRef);
    } else {
      link.page.node.set(
        PDFLib.PDFName.of('Annots'),
        pdfDoc.context.obj([annotRef])
      );
    }
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);



  const a = document.createElement("a");
  a.href = url;
  a.download = options.filename || "eyes_on_ai_results.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);

}

async function loadLogo(url) {
  return await fetch(url).then(res => res.arrayBuffer());
}

async function generatePDFFromUserStats(userStats, csvPath = "assets/sources.csv") {
  // Load surveillance data from CSV
  const surveillance = await loadSurveillanceSources(csvPath);
  console.log("Surveillance data loaded:", surveillance);

  const sectionsForPDF = {};
  const vagueSectionsForPDF = {};
  const surveillersForPDF = {};
  const chatbotServices = [];

  Object.keys(sectionTriggers).forEach(sectionName => {
    sectionsForPDF[sectionName] = [];
    vagueSectionsForPDF[sectionName] = [];
    surveillersForPDF[sectionName] = new Set();
  });

  function ensureSection(name) {
    if (!sectionsForPDF[name]) sectionsForPDF[name] = [];
    if (!vagueSectionsForPDF[name]) vagueSectionsForPDF[name] = [];
    if (!surveillersForPDF[name]) surveillersForPDF[name] = new Set();
  }

  function addEntryToSection(entry, sectionName) {
    ensureSection(sectionName);
    if (entry.applicableSurveillers) {
      entry.applicableSurveillers.forEach(s => {
        if (s.trim()) surveillersForPDF[sectionName].add(s.trim());
      });
    }
    if (entry.vague === "checked") {
      if (!vagueSectionsForPDF[sectionName].some(e => e.service === entry.service)) {
        vagueSectionsForPDF[sectionName].push({
          service: entry.service,
          surveillers: entry.applicableSurveillers
        });
      }
    } else {
      if (!sectionsForPDF[sectionName].some(e => e.service === entry.service)) {
        sectionsForPDF[sectionName].push({
          service: entry.service,
          dataCollected: entry.dataCollected.join(", ")
        });
      }
    }
  }

  const conditionalCSVKeys = {
    "transitCar": { check: () => userStats.car },
    "transitFlights": { check: () => userStats.plane },
    "insuranceUnited": { check: () => userStats.insuranceProvider === "united-healthcare" },
    "insuranceKaiser": { check: () => userStats.insuranceProvider === "kaiser-permanente" },
    "insuranceHumana": { check: () => userStats.insuranceProvider === "humana" },
    "occupationPress": { check: () => userStats.occupation === "journalist" }
  };

  Object.entries(sectionTriggers).forEach(([sectionName, triggers]) => {
    triggers.forEach(triggerKey => {
      if (!userStats[triggerKey]) return;
      if (triggerKey === "chatbotUse") {
        const entries = surveillance[triggerKey];
        if (entries) {
          entries.forEach(entry => {
            if (!chatbotServices.includes(entry.service)) chatbotServices.push(entry.service);
          });
        }
        return;
      }
      const entries = surveillance[triggerKey];
      if (!entries) return;
      entries.forEach(entry => {
        const targetSection = entry.page || sectionName;
        addEntryToSection(entry, targetSection);
      });
    });
  });

  Object.entries(conditionalCSVKeys).forEach(([csvKey, config]) => {
    if (!config.check()) return;
    const entries = surveillance[csvKey];
    if (!entries) return;
    entries.forEach(entry => {
      const targetSection = entry.page;
      if (!targetSection) return;
      addEntryToSection(entry, targetSection);
    });
  });

  const isHealthcareProfessional = userStats.occupation === "healthcare-professional";
  if (isHealthcareProfessional) {
    const healthKeys = ["healthApps", "insuranceUnited", "insuranceKaiser", "insuranceHumana"];
    healthKeys.forEach(csvKey => {
      const entries = surveillance[csvKey];
      if (!entries) return;
      entries.forEach(entry => {
        const targetSection = entry.page;
        if (!targetSection) return;
        addEntryToSection(entry, targetSection);
      });
    });
  }

  const isParentNotStudent = userStats.isParentGuardian && !userStats.studentStatus;
  if (isParentNotStudent) {
    const studentKeys = ["studentStatus"];
    studentKeys.forEach(csvKey => {
      const entries = surveillance[csvKey];
      if (!entries) return;
      entries.forEach(entry => {
        const targetSection = entry.page;
        if (!targetSection) return;
        addEntryToSection(entry, targetSection);
      });
    });
  }

  const universalEntries = surveillance["universal"] || [];
  universalEntries.forEach(entry => {
    const targetSection = entry.page;
    if (!targetSection) return;
    addEntryToSection(entry, targetSection);
  });

  Object.keys(sectionsForPDF).forEach(key => {
    sectionsForPDF[key].sort((a, b) => {
      const aCount = a.dataCollected ? a.dataCollected.split(",").length : 0;
      const bCount = b.dataCollected ? b.dataCollected.split(",").length : 0;
      return bCount - aCount;
    });
  });
  Object.keys(vagueSectionsForPDF).forEach(key => {
    vagueSectionsForPDF[key].sort((a, b) => a.service.localeCompare(b.service));
  });

  const surveillersForPDFSorted = {};
  Object.keys(surveillersForPDF).forEach(key => {
    surveillersForPDFSorted[key] = [...surveillersForPDF[key]].sort((a, b) => a.localeCompare(b));
  });

  console.log("Sections ready for PDF:", sectionsForPDF);
  console.log("Vague sections for PDF:", vagueSectionsForPDF);
  console.log("Surveillers for PDF:", surveillersForPDFSorted);
  return { sectionsForPDF, vagueSectionsForPDF, surveillersForPDF: surveillersForPDFSorted, isHealthcareProfessional, isParentNotStudent, chatbotServices };
}



// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
//SURVEILLANCE DICTIONARY
// ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️



async function loadSurveillanceSources(csvPath = "assets/sources.csv") {
  const surveillance = {};
  try {
    const response = await fetch(csvPath);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const csv = await response.text();
    const result = Papa.parse(csv, { header: true, skipEmptyLines: true });
    const allData = result.data;


    allData.forEach(item => {
      const questionKey = item.question || "unknown";

      const entry = {
        service: item.Service,
        vague: item.vague || "",
        page: item.page || "",
        dataCollected: item["Data Collected"]
          ? item["Data Collected"].split(",").map(c => c.trim())
          : [],
        applicableSurveillers: item["Applicable Surveillers"]
          ? item["Applicable Surveillers"].split(",").map(c => c.trim())
          : [],
        surveillerCount: parseInt(item["Surveiller Count"], 10) || 0
      };

      if (!surveillance[questionKey]) surveillance[questionKey] = [];
      surveillance[questionKey].push(entry);
    });

    return surveillance;
  } catch (error) {
    console.error("Error loading surveillance sources CSV:", error);
    return {};
  }
}

async function loadSurveillerGlossary(csvPath = "assets/surveillers.csv") {
  const glossary = {};
  try {
    const response = await fetch(csvPath);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const csv = await response.text();
    const result = Papa.parse(csv, { header: true, skipEmptyLines: true });
    result.data.forEach(item => {
      const name = (item.Name || "").trim();
      const description = (item["Given Description"] || "").trim();
      const url = (item.URL || "").trim();
      if (name && description) {
        glossary[name] = { description, url };
      }
    });
    return glossary;
  } catch (error) {
    console.error("Error loading surveillers glossary CSV:", error);
    return {};
  }
}


const pdf_embed = document.querySelector(".pdf-embed")
if (pdf_embed) {
  pdf_embed.addEventListener("click", (e) => {
    const pdf_embed2 = document.createElement("iframe")
    pdf_embed2.src = temp.substring(5)
    pdf_embed.appendChild(pdf_embed2)
  })
}
