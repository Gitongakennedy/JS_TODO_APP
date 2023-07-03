// variables
const form =document.querySelector('.form')
const submitBtn = document.querySelector('.submit-btn')
const alert = document.querySelector('.alert');
const formInput = document.getElementById('grocery');
const Container = document.querySelector('.tasks-container')
const listContainer = document.querySelector('.list-container')
const clearBtn = document.querySelector('.clear-btn')

// edit option 
let editElement;
let editFlag = false;
let editID = '';

// *************Event LIsteners ***********
form.addEventListener('submit',addItem);

// clear items;
clearBtn.addEventListener('click',clearList)
// display on initial load
window.addEventListener('DOMContentLoaded',setupApp)

// ********** Functions **********
// add item;
function addItem(e){
 e.preventDefault();
 let value = formInput.value;
 let id = new Date().getTime().toString();
 if(value && !editFlag){
const element = document.createElement('div')
element.classList.add('list-item');
let attr = document.createAttribute('data-id');
attr.value = id;
element.setAttributeNode(attr)
element.innerHTML =` <p class="title">${value}</p>
              <div class="btn-container">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash"></i></button>`
                const editBtn = element.querySelector('.edit')
                editBtn.addEventListener('click',editItem)
                const deleteBtn = element.querySelector('.delete')
                deleteBtn.addEventListener('click',deleteItem)
                listContainer.appendChild(element)
                Container.classList.add('show-container')
                // add to local storage
                addToLocalStorage(id,value);
                setBackToDefaults()
displayAlert('item add success','success')
 }
 else if(value && editFlag){
  editElement.innerHTML = value;
  displayAlert('change successful','success')
 // edit local storage
  editLocalStorage(editID,value)
  setBackToDefaults();
 }
 else{
  displayAlert('values cannot be empty','danger')
 }
}

// Alert
function displayAlert(text,action){
 alert.textContent = text;
 alert.classList.add(action)
 // remove alert
 setTimeout(() => {
  alert.textContent = ''
  alert.classList.remove(action)
 }, 2000);
}
// set back to default

function setBackToDefaults(){
 formInput.value = '';
 editFlag = false;
 editID = '';
 submitBtn.textContent = 'submit'
}

// edit item]

function editItem (e){
 const element = e.currentTarget.parentElement.parentElement;
editElement = e.currentTarget.parentElement.previousElementSibling
formInput.value = editElement.innerHTML;
editFlag = true;
editID = element.dataset.id;
submitBtn.textContent = 'edit';
}
// delete item
function deleteItem(e){
 const element = e.currentTarget.parentElement.parentElement;
 const id = element.dataset.id;
listContainer.removeChild(element)
if(listContainer.children.length === 0){
 Container.classList.remove('show-container')
}
// remove from local storage
removeFromLocalStorage(id)
displayAlert('item removed','danger')
}
// edit local storage
function editLocalStorage(id,value){
 let items = getLocalStorage();
 items = items.map((item)=>{
  if(item.id === id){
  item.value = value
  }
  return item;
 })
 localStorage.setItem('tasks',JSON.stringify(items))
}
// clear list
function clearList(){
 const items =document.querySelectorAll('.list-item')
 // console.log(items) nodelist forEach
 items.forEach((item)=>{
  if(items.length > 0){
   listContainer.removeChild(item)
  }
 });
 Container.classList.remove('show-container')
 displayAlert('empty list','danger')
 localStorage.removeItem('tasks')
}

// ************ LOCAL STORAGE ********
function removeFromLocalStorage(id){
 let items = getLocalStorage();
 items = items.filter((item)=>{
  if(item.id !== id)
  return item;
 })
 localStorage.setItem('tasks',JSON.stringify(items))
}

// add to local storage
function addToLocalStorage(id,value){
 const grocery ={id,value};
 let items = getLocalStorage();
 items.push(grocery);
 localStorage.setItem('tasks',JSON.stringify(items))
}

function getLocalStorage(){
 return localStorage.getItem('tasks')?JSON.parse(localStorage.getItem('tasks')):[];
}


// set up App
function setupApp(){
let items = getLocalStorage();
if(items.length > 0){
 items.forEach((item)=>{
  createList(item.id,item.value)
 })
}
 Container.classList.add('show-container')
}

function createList(id,value){
const element = document.createElement('div')
element.classList.add('list-item');
let attr = document.createAttribute('data-id');
attr.value = id;
element.setAttributeNode(attr)
element.innerHTML =` <p class="title">${value}</p>
              <div class="btn-container">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash"></i></button>`
                const editBtn = element.querySelector('.edit')
                editBtn.addEventListener('click',editItem)
                const deleteBtn = element.querySelector('.delete')
                deleteBtn.addEventListener('click',deleteItem)
                listContainer.appendChild(element)
               
}