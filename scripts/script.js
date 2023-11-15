const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const changeBgColor = (color) => {
  var style = document.styleSheets[0].cssRules;

  // Find the rule with the desired selector
  for (var i = 0; i < style.length; i++) {
    console.log(style[i]);
    if (
      style[i].selectorText === ".section-1-images .img-container.img-1::before"
    ) {
      style[i].style.backgroundColor = color;
      break;
    }
  }
};
const changeText = async (typedText) => {
  const currentText = Object.keys(texts)[currentIndex].toUpperCase();
  if (isDeleting) {
    typedText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;

      currentIndex++;
      if (currentIndex === Object.keys(texts).length) {
        currentIndex = 0;
      }
    }
  } else {
    typedText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentText.length) {
      await delay(1000);
      isDeleting = true;
    }
  }
};

// to delete and add text and change color in section 1
setInterval(() => {
  const typedText = document.getElementById("typedText");

  const currentColor = texts[Object.keys(texts)[currentIndex]];
  changeBgColor(currentColor);
  changeText(typedText);
}, 100);
