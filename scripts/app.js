// Amardeep Mann
// 2-16-23
// Doing Stuff With Data
// We imported some data and display it as a sortable table equipped with pagination for easy traversal

let dirCont = document.getElementById('dirCont');
let dirTable = document.getElementById('dirTable');
let firstNameLink = document.getElementById('firstNameLink');
let lastNameLink = document.getElementById('lastNameLink');
let topRow = document.getElementById('topRow');
let pageSizeInp = document.getElementById('pageSizeInp');
let prevBtn = document.getElementById('prevBtn');
let nextBtn = document.getElementById('nextBtn');
let prevLink = document.getElementById('prevBtn');
let nextLink = document.getElementById('nextBtn');

console.log(firstNameLink);

let data;
let orderedList;

let pageSize = parseInt(pageSizeInp.value);
let curPage = 1;
let maxPages;

async function getData() {
    const response = await fetch('./data/data.json');
    data = await response.json();
    // console.log(data);
}


function orderBy(property) {
    let people = data.People;
    if (typeof people[0][property] === 'number') {
        // console.log('Is Number');
        orderedList = people.slice(0).sort( (person1, person2) => person1[property] - person2[property] );
    } else {
        orderedList = people.slice(0).sort( (person1, person2) => person1[property].toString().toLowerCase().localeCompare(person2[property].toString().toLowerCase()) );
    }
    // console.log(orderedList);
    populateList(orderedList);
}

function populateList(list) {
    dirTable.innerHTML = '';
    dirTable.append(topRow);
    for (let i = 0; i < list.length; i++) {
        let person = list[i];
        let tr = document.createElement('tr');
        let tdFirstName = document.createElement('td');
        tdFirstName.textContent = person.FirstName;
        let tdID = document.createElement('td');
        tdID.textContent = person.Id;
        let tdLastName = document.createElement('td');
        tdLastName.textContent = person.LastName;
        let tdHeight = document.createElement('td');
        tdHeight.textContent = person.Height;
        let tdEmail = document.createElement('td');
        tdEmail.textContent = person.Email;
        tr.append(tdID, tdFirstName, tdLastName, tdEmail, tdHeight);
        dirTable.append(tr);
    }
}

function clickNext() {
    if (curPage < maxPages) {
        curPage++;
        prevBtn.classList.remove('disabled');
        if (curPage === maxPages) {
            nextBtn.classList.add('disabled');
        }
    }
    console.log(curPage);
}

function clickPrev() {
    if (curPage > 1) {
        curPage--;
        nextBtn.classList.remove('disabled');
        if (curPage === 1) {
            prevBtn.classList.add('disabled');
        }
    }
    console.log(curPage);
}

idLink.addEventListener('click', function() {
    orderBy('Id');
});

firstNameLink.addEventListener('click', function() {
    orderBy('FirstName');
});

lastNameLink.addEventListener('click', function() {
    orderBy('LastName');
});

emailLink.addEventListener('click', function() {
    orderBy('Email');
});

heightLink.addEventListener('click', function() {
    orderBy('Height');
});

nextLink.addEventListener('click', function() {
    clickNext();
});

prevLink.addEventListener('click', function() {
    clickPrev();
});

// Call at page load
await getData();
maxPages = data.People.length / pageSize;
orderBy('FirstName');

console.log(pageSize, maxPages);