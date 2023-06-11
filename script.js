let plusIcon = document.getElementById("plusIcon");
let popupForm = document.getElementById("popupFormId");
let bookName = document.getElementById("bookName");
let bookAuthor = document.getElementById("bookAuthor");
let bookPages = document.getElementById("bookPages");
let readOrNot = document.getElementById("readOrNot");
let yesBtn = document.querySelector("#yesBtn");
let submitBtn = document.getElementById("submitBtn");
let closeSymbol = document.getElementById("closeBtn");
let bottomWrapper = document.getElementById("bottomWrapper");
let deleteBtn = document.querySelector("#deleteBookBtn");
let buttonDiv = document.getElementsByClassName("buttonDiv");

function openPopup() {
    popupForm.classList.add("openPopup")
}
function closePopup() {
    popupForm.classList.remove("openPopup")
}
function clearForm() {
    bookName.value = "";
    bookAuthor.value = "";
    bookPages.value = "";
}
plusIcon.addEventListener('click', () => {
    openPopup();
});
closeSymbol.addEventListener('click', () => {
    closePopup();
    clearForm();
})

// Library constructor
const myLibrary = [
    {name: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    pages: "423",
    read: false,
}]

function Book(name, author, pages, read) {
    this.name = name,
    this.author = author,
    this.pages = pages,
    this.read = read;
}


function toggleRead (index) {
    myLibrary[index].toggleRead();
    console.log(read);
    cardCreate();
}
Book.prototype.toggleRead = function () {
    this.read = !this.read;
    return this.read;
}
const addBookToLibrary = () => {
    let name = bookName.value;
    let author = bookAuthor.value;
    let pages = bookPages.value;
    let read = getReadValue();
    let newBook = new Book(name, author, pages, read);
    myLibrary.push(newBook)
}

const getReadValue = () => {
    if(readOrNot.value == "ON") return true;
    else return false;
}
function removeBook(index) {
    myLibrary.splice(index, 1);
    cardCreate();
}

function cardCreate() {
    let libraryEl = document.querySelector("#bottomWrapper");
    libraryEl.innerHTML = "";
    for(let i = 0; i < myLibrary.length; i++){
        let book = myLibrary[i];
    let card = document.createElement("div");
        card.innerHTML = `
        <div class="bookCard">
            <p class="headerText">Name: <span class="dataText">${book.name}</span>
            <p class="headerText">Author: <span class="dataText">${book.author}</span>
            <p class="headerText">Pages: <span class="dataText">${book.pages}</span>
            <div class="buttonDiv">
            <p class="headerText">Read: </p><button id="yesBtn" onclick="toggleRead(${i})">${book.read ? "YES" : "NO"}</button>
            </div>
            <div class="buttonDiv">
            <p class="headerText">Delete: </p><button class="deleteBtn" onclick="removeBook(${i})">DELETE</button>
            </div>
        </div>`;
        bottomWrapper.appendChild(card);
}
}
function readOrNotFunc(read) {
    if (read == true){
        yesBtn.classList.add("noBtn");
        yesBtn.innerHTML = "YES";
    } else {
        yesBtn.classList.add("yesBtn");
        yesBtn.innerHTML = 'NO'; 
    }
}
submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addBookToLibrary();

    clearForm();
    closePopup();
    cardCreate();
})

myLibrary.forEach(cardCreate);