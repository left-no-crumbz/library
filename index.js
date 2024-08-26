// TODO:
//  use module pattern
// use private variables
// clean up code

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

Book.prototype.toggleRead = function () {
    this.hasRead = !this.hasRead;
}

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = !!(hasRead === "on");
}


form.addEventListener("submit", (event) => {
    event.preventDefault();
    modal.close();
    title.value = "";
    author.value = "";
    pages.value = "";
    readStatus.checked = false;
    displayBooks();
})

function addBookToLibrary(book){
    myLibrary.push(book);
}


function* generateBooks(){
    let index = 0;
    while (true) {
        yield myLibrary[index++];
    }
}

function removeBookToLibrary(element){
    const card = element;
    const index = card.getAttribute("data-index");
    if(index > -1){
        myLibrary.splice(index, 1);
        bookContainer.removeChild(element);
    }
}

function changeReadColor(book, readToggle) {
    if (book.hasRead){
        readToggle.style.backgroundColor = "#35A552";
    } else {
        readToggle.style.backgroundColor = "#EA3E2F";
    }
}

function displayBooks() {
    const bookGenerator = generateBooks();
    const card = document.createElement("div");
    const bookTitle = document.createElement("h1");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const btnContainer = document.createElement("div");

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    const readToggle = document.createElement("div");
    card.classList.add("card");
    card.classList.add("grid");
    removeBtn.classList.add("remove-btn");
    readToggle.classList.add("read-toggle");
    btnContainer.classList.add("flex");
    btnContainer.classList.add("btn-container");

    for (let index = 0; index < myLibrary.length; index++) {
        const book = bookGenerator.next();

        bookTitle.textContent = book.value.title;
        bookAuthor.textContent = book.value.author;
        bookPages.textContent = book.value.pages;
        readToggle.textContent = book.value.hasRead ? "Read" : "Not Read";

        changeReadColor(book.value, readToggle);

        console.log(readToggle.classList);
        card.setAttribute("data-index", `${index}`)

        bookContainer.appendChild(card);
        card.appendChild(bookTitle);
        card.appendChild(bookAuthor);
        card.appendChild(bookPages);
        card.appendChild(btnContainer);
        btnContainer.appendChild(removeBtn);
        btnContainer.appendChild(readToggle);

    }

    card.addEventListener("mousedown", (event) => {
        const target = event.target
        const className = target.className;
        const index = card.getAttribute("data-index");

        const book = myLibrary[index];


        if(className.includes("read-toggle")){
            book.toggleRead();
            readToggle.textContent = book.hasRead ? "Read" : "Not Read";

            changeReadColor(book, readToggle);

        } else if (className.includes("remove-btn")){
            removeBookToLibrary(card);
        }
    });
}

addBookBtn.addEventListener("mousedown", (event) => {
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const bookPages = pages.value;
    const bookReadStatus = readStatus.checked ? "on" : "off";
    const book = new Book(bookTitle, bookAuthor, bookPages, bookReadStatus)
    addBookToLibrary(book);    
})


openModal.addEventListener("mousedown", () => {
    modal.showModal();
})



window.addEventListener("mousedown", (event) => {
    if (event.target === modal) {
        modal.close();
    }

})
