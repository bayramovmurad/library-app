// // ==============SLIDER===============

let next1 = document.getElementById('next1');

next1.addEventListener("click", function () {
    const widthItem = document.querySelector('.item').offsetWidth;
    document.getElementById('formList').scrollLeft += widthItem;
})


let prev1 = document.getElementById('prev1');

prev1.addEventListener("click", function () {
    const widthItem = document.querySelector('.item').offsetWidth;
    document.getElementById('formList').scrollLeft -= widthItem;
})


setInterval(() => {
    next1.click()
}, 3000);

// ==============SLIDER===============




let prev_search = document.getElementById("prev-search");
let next_search = document.getElementById("next-search");


prev_search.addEventListener("click", function () {
    const widthItem = document.querySelector('.item-search').offsetWidth;
    document.getElementById('formList-search').scrollLeft -= widthItem;
})

next_search.addEventListener("click", function () {
    const widthItem = document.querySelector('.item-search').offsetWidth;
    document.getElementById('formList-search').scrollLeft += widthItem;
})


setInterval(() => {
    next_search.click()
}, 3000);






