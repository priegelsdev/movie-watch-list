// https://www.omdbapi.com/?i=tt3896198&apikey=28f05d61

const searchInput = document.querySelector('.search-input')
const searchBtn = document.querySelector('.search-btn')
const movieContainer = document.querySelector('.movie-container')

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  getMovies();
})

async function getMovies() {
  const searchValue = searchInput.value
  const res = await fetch(`https://www.omdbapi.com/?t=${searchValue}&apikey=28f05d61`)
  const data = await res.json()

  movieContainer.innerHTML = `
    <div class="movie-card">
      <img class="movie-poster" src="${data.Poster}">
      <div class="movie-info-container">
        <div class="movie-title-container">
          <h2 class="movie-title">${data.Title}</h2>
          <p class="movie-rating">${data.imdbRating}</p>
        </div>
        <div class="movie-details-container">
          <p class="movie-runtime">${data.Runtime}</p>
          <p class="movie-genres">${data.Genre}</p>
          <button class="add-movie-btn"><i class="fa-solid fa-circle-plus"></i>Watchlist</button>
        </div>
        <p class="movie-synopsis">${data.Plot}</p>
      </div>
    </div>
  `
  console.log(data)
}

function renderMovies() {
  

  
}