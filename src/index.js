import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

import { createMarkup } from './markup';

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('.input-field');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.btn-load-more');

const BASE_URL = 'https://pixabay.com/api';
const KEY = '33108059-d52855214b2d0e29937d759f2';

// const axiosFunc= axios.create(`${BASE_URL}`);

let query = '';
let simpleLightBox
let page = 1;

const perPage = 40;

async function getPics() {
  const { data } = await axios.get(BASE_URL, {
    params: {
      key: KEY,
      q: inputEl.value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: perPage,
      page,
    },
  });
  return data;
}

formEl.addEventListener('submit', onSubmitClick);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtn);

function onSubmitClick(event) {
  event.preventDefault();
  page = 1;

  if (inputEl.value.trim() === '') {
    Notiflix.Notify.failure('Please enter the search request');
    return;
  }

  getPics().then(data => {
    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      galleryEl.innerHTML = createMarkup(data.hits);
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
  });
}

function onLoadMoreBtn() {
  page += 1;

  getPics()
    .then(( data ) => {
      galleryEl.insertAdjacentHTML('beforeend', createMarkup(data.hits));
   
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();

      const totalPages = Math.ceil(data.totalHits / perPage);
      if (totalPages > perPage) {
        loadMoreBtnEl.classList.remove('is-hidden');
      } else {
        loadMoreBtnEl.classList.add('is-hidden');
      }
    })
    .catch(error => console.log(error));
}

function alertEndOfSearch() {
  Notiflix.Notify.failure(
    "We're sorry, but you've reached the end of search results."
  );
}
