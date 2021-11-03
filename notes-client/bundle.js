(() => {
  // index.js
  var fetchNote = () => {
    return fetch("http://localhost:3000/notes").then((response) => {
      return response.json();
    });
  };
  fetchNote().then((data) => {
    document.querySelector("#note").innerText = data.notes;
  });
})();
