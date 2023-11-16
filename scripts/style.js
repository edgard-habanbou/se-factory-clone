function handleMediaChange(mq) {
  const icons = document.querySelectorAll("i");
  const easteregg = document.getElementById("easterEgg");

  if (mq.matches) {
    icons.forEach((icon) => {
      icon.classList.remove("fa-2x");
    });
    if (mq.media == "(max-width: 550px)") {
      easteregg.classList.remove("hidden");
    }
  } else {
    icons.forEach((icon) => {
      icon.classList.add("fa-2x");
    });
    if (mq.media == "(max-width: 550px)") {
      easteregg.classList.add("hidden");
    }
  }
}

// Create media queries
const mediaQuery550 = window.matchMedia("(max-width: 550px)");
const mediaQuery991 = window.matchMedia("(max-width: 991px)");

// Initial calls to set the initial state
handleMediaChange(mediaQuery550);
handleMediaChange(mediaQuery991);

// Add event listeners to handle changes
mediaQuery550.addListener(() => handleMediaChange(mediaQuery550));
mediaQuery991.addListener(() => handleMediaChange(mediaQuery991));
