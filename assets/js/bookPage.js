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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const bookAdmin = ref(db, "bookAdmin")





let bookUrl = window.location.hash;
let bookURLLength = bookUrl.length;
const sliceMethod = bookUrl.slice(4,bookURLLength);
let content = document.querySelector(".content")

function getTimeDifferenceInDays(date) {
    const currentDate = new Date();
    const releaseDate = new Date(date);
    const timeDifferenceInMilliseconds = currentDate - releaseDate;
    const daysDifference = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24));
    return daysDifference;
}


onValue(bookAdmin,(snapshot)=>{
    const bookUrl = snapshot.val();
    const bookUrlArr = Object.entries(bookUrl);
    const bookUrlFilter = bookUrlArr.filter((item)=> item[0] == sliceMethod)
    const bookUrlItem = bookUrlFilter.map((item)=>{
       
        const daysAgo = getTimeDifferenceInDays(item[1].book_date);
        return `
            <section class="content-left">
                <button class="btn-first"> <a href="./catologPage.html">&lt BACK</a> </button>

                <button class="year">${item[1].book_apperance.slice(0, 4)}</button>
                <div class="first">
                    <h2>${item[1].name}</h2>
                    <span>${daysAgo} Days ago</span>
                </div>
                <div class="second">
                    <p>${item[1].author}</p>
                    <p>${item[1].desc}</p>
                </div>

            </section>
            <section class="content-right">
                <img src="./img/new.svg" alt="new">
                <img src="${item[1].img}" class="bookImg" alt="">
            </section>
        `
}).join();
    content.innerHTML = bookUrlItem;


})



