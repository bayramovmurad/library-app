// ==============SLIDER===============

// document.getElementById('next').onclick = function() {
//     const widthItem = document.querySelector('.item').offsetWidth;
//     document.getElementById('formList').scrollLeft += widthItem;
// }
// document.getElementById('prev').onclick = function() {
//     const widthItem = document.querySelector('.item').offsetWidth;
//     document.getElementById('formList').scrollLeft -= widthItem;

// }


// document.getElementById('next2').onclick = function() {
//     const widthItem = document.querySelector('.item').offsetWidth;
//     document.getElementById('formList2').scrollLeft += widthItem;
// }
// document.getElementById('prev2').onclick = function() {
//     const widthItem = document.querySelector('.item').offsetWidth;
//     document.getElementById('formList2').scrollLeft -= widthItem;

// }


// document.getElementById('next3').onclick = function() {
//     const widthItem = document.querySelector('.item').offsetWidth;
//     document.getElementById('formList3').scrollLeft += widthItem;
// }
// document.getElementById('prev3').onclick = function() {
//     const widthItem = document.querySelector('.item').offsetWidth;
//     document.getElementById('formList3').scrollLeft -= widthItem;

// }

function setupSlider(sliderId, prevBtnId, nextBtnId, formListId) {
  const slider = document.getElementById(sliderId);
  const formList = document.getElementById(formListId);
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);
  const widthItem = slider.querySelector(".item").offsetWidth;
  let autoSlideInterval;

  function nextSlide() {
    const maxScrollLeft = formList.scrollWidth - formList.clientWidth;
    if (formList.scrollLeft + widthItem >= maxScrollLeft) {
      formList.scrollLeft = 0;
    } else {
      formList.scrollLeft += widthItem;
    }
  }

  function prevSlide() {
    if (formList.scrollLeft <= 0) {
      formList.scrollLeft = formList.scrollWidth - formList.clientWidth;
    } else {
      formList.scrollLeft -= widthItem;
    }
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 1000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);
  slider.addEventListener("mouseenter", stopAutoSlide);
  slider.addEventListener("mouseleave", startAutoSlide);

  startAutoSlide();
}

// Call the setupSlider function for each slider
setupSlider("slider1", "prev1", "next1", "formList");
setupSlider("slider2", "prev2", "next2", "formList2");
setupSlider("slider3", "prev3", "next3", "formList3");
