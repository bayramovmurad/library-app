let join_btn = document.querySelector(".join_us");
let modal_body = document.querySelector("#modal_body");


join_btn.addEventListener("click", function (e) {
    e.stopPropagation();
    modal_body.classList.toggle("show");
});

modal_body.addEventListener("click", function (e) {
    e.stopPropagation();
});

document.addEventListener("click", function () {
    modal_body.classList.remove("show");
});
3