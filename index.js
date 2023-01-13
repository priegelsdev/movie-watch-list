// https://www.omdbapi.com/?i=tt3896198&apikey=28f05d61

const searchInput = document.querySelector('.search-input')
const searchBtn = document.querySelector('.search-btn')
const movieContainer = document.querySelector('.movie-container')

let watchList = [];

if(window.location.pathname == '/index.html') {
  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getMovies();
  })
}

document.addEventListener('click', (e) => {
    if (e.target.id === 'add-movie-btn') {
        watchList.push(e.target.dataset.imdbid)
    }
})

async function getMovies() {
  const searchValue = searchInput.value
  const res = await fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=28f05d61`)
  const data = await res.json()

  movieContainer.innerHTML = '';
  
  if(data.Response === 'False') {
    movieContainer.innerHTML = `
      <div class="error-div">
        <p class="start-exploring">Unable to find what you're looking for. Please try another search.</p>
      </div>
    `
  } else {
    data.Search.forEach(movie => {

      fetch(`https://www.omdbapi.com/?t=${movie.Title}&apikey=28f05d61`)
        .then(res => res.json())
        .then(data => { movieContainer.innerHTML += `
        <div class="movie-card">
          <img class="movie-poster" src="${data.Poster}">
          <div class="movie-info-container">
            <div class="movie-title-container">
              <h2 class="movie-title">${data.Title}</h2>
              <p class="movie-rating"><i class="fa-solid fa-star"></i>${data.imdbRating}</p>
            </div>
            <div class="movie-details-container">
              <p class="movie-runtime">${data.Runtime}</p>
              <p class="movie-genres">${data.Genre}</p>
              <button data-imdbid="${data.imdbID}" id="add-movie-btn"><i class="fa-solid fa-circle-plus"></i>Watchlist</button>
            </div>
            <p class="movie-synopsis">${data.Plot}</p>
          </div>
        </div>
        <hr>
      `}  
      )
      console.log(movie)
    })
  }
}

// function to add movie to watch list involving imdbID; save to array; 

function render() {
  if(window.location.pathname == '/index.html') {
    movieContainer.innerHTML = 
    ` <div class="explore-div">
        <i class="fa-solid fa-film fa-3x"></i>
        <p class="start-exploring">Start exploring</p>
      </div>
    ` 
  } else if (window.location.pathname == '/watchlist.html' /* && watchlist empty */) {
    movieContainer.innerHTML = 
    ` <div class="explore-div">
        <p class="start-exploring">Your watchlist is looking a little empty...</p>
        <button class="add-movie-btn watchlist"><i class="fa-solid fa-circle-plus"></i>Let's add some movies</button>
      </div>
    ` 
  }
}

render();
