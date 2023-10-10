let listIcon = document.getElementById("list_icon")
let hambList = document.getElementById("hamb_list")
let timesIcon = document.getElementById("times_icon")
listIcon.addEventListener('click', function () {
    hambList.classList.add("show")
})

timesIcon.addEventListener('click', function () {
    hambList.classList.remove("show")
})

let ul_list = document.querySelector(".ul_list")
console.log(ul_list);

