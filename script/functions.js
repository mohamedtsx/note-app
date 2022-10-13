
function setTodoList () {localStorage.setItem('todoList', JSON.stringify(todoList))};

function addTask () {
    if (addTaskInput.value !== '') {
        isNew = true;
        appendTodo({
            itemText: addTaskInput.value,
            isComplete: false,
            isImportante: false
        });
        addTaskInput.value = '';
        incompleteMessage();
    }
}

function hideCompleted () {
    todoListContianer.innerHTML = '';

    if (hideCheckbox.checked) {
        const incompleteFilter = todoList.filter(object => !object.isComplete);
        incompleteFilter.forEach (item => appendTodo(item));
    } else {
        todoList.forEach(item => appendTodo(item));
    }
    
    incompleteMessage();
}


function incompleteMessage () {
    let total = '';
    incompleteCounter ? total = `${incompleteCounter}` : total = 'no';
    document.getElementById('incompleteCounter').textContent = total;
}

function searchFilterFunc(e) {
    todoListContianer.innerHTML = '';
    const searchFilter = todoList.filter((object)=> {
        let isIt = object.itemText.toLowerCase().includes(e.target.value.toLowerCase());
        return hideCheckbox.checked ? isIt && !object.isComplete : isIt;
    });
    searchFilter.forEach (item => appendTodo(item));
    incompleteMessage();
}


function appendTodo (listItem) {
    const newElement = document.createElement('div');
    newElement.setAttribute('class', 'todo-list_item');

    
    const elementLable = document.createElement('label');
    elementLable.setAttribute('class', 'item-label');
    
    const elementCheckbox = document.createElement('input');
    elementCheckbox.setAttribute('type', 'checkbox');
    listItem.isComplete ? elementCheckbox.checked = true : null;


    elementCheckbox.addEventListener('change', (e) => {
         if (e.target.checked) {
            todoList.find(object => object.itemText === listItem.itemText).isComplete = true;
            incompleteCounter--;
        } else {
            todoList.find(object => object.itemText === listItem.itemText).isComplete = false;
            incompleteCounter++;
        }
        setTodoList()
        hideCompleted();
    });
    
    const labelText = document.createElement('span');
    labelText.textContent = listItem.itemText;

    const starIcon = document.createElement('i');
    if(listItem.isImportante) {
        starIcon.setAttribute('class', 'item-star ph-star-fill');
        starIcon.style.color = 'var(--strong-blue)';
    } else {
        starIcon.setAttribute('class', 'item-star ph-star-thin');        
    }

    starIcon.addEventListener('click', (e) => {
            if (e.target.classList.contains('ph-star-thin')) {
                e.target.classList.replace('ph-star-thin', 'ph-star-fill');
                e.target.style.color = 'var(--strong-blue)';

                todoList.find( (object) => {
                    return object.itemText === listItem.itemText;
                }).isImportante = true;
            } else {
                e.target.classList.replace('ph-star-fill', 'ph-star-thin');
                e.target.style.color = 'black';

                todoList.find( (object) => {
                    return object.itemText === listItem.itemText;
                }).isImportante = false;
           }
           setTodoList();
           hideCompleted();
    });
//
//
//
    starIcon.addEventListener('long-press', (e) => {
        console.log(e)
        // try to remvoe the item when long tuch
    })

    elementLable.appendChild(elementCheckbox);
    elementLable.appendChild(labelText);
    
    newElement.appendChild(elementLable);
    newElement.appendChild(starIcon);
    todoListContianer.appendChild(newElement);


    if (isNew) {
        todoList.push({
            itemText: listItem.itemText,
            isComplete: listItem.isComplete,
            isImportante: listItem.isImportante
        });
        incompleteCounter++;
        setTodoList()
        isNew = false;
    }
}
