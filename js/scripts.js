
let users = [];

//fetch
fetch('https://randomuser.me/api/?results=12&inc=name,location,email,dob,cell,picture')
  .then(response => response.json())
  .then(data => data.results)
  .then(results => {
    results.forEach(result => {
      users.push(result);
      generateMiniCards(users);
      let cards = document.getElementsByClassName('card');
      addClickEvent(cards);
    });
  });

//function that creates mini-cards
function generateMiniCards(users) {
  const gallery = document.getElementById('gallery');
  let galleryHtml = "";
  users.forEach(user => {
    const name = `${user.name.first} ${user.name.last}`;
    const img = user.picture.large;
    const email = user.email;
    const city = user.location.city;

    let cardHtml = `<div class="card">`;
    cardHtml += `<div class="card-img-container">`;
    cardHtml += `<img class="card-img" src="${img}" alt="profile picture">`;
    cardHtml += `</div>`;
    cardHtml += `<div class="card-info-container">`;
    cardHtml += `<h3 id="name" class="card-name cap">${name}</h3>`;
    cardHtml += `<p class="card-text">${email}</p>`;
    cardHtml += `<p class="card-text cap">${city}</p>`;
    cardHtml += `</div>`;
    cardHtml += `</div>`;
    galleryHtml += cardHtml;
  });
  gallery.innerHTML = galleryHtml;
}
//adding event listeners to cards once they've been generated
function addClickEvent(cards) {
  for(let i = 0; i < cards.length; i++){
    cards[i].addEventListener('click', () => {
      generateModalCard(i);
    });
  }
}
//creating modal view
function generateModalCard(userIndex) {
  //setup
  const body = document.getElementsByTagName('body')[0];
  const modalUser = users[userIndex];
  const name = `${modalUser.name.first} ${modalUser.name.last}`;
  const img = modalUser.picture.large;
  const email = modalUser.email;
  const city = modalUser.location.city;
  const cell = modalUser.cell;
  const address = `${capitalize(modalUser.location.street)}, ${capitalize(modalUser.location.city)}, ${capitalize(modalUser.location.state)} ${modalUser.location.postcode}`;
  const birthday = modalUser.dob.date.substr(0, 10);
  //create modal view
  let modalDiv = document.createElement('div');
  modalDiv.className = "modal-container";
  let modalHtml = `<div class="modal">`;
  modalHtml += `<button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>`;
  modalHtml += `<div class="modal-info-container">`;
  modalHtml += `<img class="modal-img" src="${img}" alt="profile picture">`;
  modalHtml += `<h3 id="name" class="modal-name cap">${name}</h3>`;
  modalHtml += `<p class="modal-text">${email}</p>`;
  modalHtml += `<p class="modal-text cap">${city}</p>`;
  modalHtml += `<hr>`;
  modalHtml += `<p class="modal-text">${cell}</p>`;
  modalHtml += `<p class="modal-text">${address}</p>`;
  modalHtml += `<p class="modal-text">Birthday: ${birthday}</p>`;
  modalHtml += `</div>`;
  modalHtml += `</div>`;
  //display
  modalDiv.innerHTML = modalHtml;
  body.appendChild(modalDiv);
  //add the ability to close the modal view and go back to main view
  let close = document.getElementsByClassName('modal-close-btn')[0];
  close.addEventListener('click', () => {
    body.removeChild(modalDiv);
  })

}
//helper function to capitalize words since api request seems to return everything in lowercase letters
function capitalize(string) {
  let words = string.split(" ");
  for(let i = 0; i < words.length; i++){
    words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
}
