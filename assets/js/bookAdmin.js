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
const catalog = ref(db, "catalog")
const add_book = document.querySelector(".add_book")
// push(catalog,"roman")
let date = new Date
let create_book_date = `${date.getFullYear()}:${date.getMonth()}:${date.getDay()}`
add_book?.addEventListener("click", function (e) {
    e.preventDefault();
    let input_book_name = document.querySelector(".input_book_name").value;
    let input_book_author = document.querySelector(".input_book_author").value;
    let input_book_img = document.querySelector(".input_book_img").value;
    let input_book_desc = document.querySelector(".input_book_desc").value;
    let input_book_type = document.querySelector(".input_book_type").value;
    


    let bookAdminObj = {
        name: input_book_name,
        author: input_book_author,
        img: input_book_img,
        desc: input_book_desc,
        type: input_book_type,
        book_date: create_book_date,
        book_apperance: globalData.volumeInfo.publishedDate,

    };
    console.log(globalData);


    

    push(bookAdmin, bookAdminObj);
    categoriessorter(input_book_type)
    
})


let books_tbody = document.querySelector(".books_tbody")

onValue(bookAdmin, (snapshot) => {
    const bookAdminData = snapshot.val();
   
    if (!bookAdminData) {
        books_tbody.classList.add("d-none")
    } else {
        books_tbody.classList.remove("d-none")
    }
    const bookAdminArr = Object.entries(bookAdminData);
    const bookAdminItem = bookAdminArr.map((item) => `
          
            <tr>
                    <td>${id++}</td>
                    <td id="mobil_td">
                        <div class="book-admin-img">
                            <img class="book_admin_img" src="${item[1].img}" alt="${item[1].name}">
                            <p>${item[1].name}</p>
                        </div>
                    </td>
                    <td  id="mobil_td" class="book-desc">${item[1].desc}</td>
                    <td id="mobil_td">${item[1].type}</td>
                    <td id="mobil_td">${item[1].author}</td>
                    <td id="mobil_td">
                    <button class="deletes" data-id="${item[0]}">
                    <i class="material-icons">&#xe872;</i>
                    </button>
                    </td>
                    
            </tr>`)
    books_tbody.innerHTML = bookAdminItem.join("");
    let deletes = document.querySelectorAll(".deletes")
    console.log(deletes);

    deletes.forEach((el) => el.addEventListener('click', function () {
        let id = el.dataset.id
        console.log(id);
        deleteBookDetail(id)

    }))

   

})

function deleteBookDetail(id) {
    let rmv = ref(db, "bookAdmin/" + id);
    console.log(rmv);
    remove(rmv);
}


function categoriessorter(text){
    let arr = []
    onValue(catalog, (snapshot) => {
        let bookObj = snapshot.val();
        let bookObjArr = Object.entries(bookObj);
  
        bookObjArr.forEach((item) => {
            arr.push(item[1].type)

        })
        if (!arr.includes(text)) {
            push(catalog,{
                type:text
            })
        }
    })
}