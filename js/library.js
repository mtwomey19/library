let myLibrary = [];
let newBooks = [];
// localStorage.clear();

function Book(title, author, numPages, haveRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.haveRead = haveRead;
    this.info = function() {
        return `${title} by ${author}, ${numPages} pages, ${haveRead}`;
    }
}

function goToNewBookPage() {
    const newBookBtn = document.getElementById('new-book-btn');
    if (newBookBtn !== null) {
        newBookBtn.addEventListener('click', () => {
        location.href = './new-book.html';
        });
    }
}

function goToLibraryPage() {
    const libBtn = document.getElementById('lib-btn');
    if (libBtn !== null) {
        libBtn.addEventListener('click', () => {
            location.href = './index.html';
        });
    }
}

goToNewBookPage();
goToLibraryPage();

// save form data on submission
function submitButtonClicked() {
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn !== null) {
        submitBtn.addEventListener('click', () => {
            const title = getNewBookInfo('title');
            const author = getNewBookInfo('author');
            const numPages = getNewBookInfo('num-pages');
            const haveRead = getNewBookInfo('have-read');
            
            const newBook = new Book(title, author, numPages, haveRead);
            localStorage.setItem('count', +localStorage.getItem('count') + +1);
            localStorage.setItem(localStorage.getItem('count'), JSON.stringify(newBook));
        });
    }
}

function getNewBookInfo(elementId) {
    const element = document.getElementById(elementId);
    if (element.type === 'checkbox' && element.checked === true) {
        return 'Yes';
    } else if (element.type === 'checkbox' && element.checked === false) {
        return 'Not yet';
    }
    return element.value;
}

submitButtonClicked();

function addNewBookToLibrary() {
    for (let i = 1; i <= localStorage.getItem('count'); i++) {
        let newBook = localStorage.getItem(i);
        console.log(newBook);
        newBook = JSON.parse(newBook);
        myLibrary.push(newBook);
    }
}

addNewBookToLibrary();
console.log(myLibrary);

// Convert book data from myLibrary array into cards

const bookCardContainer = document.getElementById('book-card-container');
let cardCount = 1;

myLibrary.forEach(book => {
    let bookCard = createBookCard(cardCount);
    cardCount++;
    for (const key in book) {
        if (key === 'title') {
            createRow('Title', book[key], bookCard, 'title-text');
        }
        if (key === 'author') {
            createRow('Author', book[key], bookCard, 'author-text');
        }
        if (key === 'numPages') {
            createRow('No. Pages', book[key], bookCard, 'num-pages-text');
        }
        if (key === 'haveRead') {
            createRow('Completed', book[key], bookCard, 'have-read-text');
        }
    }
});

function createBookCard(cardCount) {
    if (bookCardContainer !== null) {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('id', cardCount);

        const btnDiv = createButtonDiv();
        bookCard.appendChild(btnDiv);

        const removeBtn = createRemoveButton();
        removeBtn.setAttribute('id', `remove-btn-${cardCount}`);
        btnDiv.appendChild(removeBtn);

        let card = localStorage.getItem(cardCount);
        card = JSON.parse(card);
        if (card.haveRead !== 'Yes') {
            const haveReadCheckBox = createHaveReadCheckBox();
            haveReadCheckBox.setAttribute('id', `read-checkbox-${cardCount}`)
            const haveReadLabel = createHaveReadLabel();
            btnDiv.appendChild(haveReadCheckBox);
            btnDiv.appendChild(haveReadLabel);
        }

        bookCardContainer.appendChild(bookCard);
        return bookCard;
    }
}

function createRow(rowTitle, cellText, bookCard, className) {
    if (bookCardContainer !== null) {
        const rowTitleElement = document.createElement('p');
        const rowTitleText = document.createTextNode(rowTitle);
        rowTitleElement.appendChild(rowTitleText);
        bookCard.appendChild(rowTitleElement);
        
        const bookInfoElement = document.createElement('p');
        const bookInfoText = document.createTextNode(cellText);
        bookInfoElement.classList.add(className);
        bookInfoElement.appendChild(bookInfoText);
        bookCard.appendChild(bookInfoElement);
    }
}

function createButtonDiv() {
    const btnDiv = document.createElement('div');
    btnDiv.classList.add('btn-div');
    return btnDiv;
}

function createRemoveButton() {
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    return removeBtn;
}

function createHaveReadCheckBox() {
    const haveReadCheckBox = document.createElement('input')
    haveReadCheckBox.setAttribute('type', 'checkbox');
    haveReadCheckBox.classList.add('have-read-checkbox');
    return haveReadCheckBox;
}

function createHaveReadLabel() {
    const haveReadLabel = document.createElement('label')
    haveReadLabel.textContent = 'Finished reading?'
    return haveReadLabel;
}

function removeButtonClicked() {
    let removeBtns = Array.from(document.getElementsByClassName('remove-btn'));
    if (removeBtns.length > 0) {
        removeBtns.forEach(button => button.addEventListener('click', () => {
            const btnDiv = button.parentNode
            const bookCard = btnDiv.parentNode;
            const bookCardId = bookCard.id;
            localStorage.removeItem(bookCardId);
            bookCard.remove();
            cardCount -= 1;
            localStorage.setItem('count', localStorage.getItem('count') - 1);
        }));
    }
}

function haveReadChecked() {
    let haveReadBtns = Array.from(document.getElementsByClassName('have-read-checkbox'));
    if (haveReadBtns.length > 0) {
        haveReadBtns.forEach(checkbox => checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                const btnDiv = checkbox.parentNode;
                const bookCard = btnDiv.parentNode;
                const bookCardId = bookCard.id;
                const haveReadElement = Array.from(bookCard.getElementsByClassName('have-read-text'))[0];
                haveReadElement.textContent = 'Yes';

                let book = localStorage.getItem(bookCardId);
                book = JSON.parse(book);
                book.haveRead = 'Yes';
                localStorage.setItem(bookCardId, JSON.stringify(book));
            }
        }));
    }
}

removeButtonClicked();
haveReadChecked();
