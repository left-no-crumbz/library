const myLibrary = [];


const openModal = document.getElementById("open-modal");
const modal = document.getElementById("modal");
const addBookBtn = document.getElementById("add-book-btn");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const readStatus = document.getElementById("readStatus");
const form = document.getElementById("book-form");

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = !!(hasRead.value === "on");
}


form.addEventListener("submit", (event) => {
    event.preventDefault();
})

function addBookToLibrary(book){
    myLibrary.push(book);
}

function removeBookToLibrary(book){

}

addBookBtn.addEventListener("mousedown", (event) => {
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const bookPages = pages.value;
    const bookReadStatus = readStatus.value;

    const book = new Book(bookTitle, bookAuthor, bookPages, bookReadStatus)
    addBookToLibrary(book);
    console.log(myLibrary);
})


openModal.addEventListener("mousedown", () => {
    modal.showModal();
})

window.addEventListener("mousedown", (event) => {
    event.preventDefault();
    console.log(event.target);
    if (event.target === modal) {
        modal.close();
    }
})

console.log(myLibrary);