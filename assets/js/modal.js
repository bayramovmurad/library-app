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
const users = ref(db, "users")

let id = 1

let joinBtn = document.getElementById("join_btn")
let modal_body = document.querySelector("#modal_body");
let fullname_input = document.querySelector("#fullname_input")
let email_input = document.querySelector("#email_input")
let join_tbody = document.querySelector(".join-tbody")


joinBtn?.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(email_input.value, fullname_input.value);
    if (email_input.value == 0 || fullname_input.value == 0) {
        alert("formu doldurun")
    } else {
        let userInformation = {
            fullname: fullname_input.value,
            email: email_input.value
        }
        push(users, userInformation)
        fullname_input.value = ""
        email_input.value = ""
    }
})

onValue(users, (snapshot) => {
    const data = snapshot.val();
    let dataToArr = Object.entries(data)
    let dataItem = dataToArr.map((item) => `
         <tr class="user-table">
            <td>${id++}</td>
            <td>${item[1].fullname}</td>
            <td>${item[1].email}</td>
        </tr>
      `).join("")
    join_tbody.innerHTML += dataItem
});


let join_btn = document.querySelector(".join_us");


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









