'use strict'
// Todo Actions 
const todoListContianer = document.getElementById('todoListContainer');
const addTaskInput = document.getElementById('addTaskInput');

const todoList =[];
let incompleteCounter = 0;
let isNew = false;

if (localStorage.getItem('todoList')) {
    let getTodoList = JSON.parse(localStorage.getItem('todoList'));

    getTodoList.forEach( (object) => {
        isNew = true;
        appendTodo(object)
    });

    incompleteCounter = getTodoList.filter(object => !object.isComplete).length;
    incompleteMessage();
}

document.getElementById('addTask').addEventListener('click', () => addTask());
document.getElementById('submitDone').addEventListener('click', () => addTask());
addTaskInput.addEventListener('keypress', (e) => {if (e.key === 'Enter') addTask()});

document.getElementById('hideCompleted').addEventListener('change', () => {hideCompleted()});

document.getElementById('searchFilterInput').addEventListener('input', (e) => {searchFilterFunc(e)});

// Page Interactive
const search = document.querySelector('.nav_search');
const searchIcon = document.querySelector('.nav_search_icon');
const searchInput = document.querySelector('.nav_search_input');
const clearSearchInput = document.querySelector('.nav_search_clear');
const hideCheckbox = document.getElementById('hideCompleted');

const addNewInput = document.querySelector('.create_add-new_input');
const addNewInputIcon = document.querySelector('.add-new_icon-button');
const addNewTaskSubmit = document.querySelector('.create_submit-unit');
const submitDone = document.getElementById('submitDone');


searchIcon.addEventListener('click', () => {
    search.classList.toggle('active');
    if (!search.classList.contains('active')) {
        searchInput.value = '';
        clearSearchInput.style.visibility = 'hidden';
    }
});

searchInput.addEventListener('input', (e) => {
    if (e.target.value === '') {
        clearSearchInput.style.visibility = 'hidden';
    } else {
        clearSearchInput.style.visibility = 'visible';
    }
});

clearSearchInput.addEventListener('click', (e) => {
    searchInput.value = '';
    searchInput.focus()
    e.target.style.visibility = 'hidden';
});

addNewInputIcon.addEventListener('click', () => addNewInput.focus());
addNewInput.addEventListener('focus', () => addNewTaskSubmit.style.height = '4.4rem');
submitDone.addEventListener('click', () => addNewTaskSubmit.style.height = '0rem');







