import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const API_KEY = '45141077-2f2085cf6ccd740accb993600';
const BASE_URL = 'https://pixabay.com/api/';
const searchForm = document.querySelector(`.search-form`);
const inputField = document.querySelector(`.input-field`);
const resultsGalleryList = document.querySelector(`.gallery-result-list`);
const queryWord = document.querySelector('.query-word');
const moreButton = document.querySelector('.more');
const topButton = document.querySelector('.top');

const createToggle = selector => ({
  enable: () => document.querySelector(selector).classList.remove('disabled'),
  disable: () => document.querySelector(selector).classList.add('disabled'),
});

const loader = createToggle('.spinner');
const loadText = createToggle('.loading-text');
const queryText = createToggle('.query-text');
const moreBtn = createToggle('.more');
const topBtn = createToggle('.top');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const request = inputField.value;
  currentPage = 1;
  fetchImages(request, currentPage);
  queryWord.textContent = inputField.value;
});

let page = 1;
let currentPage = 1;
let totalHits = 0;
let per_page = 30;

async function fetchImages(request, page = 1) {
  loader.enable();
  loadText.enable();
  if (page === 1) {
    resultsGalleryList.innerHTML = '';
  }
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: request,
        image_type: `photo`,
        orientation: `horizontal`,
        safesearch: `true`,
        page,
        per_page,
      },
    });
    const totalPages = Math.ceil(response.data.totalHits / per_page);
    if (response.data.hits) {
      totalHits = response.data.totalHits;
      displayImages(response.data.hits);
      loader.disable();
      loadText.disable();
      queryText.enable();

      currentPage = page;
    } else if (page > totalPages) {
      moreBtn.disable();
      topBtn.disable();
      loadText.disable;
      loader.disable();
      iziToast.warning({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      moreBtn.disable();
      topBtn.disable();
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
      });
    }
    return response.data;
  } catch (error) {
    loader.disable();
    loadText.disable();
    moreBtn.disable();
    topBtn.disable();
    console.error(error);
    iziToast.warning({
      title: 'Error',
      message: 'An error occurred while fetching images',
    });
    throw new Error(`Error! status: ${res.status}`);
  }
}

const message =
  'Sorry, there are no images matching your search query. Please try again!';

function displayImages(images, page) {
  if (page === 1) {
    resultsGalleryList.innerHTML = '';
  }
  if (totalHits > images.length) {
    moreBtn.enable();
    topBtn.enable();
  }
  if (images.length === 0) {
    loader.disable();
    loadText.disable();
    queryText.disable();
    moreBtn.disable();
    topBtn.disable();
    iziToast.warning({
      message: message,
      backgroundColor: '#ef4040',
      messageColor: `#fff`,
      position: 'topRight',
      timeout: 2000,
    });
    setTimeout(clearValue, 2000);

    return;
  }
  const imagesMarkup = images.map(makeImgItem).join('');
  resultsGalleryList.insertAdjacentHTML('beforeend', imagesMarkup);
  setTimeout(clearValue, 500);

  lightbox.refresh();
}

function clearValue() {
  inputField.value = '';
}

const lightbox = new SimpleLightbox('.gallery-result-list a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  close: true,
  className: 'simpleLightboxGallery',
  doubleTapZoom: 2,
  scrollZoom: true,
  overlay: true,
});

function makeImgItem({
  webformatURL,
  largeImageURL,
  tags,
  downloads,
  likes,
  comments,
  views,
}) {
  return `<li class="list-container">
    <div>
      <div class="image-container">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" />
        </a>
      </div>
      <div class="descr-element">
        <ul class="descr-list">
          <li>
            <h3>Likes</h3>
              <p>${likes}</p>
          </li>
          <li>
            <h3>Views</h3>
              <p>${views}</p>
          </li>
          <li>
            <h3>Comments</h3>
            <p>${comments}</p>
          </li>
          <li>
            <h3>Downloads</h3>
              <p>${downloads}</p>
          </li>
        </ul>
      </div>
    </div>
  </li>`;
}

moreButton.addEventListener('click', () => {
  const request = inputField.value;
  fetchImages(request, currentPage + 1);
});

let rect = resultsGalleryList.getBoundingClientRect();

topButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
