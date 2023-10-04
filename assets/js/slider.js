// ==============SLIDER===============

document.getElementById('next').onclick = function() {
    const widthItem = document.querySelector('.item').offsetWidth;
    document.getElementById('formList').scrollLeft += widthItem;
}
document.getElementById('prev').onclick = function() {
    const widthItem = document.querySelector('.item').offsetWidth;
    document.getElementById('formList').scrollLeft -= widthItem;

}


document.getElementById('next2').onclick = function() {
    const widthItem = document.querySelector('.item').offsetWidth;
    document.getElementById('formList2').scrollLeft += widthItem;
}
document.getElementById('prev2').onclick = function() {
    const widthItem = document.querySelector('.item').offsetWidth;
    document.getElementById('formList2').scrollLeft -= widthItem;

}


document.getElementById('next3').onclick = function() {
    const widthItem = document.querySelector('.item').offsetWidth;
    document.getElementById('formList3').scrollLeft += widthItem;
}
document.getElementById('prev3').onclick = function() {
    const widthItem = document.querySelector('.item').offsetWidth;
    document.getElementById('formList3').scrollLeft -= widthItem;

}


// ==============AUTO SLIDER===============

let autoSlideInterval1;
let autoSlideInterval2;
let autoSlideInterval3;

// Slider 1
function nextSlide1() {
  const widthItem = document.querySelector(".slider1 .item").offsetWidth;
  const formList = document.getElementById("formList");
  const maxScrollLeft = formList.scrollWidth - formList.clientWidth;
  
  if (formList.scrollLeft + widthItem >= maxScrollLeft) {
    formList.scrollLeft = 0;
  } else {
    formList.scrollLeft += widthItem;
  }
}

function startAutoSlide1() {
  autoSlideInterval1 = setInterval(nextSlide1, 1000);
}

function stopAutoSlide1() {
  clearInterval(autoSlideInterval1);
}

const slider1 = document.querySelector(".slider1");
slider1.addEventListener("mouseenter", stopAutoSlide1);
slider1.addEventListener("mouseleave", startAutoSlide1);

// Slider 2
function nextSlide2() {
  const widthItem = document.querySelector(".slider2 .item").offsetWidth;
  const formList2 = document.getElementById("formList2");
  const maxScrollLeft = formList2.scrollWidth - formList2.clientWidth;
  
  if (formList2.scrollLeft + widthItem >= maxScrollLeft) {
    formList2.scrollLeft = 0;
  } else {
    formList2.scrollLeft += widthItem;
  }
}

function startAutoSlide2() {
  autoSlideInterval2 = setInterval(nextSlide2, 1000);
}

function stopAutoSlide2() {
  clearInterval(autoSlideInterval2);
}

const slider2 = document.querySelector(".slider2");
slider2.addEventListener("mouseenter", stopAutoSlide2);
slider2.addEventListener("mouseleave", startAutoSlide2);

// Slider 3
function nextSlide3() {
  const widthItem = document.querySelector(".slider3 .item").offsetWidth;
  const formList3 = document.getElementById("formList3");
  const maxScrollLeft = formList3.scrollWidth - formList3.clientWidth;
  
  if (formList3.scrollLeft + widthItem >= maxScrollLeft) {
    formList3.scrollLeft = 0;
  } else {
    formList3.scrollLeft += widthItem;
  }
}

function startAutoSlide3() {
  autoSlideInterval3 = setInterval(nextSlide3, 1000);
}

function stopAutoSlide3() {
  clearInterval(autoSlideInterval3);
}

const slider3 = document.querySelector(".slider3");
slider3.addEventListener("mouseenter", stopAutoSlide3);
slider3.addEventListener("mouseleave", startAutoSlide3);

startAutoSlide1();
startAutoSlide2();
startAutoSlide3();
