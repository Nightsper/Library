let myLibrary = [];


let newBook = document.querySelector("#new_book_btn")

let dialog = document.querySelector("dialog")


let dialogSubmit = document.querySelector("#submit_book_btn")
dialogSubmit.id = "submit_btn"

let dialogCancel = document.querySelector("#cancel_btn")
dialogCancel.id = "cancel_btn"

let removeBook = document.querySelector("#remove_btn")

let form = document.querySelector("form")

let formInputs = Array.from(document.querySelectorAll("input")).reverse();

let fieldset = document.querySelector("fieldset")


class Book {
  
  constructor(title, author, pages, read) {
    
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }
  
  info() {
    return `<b>Title:</b> ${this.title}<br> <b>Author:</b> ${this.author}<br> <b>Page Count:</b> ${this.pages}<br> <b>Read?</b> ${this.read}`
    
  }
}

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read)
  book.id = crypto.randomUUID();
  myLibrary.push(book)
  
  let library = document.querySelector("#library")
  
  let bookCard = document.createElement("div")
  let btnSection = document.createElement("div")
  let removeBookBtn = document.createElement("button")
  let readStatusBtn = document.createElement("button")
  
  bookCard.id = "book_card"
  btnSection.id = "btn_section"
  removeBookBtn.id = "remove_btn"
  readStatusBtn.id = "read_status_btn"
  
  removeBookBtn.textContent = "Remove"
  readStatusBtn.textContent = "Read Status"
  
  removeBookBtn.addEventListener("click", () => {
    bookCard.remove()
    myLibrary = myLibrary.filter(b => b.id !== book.id);
  })
  
  readStatusBtn.addEventListener("click", () => {
    book.toggleBookStatus()
    
    bookCard.innerHTML = book.info()
    
    bookCard.appendChild(btnSection)
    btnSection.appendChild(removeBookBtn)
    btnSection.appendChild(readStatusBtn)
  })
  
  bookCard.innerHTML = book.info()
  
  library.appendChild(bookCard)
  bookCard.appendChild(btnSection)
  btnSection.appendChild(removeBookBtn)
  btnSection.appendChild(readStatusBtn)
  
}

Book.prototype.toggleBookStatus = function() {
  if (this.read == "Yes") {
    this.read = "No"
  }
  else if (this.read == "No") {
    this.read = "Yes"
  }
}

function checkForm() {
  let isValid = true;
  
  formInputs.forEach(input => {
    if (!input.checkValidity()) {
      isValid = false;
      input.style.border = "3px solid red"
      if (input.value == "Yes" || input.value == "No") {
        fieldset.style.border = "3px solid red"
      }
      
      input.reportValidity()
    }
    
  })
  return isValid;
}

function formCompletion() {
  let isValid = true;
  
  formInputs.forEach(input => {
    if (!input.checkValidity()) {
      isValid = false;
    }
  })
  return isValid;
}

function resetFormStyles() {
  formInputs.forEach(input => {
    input.style.border = "2px solid #D3D3D3"
    fieldset.style.border = "2px solid #9b9b9b"
    fieldset.style.border = "1px solid #9b9b9b"
    dialogSubmit.style.backgroundColor = "#efefef"
    dialogSubmit.style.color = "black"
    
  })
}


newBook.addEventListener("click", () => {
  dialog.showModal()
})

dialogCancel.addEventListener("click", () => {
  resetFormStyles()
  form.reset()
  dialog.close()
})

dialogSubmit.addEventListener("click", () => {
  event.preventDefault()
  let title = document.querySelector("#title")
  let author = document.querySelector("#author")
  let pageCount = document.querySelector("#page_count")
  let read = document.querySelector('input[name="read"]:checked')
  let readStatus = document.querySelector(".status_section")
  
  let bookForm = document.querySelector("#book_form")
  
  if (!checkForm()) {
    return;
  }
  
  
  addBookToLibrary(title.value, author.value, pageCount.value, read.value)
  
  formInputs.forEach(input => {
    input.style.border = "2px solid #D3D3D3"
    fieldset.style.border = "1px solid #9b9b9b"
  })
  resetFormStyles()
  dialog.close()
  bookForm.reset()
})


formInputs.forEach(input => {
  input.addEventListener("input", () => {
    if (input.value.length > 0) {
      input.style.border = "3px solid #757575"
      if (input.value == "Yes" || input.value == "No") {
        fieldset.style.border = "3px solid #757575"
      }
    }
    
    if (formCompletion()) {
      dialogSubmit.style.backgroundColor = "green"
      dialogSubmit.style.borderColor = "black"
      dialogSubmit.style.color = "white"
    }
    else if (!formCompletion()) {
      dialogSubmit.style.backgroundColor = "#efefef"
      dialogSubmit.style.color = "black"
    }
  })
})