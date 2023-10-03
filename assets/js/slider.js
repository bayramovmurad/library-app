// ==============SLIDER===============

document.getElementById('next').onclick = function() {
    const widthItem = document.querySelector('.item').offsetWidth;
    document.getElementById('formList').scrollLeft += widthItem;
}
document.getElementById('prev').onclick = function() {
    const widthItem = document.querySelector('.item').offsetWidth;
    document.getElementById('formList').scrollLeft -= widthItem;

}




document.getElementById('next-search').onclick = function() {
    const widthItem = document.querySelector('.item-search').offsetWidth;
    document.getElementById('formList-search').scrollLeft += widthItem;
}
document.getElementById('prev-search').onclick = function() {
    const widthItem = document.querySelector('.item-search').offsetWidth;
    document.getElementById('formList-search').scrollLeft -= widthItem;

}