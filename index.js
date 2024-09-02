// TODO:
// use module pattern
// use private variables

const myLibrary = (() => {
    const myLibrary = [];
    const push = (item) => myLibrary.push(item);
    return {push};
})();


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
    this.hasRead = !!hasRead;
}


form.addEventListener("submit", (event) => {
    event.preventDefault();
    modal.close();
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const bookPages = pages.value;
    const bookReadStatus = readStatus.checked;
    const book = new Book(bookTitle, bookAuthor, bookPages, bookReadStatus);
    addBookToLibrary(book);
    displayBook(book, myLibrary.length - 1);
    title.value = "";
    author.value = "";
    pages.value = "";
    readStatus.checked = false;
});

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBook(book, index) {
    const card = document.createElement("div");
    const bookTitle = document.createElement("h1");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const btnContainer = document.createElement("div");

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    const readToggle = document.createElement("div");
    card.classList.add("card", "grid");
    removeBtn.classList.add("remove-btn");
    readToggle.classList.add("read-toggle");
    btnContainer.classList.add("flex", "btn-container");

    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages;
    readToggle.textContent = book.hasRead ? "Read" : "Not Read";

    console.log(book.hasRead);

    changeReadColor(book, readToggle);

    card.setAttribute("data-index", `${index}`);

    bookContainer.appendChild(card);
    card.appendChild(bookTitle);
    card.appendChild(bookAuthor);
    card.appendChild(bookPages);
    card.appendChild(btnContainer);
    btnContainer.appendChild(removeBtn);
    btnContainer.appendChild(readToggle);

    card.addEventListener("mousedown", (event) => {
        const target = event.target;
        const className = target.className;
        const index = card.getAttribute("data-index");

        const book = myLibrary[index];

        if (className.includes("read-toggle")) {
            book.toggleRead();
            readToggle.textContent = book.hasRead ? "Read" : "Not Read";
            changeReadColor(book, readToggle);
        } else if (className.includes("remove-btn")) {
            removeBookFromLibrary(card);
        }
    });
}

function removeBookFromLibrary(element) {
    const card = element;
    const index = card.getAttribute("data-index");
    if (index > -1) {
        myLibrary.splice(index, 1);
        bookContainer.removeChild(element);
    }
}

function changeReadColor(book, readToggle) {
    if (book.hasRead) {
        readToggle.style.backgroundColor = "#35A552";
    } else {
        readToggle.style.backgroundColor = "#EA3E2F";
    }
}


openModal.addEventListener("mousedown", () => {
    modal.showModal();
})



window.addEventListener("mousedown", (event) => {
    if (event.target === modal) {
        modal.close();
    }

})
