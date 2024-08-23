const myLibrary = [];


const openModal = document.getElementById("open-modal");
const modal = document.getElementById("modal");
const addBookBtn = document.getElementById("add-book-btn");
const title = document.getElementById("title");

console.log(modal);

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}



function addBookToLibrary(book){
    myLibrary.push(book);
}

function removeBookToLibrary(book){

}

openModal.addEventListener("mousedown", (event) => {
    modal.showModal();
})

window.addEventListener("mousedown", (event) => {
    console.log(event.target);
    if (event.target === modal) {
        modal.close();
    }
})