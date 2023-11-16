const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const changeBgColor = (color) => {
  var style = document.styleSheets[0].cssRules;

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
const generateTestimonial = (
  fname,
  lname,
  testimony,
  image,
  quote,
  company
) => {
  return `
  <div class="testimonial fade">
            <div class="testimony">
              <div class="comma">
                <img src="./assets/svgs/testimonies.svg" alt="testimonies" />
              </div>
              <div class="testimony-text">
                <p>
                  ${testimony}
                </p>
              </div>

              <div class="testmonial-person">
                <img
                  src="${image}"
                  alt="${fname} ${lname}"
                />
                <div class="person-info">
                  <h4><span class="fsw-color">${fname}</span> ${lname}</h4>
                  <p>> ${quote}<span class="fsw-color">${company}</span></p>
                </div>
              </div>
            </div>

            <div class="person-image">
              <img src="${image}" alt="rayan" />
            </div>
          </div>
  `;
};
let slideIndex = 0;
const showSlides = () => {
  let i;
  let slides = document.getElementsByClassName("testimonial");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" dot-active", "");
  }
  slides[slideIndex - 1].style.display = "flex";
  dots[slideIndex - 1].className += " dot-active";
  setTimeout(showSlides, 5000); // Change image every 2 seconds
};
const showTab = (tabId) => {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");
  const shortName = document.querySelectorAll(".short-name");
  const programsWrapper = document.getElementById("sec-4");
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
};
// to delete and add text and change color in section 1
setInterval(() => {
  const typedText = document.getElementById("typedText");

  const currentColor = texts[Object.keys(texts)[currentIndex]];
  changeBgColor(currentColor);
  changeText(typedText);
}, 100);

document.addEventListener("DOMContentLoaded", function () {
  // Tabs section

  document.querySelector(".tabs").addEventListener("click", function (event) {
    if (event.target.classList.contains("tab")) {
      const tabId = event.target.getAttribute("data-tab");
      showTab(tabId);
    }
  });

  // Show the default tab on page load
  showTab("FCS");

  // Testimonials section
  const testimonialsWrapper = document.getElementById("testimonies-container");
  testimonials.forEach((testimonial) => {
    testimonialsWrapper.innerHTML += generateTestimonial(
      testimonial.fname,
      testimonial.lname,
      testimonial.testimony,
      testimonial.image,
      testimonial.quote,
      testimonial.company
    );
  });
  showSlides();
});

// FAQ section
document.querySelectorAll(".question-heading").forEach(function (question) {
  question.addEventListener("click", function () {
    // Toggle the display of the answer when the question is clicked
    var answer = this.nextElementSibling;
    answer.style.display = answer.style.display === "none" ? "block" : "none";
  });
});
