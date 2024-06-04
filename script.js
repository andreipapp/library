const myLibrary = [];
const library = document.querySelector('.inner-container');
const newBook = document.querySelector('.newBook');
const dialog = document.querySelector('dialog');
const addBook = dialog.querySelector('#addBtn');
const closeBtn = dialog.querySelector('button');

function Book(title, author, pages, isRead) {
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.Read = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    displayBooks();
}
function resetForm() {
    document.getElementById('form').reset();
}


addBookToLibrary("Clean Code", "Robert C. Martin", 464, true);
addBookToLibrary("You Don't Know JS: Scope & Closures", "Kyle Simpson", 98, false);
addBookToLibrary("The Pragmatic Programmer", "Andrew Hunt and David Thomas", 352, true);


function displayBooks() {
    library.innerHTML = '';
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        const readStatus = document.createElement('button');
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove');
        removeBtn.textContent = 'Remove'
        readStatus.classList.add('status');
        readStatus.textContent = 'Toggle read status';


        for (let key in book) {
            const bookInfo = document.createElement('div');
            const left = document.createElement('div');
            const right = document.createElement('div');

            if (book.hasOwnProperty(key)) {
                right.textContent = book[key];
                left.textContent = key + ' :';
                right.classList.add(`${key}`);
                bookInfo.appendChild(left);
                bookInfo.appendChild(right);
                bookInfo.classList.add('flex');
                bookCard.appendChild(bookInfo);

            }
            bookCard.classList.add('card');

        }
        library.appendChild(bookCard);
        bookCard.appendChild(readStatus);
        bookCard.appendChild(removeBtn);
        removeBtn.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            displayBooks();
        })
        readStatus.addEventListener('click', () => {
            book.Read = !book.Read;
            displayBooks();
        });
    })
}


newBook.addEventListener('click', () => {
    dialog.showModal();
})
addBook.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('read').checked;
    addBookToLibrary(title, author, pages, isRead);
    resetForm();
    dialog.close();
})
closeBtn.addEventListener('click', () => {
    dialog.close();
})

