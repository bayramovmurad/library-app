let searchInputAdmin = document.getElementById("search_input_admin");
let searchInputButton = document.getElementById("seach_input_btn");
let searchHistory = document.querySelector(".search-history");


searchInputButton.addEventListener("click", (e) => {
    e.preventDefault();
    searchHistory.classList.add("active");
    const data_name = searchInputAdmin.value;
    searchData(data_name)

});

const searchData = async(data_name) => {
    const resp = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${data_name}`);
    const data = await resp.json();
    let book_result = data.items.map((data_item) =>
        `
                    <div data-book-id='${data_item.id}' onclick="formRegister('${data_item.id}')"  id="admin_result_item" class="admin_result_item">
                        <img src="../assest/icons/admin/search/history.svg" alt="">
                        ${data_item.volumeInfo.title}
                    </div>
                `
    ).join("");
    searchHistory.innerHTML = book_result;


}


const inputBookName = document.querySelector(".input_book_name")
const inputBookAuthor = document.querySelector(".input_book_author")
const inputBookImg = document.querySelector(".input_book_img")
const inputBookDesc = document.querySelector(".input_book_desc")
const inputBookType = document.querySelector(".input_book_type")
const inputBookbutton = document.querySelector(".input_book_button")


const formRegister = async(data_id) => {
    const resp = await fetch(`https://www.googleapis.com/books/v1/volumes/${data_id}`);
    const data = await resp.json();
    inputBookName.placeholder = data.volumeInfo.title
    inputBookAuthor.placeholder = data.volumeInfo.authors[0]
    inputBookImg.placeholder = data.volumeInfo.infoLink
    inputBookDesc.placeholder = data.volumeInfo.description
    inputBookType.placeholder = data.volumeInfo.industryIdentifiers.map((item) => item.type)

}