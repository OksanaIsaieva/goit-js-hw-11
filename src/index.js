import axios from "axios";
import Notiflix from "notiflix";

import "./index.css";

const apiKey = '38575172-0ee5a5f667a00ab2631f015bb';

const searchForm = document.querySelector('form#search-form');
const searchQuery = document.querySelector('form input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

let page = 1;
const perPage = 100;

loadMore.style.display = 'none';

const search = async (phrase) => {
    const response = await fetch("https://pixabay.com/api/?key="+apiKey+"&q="+phrase+"&image_type=photo&orientation=horizontal&safesearch=true&per_page="+perPage+"&page="+page);
    return await response.json();
};

const processData = async () => {

    loadMore.style.display = 'none';

    const data = await search(searchQuery.value.trim(), 1);
    console.log(data);
    
        if (typeof data.hits == 'undefined' || data.hits.length == 0) {
            Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
            return false;
        }
    
        data.hits.forEach((item) => {
            gallery.insertAdjacentHTML('beforeend', '<div class="photo-card">' +
        '<img src="'+item.webformatURL+'" alt="'+item.tags+'" loading="lazy" />' +
        '<div class="info">' +
        '<p class="info-item"><b>Likes</b>'+item.likes+'</p>' +
          '<p class="info-item"><b>Views</b>'+item.views+'</b></p>' + 
          '<p class="info-item"><b>Comments</b>'+item.comments+'</b></p>' + 
          '<p class="info-item"><b>Downloads</b>'+item.downloads+'</p>' +
        '</div></div>');
        });

    if (page >= Math.floor(data.totalHits / perPage)) {
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    }
    else {
        loadMore.style.display = 'block';
    }
};

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    gallery.innerHTML = '';

    // If a search starts
    page = 1;

    await processData();
});

loadMore.addEventListener('click', async (e) => {
    e.preventDefault();

    page += 1;

    await processData();
});