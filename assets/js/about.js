import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, push, onValue, update } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

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
const about = ref(db, "about")


let about_info_add = document.querySelector(".about_info_add");

about_info_add?.addEventListener("click", function (e) {
    e.preventDefault()
    let about_title = document.querySelector(".about_title").value.trim();
    let about_img = document.querySelector(".about_img").value.trim();
    let about_desc = document.querySelector(".about_desc").value.trim();

    let aboutObj = {
        title: about_title,
        img: about_img,
        desc: about_desc
    }

    if (!about_title || !about_img || !about_desc) {
        alert("All")
    } else {
        update(about, aboutObj)
    }
})



let about_section = document.getElementById("about_section")
console.log(about_section);
onValue(about, (snapshot) => {
    const aboutData = snapshot.val();
    let aboutItem = [aboutData].map((item) =>`
    
     <div class="about_store">
            <h2>${item.title}</h2>
            <p>${item.desc}</p>
        </div>
 <div class="about_img">
    <img src="${item.img}" alt="${item.title}">
 </div>
`).join("")

    about_section.innerHTML = aboutItem;
});

