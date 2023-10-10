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
const contact = ref(db, "contact")


const send_btn = document.getElementById("send_btn")

send_btn?.addEventListener("click", function (e) {
    e.preventDefault()
    let contact_fullname = document.getElementById("contact_fullname").value.trim();
    let contact_email = document.getElementById("contact_email").value.trim();
    let contact_adress = document.getElementById("contact_adress").value.trim();
    let contact_phone = document.getElementById("contact_phone").value.trim();
    let contact_note = document.getElementById("contact_note").value.trim();

    if (!contact_fullname || !contact_email || !contact_adress || !contact_phone) {
        alert("all")
    } else {
        const contactObj = {
            fullName: contact_fullname,
            adress: contact_adress,
            email: contact_email,
            phone: contact_phone,
            note: contact_note
        };
        push(contact, contactObj);
        document.getElementById("contact_fullname").value = "";
        document.getElementById("contact_email").value = "";
        document.getElementById("contact_adress").value = "";
        document.getElementById("contact_phone").value = "";
        document.getElementById("contact_note").value = "";
        alert("it is okay")

    }
})

let id = 1;

let contact_tbody = document.getElementById("contact_tbody");
onValue(contact, (snapshot) => {
    const contactData = snapshot.val();
    let contactDataToArr = Object.entries(contactData)
    let contactItem = contactDataToArr.map((item) =>
        `
        <tr>
            <td >${id++}</td>
            <td id="mobil_td">${item[1].fullName}</td>
            <td id="mobil_td">${item[1].adress}</td>
             <td id="mobil_td">${item[1].email}</td>
            <td id="mobil_td">${item[1].phone}</td>

        </tr>           
        `
    ).join("");
    contact_tbody.innerHTML = contactItem
});

