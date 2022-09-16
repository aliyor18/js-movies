let list = document.querySelector(".list");
let elForm = document.querySelector(".js-form");
let elInput = document.querySelector(".form-control");
let elSelect = document.querySelector(".select-all");
let elRetingSelect = document.querySelector(".select-renting");
let elRestingControl = document.querySelector(".control-reting");
let elBtn = document.querySelector(".js-search-btn");
let elModalTitle = document.querySelector(".title_modal");
let elModalText = document.querySelector(".text-modal");

function rendrItem(movies1) {
    list.innerHTML = ""

  movies1.slice(0, 200).forEach(movie => {
    let elItem = document.createElement("li");
    elItem.className = "card__item rounded border col-3 m-3 p-0";
    elItem.setAttribute("data-imdb-id", `${movie.imdb_id}`);
  
    let elTitle = document.createElement("h2");
    elTitle.classList = "h4, my-3";
    elTitle.textContent = movie.Title.toString().slice(0,17) + "...";
  
    let elFullTitle = document.createElement("h2");
    elFullTitle.className = "h5";
    elFullTitle.textContent = movie.fulltitle.slice(0,25) + "...";

    let elImdb = document.createElement("p");
    elImdb.className = "h6";
    elImdb.textContent = `Reytingi: ${movie.imdb_rating}`; 
  
    let elImg = document.createElement("img");
    elImg.width = "329";
    elImg.height = "290";
    elImg.className = "rounded"
    elImg.src = `http://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`;
    
  
    let elPokemon = document.createElement("p");
    elPokemon.className = "fw-bold";


    let elModalBtn = document.createElement("button");
    elModalBtn.classList = "btn btn-primary js-btn mb-4";
    elModalBtn.textContent = "Modal";
    elModalBtn.setAttribute("data-bs-toggle", "modal");
    elModalBtn.setAttribute("data-bs-target", "#exampleModal");
    
  
  
    elItem.append(elImg, elTitle, elFullTitle,elPokemon,elImdb,elModalBtn);
    list.appendChild(elItem);
  })
}

rendrItem(movies)

let sel  = [];

movies.forEach(movie => {
  let categories = movie.Categories.split("|")
  categories.forEach(categori => {
    if(!sel.includes(categori)){
      sel.push(categori)
    }
  })
}) 

sel.forEach(option => {
  elSelect.innerHTML += `
      <option value = "${option}">${option}</option>
  `
})

function sorted (filterArr, type) {
  if(type == "az") {
    filterArr.sort((a,b) => a.Title.localeCompare(b.Title))
    rendrItem(filterArr)
  } else if(type == "za") {
    filterArr.sort((a,b) => b.Title.localeCompare(a.Title))
    rendrItem(filterArr)
  } else if(type == "ratingTop") {
    filterArr.sort((a,b) => b.imdb_rating - a.imdb_rating)
    rendrItem(filterArr)
  } else if(type == "ratingBottom") {
    filterArr.sort((a,b) => a.imdb_rating - b.imdb_rating)
    rendrItem(filterArr)
  }
}


elForm.addEventListener("submit", evt => {
  evt.preventDefault();

  let titleValue = elInput.value.trim()
  let regex = new RegExp(titleValue, "gi")
  let filteredMovies = movies.filter(movie => {

    let categori = movie.Categories.includes(elSelect.value) || ( elSelect.value == "All")

    return movie.Title.toString().match(regex) && categori && movie.imdb_rating >= elRestingControl.value
  })

  let selectValue = elRetingSelect.value
  console.log(filteredMovies);
  sorted(filteredMovies, selectValue)
})



list.addEventListener("click", (evt) => {
  if (evt.target.matches(".js-btn")) {
    let movieImdbId = evt.target.closest(".card__item").dataset.imdbId;

    let foundMovie = movies.find((movie) => {
      return movie.imdb_id === movieImdbId;
    })

    elModalTitle.textContent = foundMovie.Title;
    elModalText.textContent = foundMovie.summary;

  }
})