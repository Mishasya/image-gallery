let gallery = document.querySelector('.gallery');
const input = document.querySelector('.input');
let headerBtnInner = document.querySelector('.header__inner');
input.value = 'corgi';

const createImage = (elem) => {
  const contentInner = document.createElement('div');
  const img = document.createElement('img');
  const span = document.createElement('span');
  contentInner.classList.add('gallery__content-inner');
  span.textContent = 'Кликни на фото - откроется в новой вкладке :)';
  span.classList.add('gallery__tooltip');
  img.classList.add('gallery__img')
  img.src = `${elem.urls.regular}`;
  img.alt = `image`;
  img.addEventListener('click', () => {
    window.open(elem.links.download, '_blank')
  });
  gallery.append(contentInner);
  contentInner.append(img);
  contentInner.append(span);
}
// сделать p в html
const createMessage = () => {
  const text = document.createElement('p');
  text.classList.add('text');
  text.textContent = "Sorry, try looking for something else :)";
  gallery.append(text);
}

const deleteImages = () => {
  gallery.innerHTML = '';
}

const getData = async () => {
  let url = `https://api.unsplash.com/search/photos/?query=${input.value}&per_page=36&orientation=landscape&client_id=x2gfOZJs5mcPItQ5zZ2k4GNouSuQu1SvjEMC3Jg8fWU`;
  try {
    let response = await fetch(url);
    let data = await response.json();
    let a = data.results;
    if(!a.length) {
      createMessage();
    }
    a.map((el) => {
      return createImage(el)
    })
  } catch(err) {
    console.log(`Ошибка ${err}`);
  }
}
getData();

headerBtnInner.addEventListener('submit', (evt) => {
  evt.preventDefault();
  deleteImages();
  getData();
});
