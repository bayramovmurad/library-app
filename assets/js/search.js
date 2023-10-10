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

let id = 1

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const bookAdmin = ref(db, "bookAdmin")


let list_search = document.getElementById("list-search");



const bookAdminItem = `
    <div class="item-search">
    <div class="avatar-search">
        <img src="./img/slider-book.svg">
    </div>
        <div class="content-slider-search">
                <h2>Order in Chaos</h2>
                <p class="content-search-name">Konstantin Koptelov</p>
                <p class="content-search-about">We work without holidays and weekends! Residents of Kiev can receive an order on the day of its registration. Customers from other cities of Ukraine can receive an order within 1-5 days, depending on the location of the settlement and the selected delivery method. Orders over UAH 1000 are delivered  free of charge *. You can see the available methods, exact terms and cost of delivery during checkout in the order basket, after selecting the delivery city</p>
        </div>
    </div>
    `
list_search.innerHTML = bookAdminItem





const search_input = document.querySelector("#search_input");
const search_button = document.querySelector("#search_button");

search_button.addEventListener("click", function (e) {
    e.preventDefault()
    filterBook(search_input.value);
})

const filterBook = (name) => {
    // console.log(name);
    onValue(bookAdmin, (snapshot) => {
        const bookAdminData = snapshot.val();
        const bookAdminArr = Object.entries(bookAdminData);

        let resultArr = bookAdminArr.filter((item) => {
            return item[1].name == name
        })
        let prev_search = document.getElementById("prev-search")
        let next_search = document.getElementById("next-search")
        if (resultArr.length == 1) {
            prev_search.style.display = "none"
            next_search.style.display = "none"

        } else {
            prev_search.style.display = "flex"
            next_search.style.display = "flex"
        }
    
        const bookAdminItem = resultArr.map((item) => `
    <div class="item-search">
    <div class="avatar-search">
        <img src="${item[1].img}">
    </div>
        <div class="content-slider-search">
                <h2>${item[1].name}</h2>
                <p class="content-search-name">${item[1].author}</p>
                <p class="content-search-about">${item[1].desc}</p>
        </div>
    </div>
    `)
        list_search.innerHTML = bookAdminItem
    })

}
