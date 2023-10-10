import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBPpBEJBpcRwZxwpV7xrH6KvN8xG3if84k",
    authDomain: "library-app-419d1.firebaseapp.com",
    databaseURL: "https://library-app-419d1-default-rtdb.firebaseio.com",
    projectId: "library-app-419d1",
    storageBucket: "library-app-419d1.appspot.com",
    messagingSenderId: "994823770626",
    appId: "1:994823770626:web:5f7de5fb8491e1df468d1b"
};


let globalBookArr;

// !index catalog

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const catalog = ref(db, "catalog");



let home_second_catalog_box = document.querySelector(".home_second_catalog_box")
console.log(home_second_catalog_box);

onValue(catalog,(snapshot)=>{
    let catalogData = snapshot.val();
    let catalogDataArr = Object.entries(catalogData);
    let catalogItem = catalogDataArr.map((item)=> 
    `
       <div class="second_box"><a href="">${item[1].type}</a></div>
    `).join("")
    
    home_second_catalog_box.innerHTML = catalogItem;



})

// !catalog catalog

    
let catalog_list = document.querySelector(".catalog_list")

onValue(catalog, (snapshot) => {
    let catalogData = snapshot.val();
    let catalogDataArr = Object.entries(catalogData);
    let catalogItem = catalogDataArr.map((item) =>
        `
      <li><a class="catalogType" href="">${item[1].type}</a></li>
    `).join("")

    catalog_list.innerHTML = catalogItem;
    let catalogType = document.querySelectorAll(".catalogType")
    catalogType.forEach((item)=> item.addEventListener("click", function(e){
        e.preventDefault()
        filterCatalogType(globalBookArr,item.innerText)
    }))

})

// ! catalog item



let list = document.getElementById("list")
const bookAdmin = ref(db, "bookAdmin")
onValue(bookAdmin, (snapshot) => {
    let catalogData = snapshot.val();
    let catalogDataArr = Object.entries(catalogData);
    globalBookArr = catalogDataArr
    let catalogItem = catalogDataArr.map((item) =>
        `
        <div class="item">
            <img src="${item[1].img}" class="avatar">
            <div class="content-slider">
                <h2>${item[1].name}</h2>
                <p>${item[1].author}</p>
                <button class="read_more_button" data-id="${item[0]}" >Read more</button>
            </div>
       </div>
    `).join("")
    list.innerHTML = catalogItem;
    let read_more_button = document.querySelectorAll(".read_more_button");
    read_more_button.forEach((item)=> item.addEventListener('click', function(e){
        e.preventDefault()
        let book_id = item.dataset.id;
        window.location.href = `./bookPage.html#id=${book_id}`
    }))

})




function filterCatalogType(arr,items){
    // console.log(arr,items);
    
    let result = arr.filter((item) => item[1].type == items);
    let resultItem = result.map((item) =>
        `
        <div class="item">
            <img src="${item[1].img}" class="avatar">
            <div class="content-slider">
                <h2>${item[1].name}</h2>
                <p>${item[1].author}</p>
                <button>Read more</button>
            </div>
       </div>
    `).join("")
    list.innerHTML = resultItem;
  

}