window.addEventListener("load", () => {
    setTimeout(() => {
      const mainText = document.querySelector(".main-text");
      mainText.classList.add("animated"); // trigger the animation after 2 second
    }, 2000);
  });

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-type');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewriter > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};
