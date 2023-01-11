// https://www.omdbapi.com/?i=tt3896198&apikey=28f05d61

const searchInput = document.querySelector('.search-input')
const searchBtn = document.querySelector('.search-btn')

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  getApi();
})

async function getApi() {
  const searchValue = searchInput.value
  console.log(searchValue)
  const res = await fetch(`https://www.omdbapi.com/?t=${searchValue}&apikey=28f05d61`)
  const data = await res.json()


  console.log(data)
}
