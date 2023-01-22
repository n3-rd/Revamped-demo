import './style.scss'
import luge from '@waaark/luge'
import Lenis from '@studio-freight/lenis'

const smoothScroll = () => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical', // vertical, horizontal
    gestureDirection: 'vertical', // vertical, horizontal, both
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  })


  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
}


const imageFilterMove = () => {
  function adjustImage(e) {
    var img = document.getElementById("main-image");
    var width = img.offsetWidth;
    var x = e.clientX - img.offsetLeft;
    var value = x / width;
    img.style.filter = "grayscale(" + value + ")";
    img.style.filter = "sepia(" + (1 - value) + ")";
  }
  document.addEventListener("mousemove", adjustImage);

  var textContainer = document.querySelector('.main-text');

  textContainer.addEventListener("mousemove", function (e) {
    var width = textContainer.offsetWidth;
    var height = textContainer.offsetHeight;
    var x = e.clientX - textContainer.offsetLeft;
    var y = e.clientY - textContainer.offsetTop;
    var valueX = x / width;
    var valueY = y / height;
    textContainer.style.setProperty("--skewX", valueX * 10 - 5 + "deg");
    textContainer.style.setProperty("--skewY", valueY * 10 - 5 + "deg");
  });
}

const changeColorOnScroll = () => {
  var myElement = document.querySelector(".main-text");
  var scroll = window.scrollY;
  if (scroll < 100) {
    myElement.style.color = "#fff";
  } else {
    var color = "rgb(" + scroll + ", " + (255 - scroll) + ", " + scroll + ")";
    myElement.style.color = color;
  }
}

const changeToBlack = () => {
  // Select the section that you want to observe
  const section = document.querySelector('.dark-section');

  // Create an IntersectionObserver instance
  const observer = new IntersectionObserver(entries => {
    // Check if the section is intersecting the viewport
    if (entries[0].isIntersecting) {
      console.log('intersecting');
      // If it is, change the background color to black
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
    } else {
      // If it is not, change the background color back to the original color
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      console.log('not intersecting');
    }
  });

  // Start observing the section
  observer.observe(section);

}
window.addEventListener("scroll", changeColorOnScroll);

smoothScroll()
imageFilterMove()
changeToBlack()

