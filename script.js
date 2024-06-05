const myLibrary = [];
const library = document.querySelector('.inner-container');
const newBook = document.querySelector('.newBook');
const addBook = document.querySelector('#addBtn');
const closeBtn = document.querySelector('.close');
const form = document.querySelector('.form');
const formOverlay = document.querySelector('.overlay')

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
addBookToLibrary("You Don't Know JS: Scope and Closures", "Kyle Simpson", 98, false);
addBookToLibrary("The Pragmatic Programmer", "Andrew Hunt and David Thomas", 352, true);


function displayBooks() {
    library.innerHTML = '';
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        const readStatus = document.createElement('button');
        const removeBtn = document.createElement('button');
        const cardButtons = document.createElement('div');
        removeBtn.textContent = 'Remove'
        readStatus.textContent = 'Toggle read status';

        cardButtons.classList.add('flex-card-buttons')
        readStatus.classList.add('status');
        removeBtn.classList.add('remove');
        bookCard.classList.add('card');




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
                bookInfo.classList.add('flex-info-data');
                bookCard.appendChild(bookInfo);

            }

        }
        cardButtons.appendChild(readStatus);
        cardButtons.appendChild(removeBtn);
        bookCard.appendChild(cardButtons);
        library.appendChild(bookCard);
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


closeBtn.addEventListener('click', () => {
    formOverlay.style.display = 'none';
})
newBook.addEventListener('click', () => {
    formOverlay.style.display = 'initial';
})
addBook.addEventListener('click', (e) => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('read').checked;
    if (!title || !author || !pages) {
        alert('Please fill in all fields before adding the book.');
        e.preventDefault();
        return;
    }

    addBookToLibrary(title, author, pages, isRead);
    e.preventDefault();
    form.reset();
    formOverlay.style.display = 'none';

})