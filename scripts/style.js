// function to make the icons smaller when on a small device
function handleMediaChange(mq) {
  const icons = document.querySelectorAll("i");

  if (mq.matches) {
    icons.forEach((icon) => {
      icon.classList.remove("fa-2x");
    });
  } else {
    icons.forEach((icon) => {
      icon.classList.add("fa-2x");
    });
  }
}
const mediaQuery = window.matchMedia("(max-width: 991px)");
mediaQuery.addListener(handleMediaChange);
handleMediaChange(mediaQuery);
