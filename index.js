// https://www.omdbapi.com/?i=tt3896198&apikey=28f05d61

const searchInput = document.querySelector('.search-input')
const searchBtn = document.querySelector('.search-btn')
const movieContainer = document.querySelector('.movie-container')

// initialize watchList to save movies to and interact with local storage for later rendering
let watchList = [];

/* event listeners; since using script for both html pages, pathname is included to avoid errors
if better solution arises, fix! */

if(window.location.pathname != '/watchlist.html') {
  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    getMovies();
  })
}

document.addEventListener('click', (e) => {
    if (e.target.id === 'add-movie-btn' && !watchList.includes(e.target.dataset.imdbid)) {
        watchList.push(e.target.dataset.imdbid)
        localStorage.setItem('id', watchList)
    } else if (e.target.id === 'remove-movie-btn') {
        let index = watchList.indexOf(e.target.dataset.imdbid);
        watchList.splice(index, 1)
        localStorage.setItem('id', watchList)
        render();
    } else if (e.target.id === 'add-movies-btn') {
        window.location.href="index.html";
    }
})

// function to fetch movies from omdb api

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
    })
  }
}

// function to display pages with or without movies

function render() {
        // if statement for watchlist when no movies are saved to local storage
    if (window.location.pathname == '/watchlist.html' && window.localStorage.length == 0) {
        movieContainer.innerHTML = 
        ` <div class="explore-div">
            <p class="start-exploring">Your watchlist is looking a little empty...</p>
            <button id="add-movies-btn"><i class="fa-solid fa-circle-plus"></i>Let's add some movies</button>
        </div>
        ` 

        // if statement specifically for watchlist so that saved items from local storage get displayed
    } else if (window.location.pathname == '/watchlist.html' && window.localStorage.length > 0) {
        let storageStr = localStorage.getItem('id')
        let storageArr = storageStr.split(',')
        watchList = storageArr
        movieContainer.innerHTML = ''
        
        if (watchList.length != 0 && watchList[0] != '') {
          watchList.forEach(id => {
              fetch(`https://www.omdbapi.com/?i=${id}&apikey=28f05d61`)
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
                      <button data-imdbid="${data.imdbID}" id="remove-movie-btn"><i class="fa-solid fa-circle-minus"></i>Remove</button>
                      </div>
                      <p class="movie-synopsis">${data.Plot}</p>
                  </div>
                  </div>
                  <hr>
                  `
              })  
          })
          // if all movies removed from local storage, clear storage and render again
        } else {
          localStorage.clear()
          render();
        }
        // for index.html
    } else {
        movieContainer.innerHTML = 
        ` <div class="explore-div">
            <i class="fa-solid fa-film fa-3x"></i>
            <p class="start-exploring">Start exploring</p>
            </div>
        ` 
    }
}

render();
