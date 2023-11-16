const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const changeBgColor = (color) => {
  var style = document.styleSheets[0].cssRules;

  // Find the rule with the desired selector
  for (var i = 0; i < style.length; i++) {
    if (
      style[i].selectorText === ".sec-1-images .img-container.img-1::before"
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

// Tabs section
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");
  const shortName = document.querySelectorAll(".short-name");
  const programsWrapper = document.getElementById("sec-4");
  function showTab(tabId) {
    tabContents.forEach((content) => {
      content.classList.remove("active");
      programsWrapper.style.backgroundColor = programs[tabId];
      shortName.forEach((element) => {
        element.style.color = programs[tabId];
      });
      if (tabId === "FCS") {
        content.style.borderRadius = "0 10px 10px 10px";
      } else {
        content.style.borderRadius = "10px";
      }
      content.classList.add("fade-out");
    });

    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    const activeContent = document.getElementById(tabId);
    setTimeout(() => {
      activeContent.classList.remove("fade-out");
    }, 5);
    activeContent.classList.add("active");

    document.querySelector(`[data-tab="${tabId}"]`).classList.add("active");
  }

  document.querySelector(".tabs").addEventListener("click", function (event) {
    if (event.target.classList.contains("tab")) {
      const tabId = event.target.getAttribute("data-tab");
      showTab(tabId);
    }
  });

  // Show the default tab on page load
  showTab("FCS");
});
