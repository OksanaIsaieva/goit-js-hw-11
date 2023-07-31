import axios from "axios";
import Notiflix from "notiflix";

const apiKey = '38575172-0ee5a5f667a00ab2631f015bb';

const searchForm = document.querySelector('form#search-form');
const searchQuery = document.querySelector('form input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

let page = 1;

loadMore.style.display = 'none';

const search = async (phrase) => {
    const response = await fetch("https://pixabay.com/api/?key="+apiKey+"&q="+phrase+"&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page="+page);
    return await response.json();
};

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    gallery.innerHTML = '';

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
    '<p class="info-item"><b>Likes: '+item.likes+'</b></p>' +
      '<p class="info-item"><b>Views: '+item.views+'</b></p>' + 
      '<p class="info-item"><b>Comments: '+item.comments+'</b></p>' + 
      '<p class="info-item"><b>Downloads: '+item.downloads+'</b></p>' +
    '</div></div>');
    });

    // TODO: check total amount
    loadMore.style.display = 'block';
});