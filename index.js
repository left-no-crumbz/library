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





Book.prototype.toggleRead = () => {
    //  add toggle read functionality
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
    console.log(myLibrary);
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

function displayBooks() {
    const bookGenerator = generateBooks();

    // TODO: Add toggle read button
    const card = document.createElement("div");
    const bookTitle = document.createElement("h1");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    const readToggle = document.createElement("div");
    

    for (let index = 0; index < myLibrary.length; index++) {
        const book = bookGenerator.next();

        bookTitle.textContent = book.value.title;
        bookAuthor.textContent = book.value.author;
        bookPages.textContent = book.value.pages;
        readToggle.textContent = (book.value.hasRead) ? "Read" : "Not Read"; 

        card.classList.add("card");
        card.setAttribute("data-index", `${index}`)

        bookContainer.appendChild(card);
        card.appendChild(bookTitle);
        card.appendChild(bookAuthor);
        card.appendChild(bookPages);
        card.appendChild(removeBtn);
        card.appendChild(readToggle);
    }

    removeBtn.addEventListener("mousedown", (event) => {
        removeBookToLibrary(card);
    });
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
    if (event.target === modal) {
        modal.close();
    }

})
