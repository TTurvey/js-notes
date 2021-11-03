// const notes = require('./getPostContents')
// console.log(getPostContents());

const fetchNote = () => {
  return fetch('http://localhost:3000/notes').then(response => {
    return response.json();
  })
}

fetchNote().then(data => {
  document.querySelector('#note-title').innerText = data[0].title;
  document.querySelector('#note-content').innerText = data[0].content;
})
