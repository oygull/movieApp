let movieList = document.getElementById('movieList');
let modalBody = document.getElementById('modalBody');
let modalInner = document.getElementById('modalInner');
let watchList = document.getElementById('watchList');
let dramaList = document.getElementById('dramaList');


for(let i=30; i<58 ;i++){
  function showCarts(el){
    let li = document.createElement('li');
    li.innerHTML= `
    <img class="card-img" src="${el[i].youtubePoster}" alt="movie-img">
    <div class="movie-desc">
    <div class="cart-header">
    <p class="card-text">${el[i].language},${el[i].year}</p>
    <p class="rating">${el[i].imdbRating}<i class='bx bxs-star' ></i></p>
    </div>
    <h4 class="movie-title">${el[i].title}</h4>
    <p class="categories">${el[i].categories}</p>
    <button type="button" data-toggle="modal" data-target="#exampleModalCenter" onclick="openModal(${el[i].imdbId})" class="btn-summary" >Watch summary</button>
    <button onclick="openWatchlist(${el[i].imdbId})" class="btn-like"><i class='bx bx-heart' ></i></button>
    </div>
    `
    li.classList= 'movies-cart'
    movieList.appendChild(li);
 
  }

  showCarts(movies);
}

function openModal(e){
 for(let i=30; i<60;i++){
   if(movies[i].imdbId==e){
     let a = movies[i];
     modalBody.innerHTML =`<p class="modal-text">${a.summary}</p>`
     modalInner.innerHTML = `
     <img class="modal-img" src="${a.youtubePoster}" alt="modal-img">
     <h3 class="m-title">${a.title}</h3>
      <div class="modal-rating">
      <p class="m-rating">${a.imdbRating}<i class='bx bxs-star'></i></p>
      <p class="m-date">${a.year}<i class='bx bxs-calendar' ></i></p>
      <p class="m-runtime">${a.runtime}<i class='bx bx-run' ></i></p>
      </div>
     `
   }
 }
}
let watchlistArr = [];
function openWatchlist(e){
  if (confirm("Do you want to add movie to watchlist?") ==  true) {
    for(let i=30; i<60;i++){
      if(movies[i].imdbId==e){
       let a = movies[i];
       watchlistArr.push(a)
       let list = document.createElement("li");
       list.innerHTML =`
       <img class="card-img" src="${a.youtubePoster}" alt="movie-img">
       <div class="movie-desc">
       <div class="cart-header">
       <p class="card-text">${a.language},${a.year}</p>
       <p class="rating">${a.imdbRating}<i class='bx bxs-star' ></i></p>
       </div>
       <h4 class="movie-title">${a.title}</h4>
       <p class="categories">${a.categories}</p>
       <button  onclick="removeItem(${a.imdbId})" class="btn-summary"> Remove from watchlist</button>
       </div>
       `
       console.log(watchlistArr);
      list.classList ='watchlist-cart';
      watchList.appendChild(list);
     }
   }  
  }
}
// let arrRemoved = [];
// function removeItem(e){
//   if (confirm("Do you want to remove movie from watchlist?") ==  true){
//     watchlistArr.forEach((item)=>{
//       if(item.imdbId!==e){
//         arrRemoved.push(item)
//       }
//     })
//   }
//   }

let dramaArr = movies.filter((item)=>{
  if(item.categories=="Drama") return true
})

function renderMovies(el){
  el.forEach((item)=>{
    let li = document.createElement('li');
    li.innerHTML= `
    <img class="card-img" src="${item.youtubePoster}" alt="movie-img">
    <div class="movie-desc">
    <div class="cart-header">
    <p class="card-text">${item.language},${item.year}</p>
    <p class="rating">${item.imdbRating}<i class='bx bxs-star' ></i></p>
    </div>
    <h4 class="movie-title">${item.title}</h4>
    <p class="categories">${item.categories}</p>
    <button type="button" data-toggle="modal" data-target="#exampleModalCenter" onclick="openModal(${item.imdbId})" class="btn-summary" >Watch summary</button>
    <button onclick="openWatchlist(${item.imdbId})" class="btn-like"><i class='bx bx-heart' ></i></button>
    </div>
    `
    li.classList= 'drama-cart'

    dramaList.appendChild(li);
  })
}

renderMovies(dramaArr)