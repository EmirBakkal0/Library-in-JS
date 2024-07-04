const bookList = JSON.parse(window.localStorage.getItem("books")) || [];

function Book(title, author, pageNum, haveRead, index) {
  this.title = title;
  this.author = author;
  this.pageNum = pageNum;
  this.haveRead = haveRead;
  this.index = index;
  

  this.info = function () {
    return `${title} by ${author}, ${pageNum} pages ${this.read()}`;
  };
}

const isRead =(book) => {
    if (book.haveRead) return "Read";
    else return "Not read";
  };

function displayBooks() {
  const cards = document.querySelector("#cards");
  cards.innerHTML = "";
  if (bookList.length > 0) {
    bookList.forEach((book) => {
        if(book===null){
            console.log("erorr");
        }

        else{

            const newDiv = document.createElement("div");
            newDiv.className = "card";
            newDiv.id = book.index;
            const title = document.createElement("h2");
            title.innerHTML = "Title: " + book.title;
            newDiv.appendChild(title);
            const author = document.createElement("p");
            author.innerHTML = "Author: " + book.author;
            newDiv.appendChild(author);
            const pageNum = document.createElement("p");
            pageNum.innerHTML = "Number of Pages: " + book.pageNum;
            newDiv.appendChild(pageNum);
            const haveReadBtn = document.createElement("button");
            haveReadBtn.addEventListener("click", readBtn);
            haveReadBtn.innerHTML = isRead(book)
            newDiv.appendChild(haveReadBtn);
    
            const delbtn = document.createElement("button");
            delbtn.innerHTML = "Delete Book";
            delbtn.addEventListener("click", deleteBook);
            newDiv.appendChild(delbtn);
    
            document.querySelector(".cards").appendChild(newDiv);
        }
        
    });
  }
}

const readBtn = (event) => {
  const index = event.target.parentElement.id;
  bookList[index].haveRead = !bookList[index].haveRead;
  window.localStorage.setItem("books", JSON.stringify(bookList));

  displayBooks();
};
const deleteBook = (event) => {
  const index = event.target.parentElement.id;
//   bookList.splice(Number.parseInt(index),1)
  delete bookList[index]; // find a better way to delete than this (it leaves null blocks)
  window.localStorage.setItem("books", JSON.stringify(bookList));

  displayBooks();
};
function handleSubmit(event) {
  event.preventDefault();
  let titleInput = document.querySelector("#title").value;
  const authorInput = document.querySelector("#author").value;
  const numInput = document.querySelector("#pageNum").value;
  const readInput = document.querySelector("#haveRead").checked;

  bookList.push(
    new Book(titleInput, authorInput, numInput, readInput, bookList.length)
  );
  window.localStorage.setItem("books", JSON.stringify(bookList));

  modal.close();
  displayBooks();
}

displayBooks();
const modal = document.querySelector("#modal");
const openModal = document.querySelector("#addBook");

openModal.addEventListener("click", () => {
  modal.showModal();
});

const formSubmit = document.querySelector("#form ");
formSubmit.addEventListener("submit", handleSubmit);

const closeModal = document.querySelector("#close-modal");

closeModal.addEventListener("click", () => {
  modal.close();
});
console.log(bookList);
