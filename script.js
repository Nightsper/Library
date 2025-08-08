const myLibrary = [];


let newBook = document.querySelector("#new_book_btn")

let dialog = document.querySelector("dialog")

let dialogSubmit = document.querySelector("#submit_book_btn")

let dialogCancel = document.querySelector("#cancel_btn")


function Book(title, author, pages, read) {
  
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function() {
    return `<b>Title:</b> ${this.title}<br> <b>Author:</b> ${this.author}<br> <b>Page Count:</b> ${this.pages}<br> <b>Read?</b> ${this.read}`
  }
}

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read)
  book.id = crypto.randomUUID();
  myLibrary.push(book)
  
  let books = document.querySelector("#books")
  
  let addBook = document.createElement("div")
  addBook.innerHTML = book.info()
  books.appendChild(addBook)
}


newBook.addEventListener("click", () => {
  dialog.showModal()
})

dialogCancel.addEventListener("click", () => {
  dialog.close()
})

dialogSubmit.addEventListener("click", () => {
  event.preventDefault()
  let title = document.querySelector("#title")
  let author = document.querySelector("#author")
  let pageCount = document.querySelector("#page_count")
  let read = document.querySelector('input[name="read"]:checked')
  
  addBookToLibrary(title.value, author.value, pageCount.value, read.value)
})



addBookToLibrary("Diary of a Wimpy Kid: No Brainer", "Jeff Kinney", "217", "No")

addBookToLibrary("Harry Potter and the Deathly Hallows", "J. K. Rowling", "759", "No", )
