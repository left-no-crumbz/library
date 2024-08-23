const myLibrary = [];


const openModal = document.getElementById("open-modal");
const modal = document.getElementById("modal");
const addBookBtn = document.getElementById("add-book-btn");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const readStatus = document.getElementById("readStatus");
const form = document.getElementById("book-form");
const bookContainer = document.getElementById("books-container");


function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = !!(hasRead.value === "on");
}


form.addEventListener("submit", (event) => {
    event.preventDefault();
    modal.close();
    console.log(myLibrary);
    displayBooks();
})

function addBookToLibrary(book){
    myLibrary.push(book);
}

function removeBookToLibrary(book){

}

function* generateBooks(){
    let index = 0;
    while (true) {
        // console.log(myLibrary[index++]);
        yield myLibrary[index++];

    }
}

function displayBooks() {
    const bookGenerator = generateBooks();
    const card = document.createElement("div");
    const title = document.createElement("h1");
    const author = document.createElement("p");
    const pages = document.createElement("p");

    
    for (let index = 0; index < myLibrary.length; index++) {
        const book = bookGenerator.next();
        title.textContent = book.value.title;
        author.textContent = book.value.author;
        pages.textContent = book.value.pages;
        
        bookContainer.appendChild(card);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);        
    }

}

addBookBtn.addEventListener("mousedown", (event) => {
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const bookPages = pages.value;
    const bookReadStatus = readStatus.value;

    const book = new Book(bookTitle, bookAuthor, bookPages, bookReadStatus)
    addBookToLibrary(book);    
})

openModal.addEventListener("mousedown", () => {
    modal.showModal();
})

window.addEventListener("mousedown", (event) => {
    console.log(event.target);
    if (event.target === modal) {
        modal.close();
    }
})
