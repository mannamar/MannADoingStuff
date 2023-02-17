// Amardeep Mann
// 2-16-23
// Doing Stuff With Data
// We imported some data and display it as a sortable table equipped with pagination for easy traversal

import { getData } from "./fetch.js"; 

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
let btnList = document.getElementById('btnList');

let data = await getData();
let orderedList;

let pageSize = parseInt(pageSizeInp.value);
let curPage = 1;
let maxPages;
let sortProp;
let isReversed = false;

// Separated this function to it's own script
// async function getData() {
//     const response = await fetch('./data/data.json');
//     data = await response.json();
//     // console.log(data);
// }


function orderBy(property) {
    let reverse = false;
    if (sortProp === property && !isReversed) {
        reverse = true;
        isReversed = true;
    } else {
        isReversed = false;
    }
    sortProp = property;
    let people = data.People;
    if (typeof people[0][property] === 'number') {
        // console.log('Is Number');
        orderedList = people.slice(0).sort( (person1, person2) => person1[property] - person2[property] );
    } else {
        orderedList = people.slice(0).sort( (person1, person2) => person1[property].toString().toLowerCase().localeCompare(person2[property].toString().toLowerCase()) );
    }
    // console.log(orderedList);
    if (reverse) {
        orderedList.reverse();
    }
    populateList(orderedList);
}

function populateList(list) {
    dirTable.innerHTML = '';
    dirTable.append(topRow);
    let start = (curPage - 1 ) * pageSize;
    let end = start + pageSize;
    if (end > orderedList.length) {
        end = orderedList.length;
    }
    for (let i = start; i < end; i++) {
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
        let tdAge = document.createElement('td');
        tdAge.textContent = person.Age;
        tr.append(tdID, tdFirstName, tdLastName, tdEmail, tdHeight, tdAge);
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
        populateList(orderedList);
        removeActive();
        document.getElementById(`page${curPage}Item`).classList.add('active');
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
        populateList(orderedList);
        removeActive();
        document.getElementById(`page${curPage}Item`).classList.add('active');
    }
    console.log(curPage);
}

idLink.addEventListener('click', function() {
    resetPage();
    orderBy('Id');
    removeClass('highlight', 'topRow');
    idLink.classList.add('highlight');
});

firstNameLink.addEventListener('click', function() {
    resetPage();
    orderBy('FirstName');
    removeClass('highlight', 'topRow');
    firstNameLink.classList.add('highlight');
});

lastNameLink.addEventListener('click', function() {
    resetPage();
    orderBy('LastName');
    removeClass('highlight', 'topRow');
    lastNameLink.classList.add('highlight');
});

emailLink.addEventListener('click', function() {
    resetPage();
    orderBy('Email');
    removeClass('highlight', 'topRow');
    emailLink.classList.add('highlight');
});

heightLink.addEventListener('click', function() {
    resetPage();
    orderBy('Height');
    removeClass('highlight', 'topRow');
    heightLink.classList.add('highlight');
});

ageLink.addEventListener('click', function() {
    resetPage();
    orderBy('Age');
    removeClass('highlight', 'topRow');
    ageLink.classList.add('highlight');
});

nextLink.addEventListener('click', function() {
    clickNext();
});

prevLink.addEventListener('click', function() {
    clickPrev();
});

pageSizeInp.addEventListener('change', function() {
    resetPage();
    createBtnList();
    populateList(orderedList);
});

function resetPage() {
    prevBtn.classList.add('disabled');
    nextBtn.classList.remove('disabled');
    curPage = 1;
    pageSize = parseInt(pageSizeInp.value);
    maxPages = Math.ceil(data.People.length / pageSize);
    console.log(pageSize, maxPages);
    removeActive();
    document.getElementById(`page1Item`).classList.add('active');
}

function createBtnList() {
    btnList.innerHTML = '';
    btnList.append(prevBtn);
    for (let i = curPage; i <= maxPages; i++) {
        let a = document.createElement('a');
        a.classList.add('page-link');
        a.textContent = i;
        a.href = '#';
        a.id = `page${i}Btn`;
        let li = document.createElement('li');
        li.classList.add('page-item');
        li.id = `page${i}Item`;
        li.addEventListener('click', function() {
            curPage = parseInt(li.textContent);
            // console.log(curPage);
            populateList(orderedList);
            disablePrevNext();
            // console.log(document.activeElement);
            removeActive();
            li.classList.add('active');
        });
        li.append(a);
        btnList.append(li);
    }
    btnList.append(nextBtn);
    document.getElementById(`page1Item`).classList.add('active');
}

function removeActive() {
    let listItems = document.querySelectorAll('.pagination *');
    // console.log(listItems);
    listItems.forEach( item => {item.classList.remove('active')});
}

function removeClass(className, parentID) {
    let listItems = document.querySelectorAll(`#${parentID} *`);
    console.log(listItems);
    listItems.forEach( item => {item.classList.remove(className)});
}

function disablePrevNext() {
    prevBtn.classList.remove('disabled');
    nextBtn.classList.remove('disabled');
    if (curPage === 1) {
        prevBtn.classList.add('disabled');
    }
    if (curPage === maxPages) {
        nextBtn.classList.add('disabled');
    }
}

// Call at page load
await getData();
maxPages = Math.ceil(data.People.length / pageSize);
createBtnList();
orderBy('Id');

// console.log(pageSize, maxPages);