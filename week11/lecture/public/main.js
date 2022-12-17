import { logger } from './test.js';

// logger('23123213');

const userList = document.getElementById('user-list');
const userIndexInput = document.getElementById('user-index-input');
const userNameInput = document.getElementById('user-name-input');
const addUserButton = document.getElementById('add-user-button');

const userIndexInput2 = document.getElementById('user-index-input-2');
const userNameInput2 = document.getElementById('user-name-input-2');
const addUserButton2 = document.getElementById('add-user-button-2');
const userForm = document.getElementById('user-form');

userForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // e.stopPropagation();
  // e.stopImmediatePropagation();

  const username = userNameInput2.value;
  if (!username) {
    alert('Name is required');
    return;
  }
  userNameInput2.value = '';
  const index = userIndexInput2.value || undefined;

  fetch('/user', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ index, username })
  }).then(res => res.ok ? res.json() : Promise.reject(new Error(res.statusText)))
    .then(users => {
      userList.innerHTML = '';
      users.forEach(function (user, index) {
        const li = document.createElement('li');
        li.setAttribute('data-index', index);
        li.classList.add('user-list-item');
        li.innerHTML = user;
        userList.appendChild(li);
      });
    })
    .catch(err => {
      console.error(err);
    });

});


function userListClickHandler(e) {
  const target = e.target;
  if (target.tagName !== 'LI') { return; }
  const index = target.getAttribute('data-index');
  const text = target.textContent.trim();
  if (!index || !text) {
    alert('Missing name or index');
    return;
  }
  userIndexInput.value = index;
  userNameInput.value = text;
  addUserButton.textContent = 'Edit user';
}

userList.addEventListener('click', userListClickHandler);
// userList.removeEventListener('click', userListClickHandler);

// addUserButton.addEventListener('click', () => {
//   const userName = userNameInput.value;
//   if (!userName.length) {
//     alert('User name is required!');
//     return;
//   }
//   userNameInput.value = '';

//   const newLi = document.createElement('li');
//   const textNode = document.createTextNode(userName);
//   newLi.appendChild(textNode);
//   userList.appendChild(newLi);
//   //newLi.innerHTML = userName;
// });
