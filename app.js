const book = document.getElementById('bookInputField');
const author = document.getElementById('authorInputField');
const totalPages = document.getElementById('totalPagesInputField');
const pagesRead = document.getElementById('pagesInputField');
const readStatus = document.getElementById('readStatusInputField');
const submitBtn = document.getElementById('submitBtn');
const library = document.getElementById('library');
const bookStatus = document.querySelectorAll('.readStatus');
const errorMessage = document.getElementById('errorMessage')

let myLibrary = [];

function Book(bookName, bookAuthor, totalPages, pagesRead, read) {
    this.bookName = bookName;
    this.bookAuthor = bookAuthor;
    this.totalPages = totalPages;
    this.pagesRead = pagesRead;
    this.read = read;
}


Book.prototype.toggleStatus = (e, bookId) => {
    if (myLibrary[bookId].read == "Read"){
        myLibrary[bookId].read = "Not Read"
    }
    else {
        myLibrary[bookId].read = "Read"
    }
    e.target.innerText = myLibrary[bookId].read
}

const createItem = (itemObj) => {
    return `<td>${itemObj.bookName}</td>
<td>${itemObj.bookAuthor}</td>
<td>${itemObj.totalPages}</td>
<td>${itemObj.pagesRead}</td>
<td><button class="readStatus">${itemObj.read}</button></td>
<td><button class="deleteBtn">Delete</button></td>`
} 

const addListener = (e) => {
    let bookId = e.target.parentElement.dataset.id
    myLibrary.splice(bookId, 1);
    renderItems();
}

const addBookToDisplay = (newBook) => {
    const bookItem = document.createElement('tr')
    bookItem.setAttribute('data-id', myLibrary.length - 1);
    bookItem.innerHTML = createItem(newBook);
    library.appendChild(bookItem)
    bookItem.querySelector('.readStatus').addEventListener('click', e => {
        let bookId = e.target.parentElement.parentElement.dataset.id
        myLibrary[bookId].toggleStatus(e, bookId);

    })

    bookItem.querySelector('.deleteBtn').addEventListener('click', e => addListener(e))
}

const renderItems = () => {
    library.innerHTML = `<tr id="mainRow">
    <th>Name</th>
    <th>Author</th>
    <th>Total Pages</th>
    <th>Pages Read</th>
    <th>Status</th>
    <th></th>
</tr>`

    // Assigns each book with an id corresponding to it index in the libray array.

    let id = 0;
    myLibrary.map(item => {
        testVar = item;
        const newItem = document.createElement('tr')
        newItem.setAttribute('data-id', id);
        newItem.innerHTML = `<td>${item.bookName}</td>
<td>${item.bookAuthor}</td>
<td>${item.totalPages}</td>
<td>${item.pagesRead}</td>
<td><button class="readStatus">${item.read}</button></td>
<td><button class="deleteBtn">Delete</button></td>`
        library.children[0].append(newItem);
        id++

        newItem.querySelector('.readStatus').addEventListener('click', e => {
            let bookId = e.target.parentElement.parentElement.dataset.id
            if (myLibrary[bookId].read == "Read"){
                myLibrary[bookId].read = "Not Read"
                e.target.innerText = myLibrary[bookId].read
            }
            else {
                myLibrary[bookId].read = "Read"
                e.target.innerText = myLibrary[bookId].read
            }
        })

        newItem.querySelector('.deleteBtn').addEventListener('click', e => addListener(e))
    })
}

const displayError = (errMsg) => {
    errorMessage.style.opacity = 1;
    errorMessage.textContent = (errMsg);
    const hideErrMessage = setTimeout(() => {
        errorMessage.style.opacity = 0;
    }, 3000)
}

submitBtn.addEventListener('click', e =>  {
    if (book.value.length == 0 || author.value.length == 0 || totalPages.value.length == 0) {
        displayError('Invalid input!')
    }
    else if (parseInt(totalPages.value) < parseInt(pagesRead.value)) {
        displayError('Pages read can\'t be bigger than the total amount of pages!')
    }
    else if (parseInt(pagesRead.value) > 10000 || parseInt(totalPages.value) > 10000) {
        displayError('Book pages length can\'t be over 10000 :(')
    }
    else {
        let newBookName = book.value;
        let newBookAuthor = author.value;
        let newPagesRead = pagesRead.value.length == 0 ? 0 : parseInt(pagesRead.value);
        let newTotalPages = parseInt(totalPages.value);
        let bookReadStatus = readStatus.checked ? "Read" : "Not Read";
        let newBook = new Book(newBookName, newBookAuthor, newTotalPages, newPagesRead, bookReadStatus)
        myLibrary.push(newBook)
        addBookToDisplay(newBook)

        // Clear the input field

        book.value = '';
        author.value = '';
        totalPages.value = '';
        pagesRead.value = '';
        readStatus.checked = false;
    }
})

myLibrary.push(new Book('Wuthering Heights', 'Emily Bronte', 104, 25, "Not Read"))
renderItems()