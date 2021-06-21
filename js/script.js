const API_KEY  = '8c8e1a50-6322-4135-8875-5d40a5420d86';
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type" : "application/json",
            "X-API-KEY": API_KEY
        },
    })
    const respData = await resp.json();
    showMovies(respData);
}

getMovies(API_URL_POPULAR);

function showMovies(data) {
    const moviesEI = document.querySelector('.movies');

    document.querySelector('.movies').innerHTML = "";
    // console.log(moviesEI);
    data.films.forEach(movie => {
        const movieEI = document.createElement('div');
        movieEI.classList.add('movie');
        movieEI.innerHTML = `
        <div class="movie__cover-inner">
            <img src="${movie.posterUrl}" alt="${movie.nameEn}" class="movier-cover">
            <div class = "movie__cover-darkened"></div>
        </div>
        <div class="movie__info">
            <div class="movie__title">${movie.nameRu}</div>
            <div class="movie__category">${movie.genres.map(genre => genre.genre)}</div>
            <div class="movie__average movie__average-${getClassByRate(movie.rating)}">${movie.rating}</div>
        </div>
        `;
        moviesEI.appendChild(movieEI);

    })

}

function getClassByRate(rate) {
    if(rate>= 7) return "green";
    else if(rate > 5) return "orange";
    else return "red";
}

const form = document.querySelector('form');
const search = document.querySelector('.header__search');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
    if(search.value) {
        getMovies(apiSearchUrl);
        search.value = "";
    }
})