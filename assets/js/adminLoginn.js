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
const adminLogin = ref(db, "adminLogin")




onValue(adminLogin, (snapshot) => {
    const adminLoginData = snapshot.val();
    const adminLoginArr = Object.entries(adminLoginData).map((item) => ({
        id: item[0],
        ...item[1]
    }));
    const passwords = adminLoginArr.map((item) => item.password);
    const userName = adminLoginArr.map((item) => item.name);
    console.log(passwords,userName);

    const btn_admin = document.querySelector(".btn_admin");
    btn_admin.addEventListener("click", function (e) {
        e.preventDefault()
        const login_username = document.querySelector(".login_username").value.trim();
        const login_password = document.querySelector(".login_password").value.trim();

        const userIndex = userName.indexOf(login_username);

        if (userIndex !== -1 && passwords[userIndex] === login_password) {
            localStorage.setItem("password", login_password);
            localStorage.setItem("username", login_username);

            document.querySelector(".first_login").style.display = "none"
            document.querySelector("#Second-panel").style.display = "flex"
        }

        else if (!login_password || !login_username) {
            alert("Fill in all the information")
        }
        else {
            alert("Username or password are incorrect")
        }
    });

})

let storedUsername = localStorage.getItem("username");
let storedPassword = localStorage.getItem("password");

let checkHasItemInLocalStorage = (user_name, user_pass) => {
    if (user_name && user_pass) {
        document.querySelector(".first_login").style.display = "none"
        document.querySelector("#Second-panel").style.display = "flex"
    } else {
        document.querySelector(".first_login").style.display = "flex"
        document.querySelector("#Second-panel").style.display = "none"
    }
}

checkHasItemInLocalStorage(storedUsername, storedPassword);