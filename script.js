const bookList = [new Book("Simyacı","R.Coelho",420,true,0)];


function Book(title,author,pageNum,haveRead,index){

    this.title=title;
    this.author=author;
    this.pageNum=pageNum;
    this.haveRead=haveRead;
    this.index=index;
    this.read= function(){
        if (this.haveRead)
            return "Read";
        else
            return "Not read";
    }

    this.info = function(){
        return `${title} by ${author}, ${pageNum} pages ${this.read()}`;
    }

};


function displayBooks(){
    const cards= document.querySelector("#cards")
    cards.innerHTML=""
    bookList.forEach((book) => {
        const newDiv= document.createElement("div");
        newDiv.className="card";
        newDiv.id=book.index;
        const title=document.createElement("h2")
        title.innerHTML="Title: "+book.title
        newDiv.appendChild(title);
        const author=document.createElement("p")
        author.innerHTML="Author: "+book.author
        newDiv.appendChild(author);
        const pageNum=  document.createElement("p")
        pageNum.innerHTML="Number of Pages: "+book.pageNum
        newDiv.appendChild(pageNum)
        const haveReadBtn=document.createElement("button")
        haveReadBtn.addEventListener("click",readBtn )
        haveReadBtn.innerHTML=book.read();
        newDiv.appendChild(haveReadBtn);

        const delbtn=document.createElement("button");
        delbtn.innerHTML="Delete Book"
        delbtn.addEventListener("click",deleteBook)
        newDiv.appendChild(delbtn)

        document.querySelector(".cards").appendChild(newDiv);

    });
}

const readBtn= (event) =>{
    const index=event.target.parentElement.id
    bookList[index].haveRead=!bookList[index].haveRead;
    displayBooks()
}
const deleteBook = (event) => {
    const index=(event.target.parentElement.id)
    // bookList.splice(Number.parseInt(index),1)
    delete bookList[index];
    displayBooks()
}
function handleSubmit(event) {
    event.preventDefault();
    const titleInput=document.querySelector("#title").value;
    const authorInput=document.querySelector("#author").value;
    const numInput=document.querySelector("#pageNum").value;
    const readInput=document.querySelector("#haveRead").checked;

    bookList.push(new Book(titleInput,authorInput,numInput,readInput,bookList.length))

    modal.close();
    displayBooks()
}



displayBooks()
const modal=document.querySelector("#modal");
const openModal=document.querySelector("#addBook");

openModal.addEventListener(("click"),() => {

    modal.showModal();
});

const formSubmit=document.querySelector("#form ");
formSubmit.addEventListener("submit",handleSubmit)


const closeModal=document.querySelector("#close-modal");

closeModal.addEventListener(("click"), () =>
{
    modal.close();
})

