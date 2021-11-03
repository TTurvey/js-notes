// const notes = require('./getPostContents')
// console.log(getPostContents());

const fetchNote = () => {
  return fetch('http://localhost:3000/notes').then(response => {
    return response.json();
  })
}

fetchNote().then(data => {
  document.querySelector('p').innerText = data.notes;
})
