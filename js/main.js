let movieList = document.getElementById('movieList');
let modalBody = document.getElementById('modalBody');
let modalInner = document.getElementById('modalInner');
let watchList = document.getElementById('watchList');
let dramaList = document.getElementById('dramaList');
let elSlidder = document.getElementById('slider');
let elSlidder2 = document.getElementById('slider2');
let elPagination = document.getElementById('pagination');
let nextPage = document.getElementById('nextPage');
let control = document.getElementById('pagination');

let currentPage = 1;
let rows = 32;




function showList(items,wrapper,rowsPerPage,page){
  wrapper.innerHTML='';
  page--;

  let start = rowsPerPage * page;
  let end = start + rowsPerPage;
  let peginatedItems = items.slice(start, end)
 
  for(let i=0; i<peginatedItems.length; i++){
    let item = peginatedItems[i];
    let li = document.createElement('li');
      li.innerHTML= ` <img class="card-img" src="${item.youtubePoster}" alt="movie-img">
        <div class="movie-desc">
        <div class="cart-header">
        <p class="card-text">${item.language},${item.year}</p>
        <p class="rating">${item.imdbRating}<i class='bx bxs-star' ></i></p>
        </div>
        <h4 class="movie-title">${item.title}</h4>
        <p class="categories">${item.categories}</p>
        <button type="button" data-toggle="modal" data-target="#exampleModalCenter" onclick="openModal(${item.imdbId})" class="btn-summary" >Watch summary</button>
        <button onclick="openWatchlist(${item.imdbId})"  class="btn-like"><i class='bx bx-heart' ></i></button>
        </div> `
    li.classList= 'movies-cart'
        movieList.appendChild(li);
    }

}

function setPage(items,wrapper, rowsPerPage){
  wrapper.innerHTML='';

  let pageCount = Math.ceil(items.length/rowsPerPage);

  for (let i=1; i<pageCount+1;i++){
    let btn = paginationButton(i);
     wrapper.appendChild(btn)
  }
}

function paginationButton(page){
  let button = document.createElement('button');
  button.innerText = page;

  if(currentPage==page){
    button.classList.add('active');
  }
  button.addEventListener('click', ()=>{
    button.classList.add('active');
    currentPage=page;
    showList(movies,movieList, rows, currentPage);

    let currentBtn = document.querySelector('button.active');
    currentBtn.classList.remove('active')
  })
  button.classList.add('page-btn');

  return button;
}

showList(movies,movieList, rows, currentPage);
setPage(movies,elPagination, rows )


function openModal(e){
 for(let i=0; i<movies.length;i++){
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

let watchlistArr =[];
function openWatchlist(e){
    for(let i=0; i<movies.length;i++){
      if(movies[i].imdbId==e){
        watchList.innerHTML='';
       let a = movies[i];
       watchlistArr.push(a)
       watchlistArr.forEach((item)=>{
        let list = document.createElement("li");
        list.innerHTML =`
        <img class="watchlist-img" src="${item.youtubePoster}" alt="movie-img">
        <div class="movie-desc">
        <div class="cart-header">
        <p class="card-text">${item.language},${item.year}</p>
        <p class="rating">${item.imdbRating}<i class='bx bxs-star' ></i></p>
        </div>
        <h4 class="movie-title">${item.title}</h4>
        <p class="categories">${item.categories}</p>
        <button  onclick="removeItem(${item.imdbId})" class="btn-summary"> Remove from watchlist</button>
        </div>
        `
 
       list.classList ='watchlist-cart';
       watchList.appendChild(list);
       })
    
     }
   }  
}
openWatchlist(movies)


let dramaArr = movies.filter(item=> item.categories=='Drama');
let comedyArr = movies.filter(item=> item.categories=='Comedy');

function showCategory(wrapper,arr){
  arr.forEach((item)=>{
    let li = document.createElement('li');
    li.innerHTML= ` <img class="card-img" src="${item.youtubePoster}" alt="movie-img">
      <div class="movie-desc">
      <div class="cart-header">
      <p class="card-text">${item.language},${item.year}</p>
      <p class="rating">${item.imdbRating}<i class='bx bxs-star' ></i></p>
      </div>
      <h4 class="movie-title">${item.title}</h4>
      <p class="categories">${item.categories}</p>
      <button type="button" data-toggle="modal" data-target="#exampleModalCenter" onclick="openModal(${item.imdbId})" class="btn-summary" >Watch summary</button>
      <button onclick="openWatchlist(${item.imdbId})"  class="btn-like"><i class='bx bx-heart' ></i></button>
      </div> `
      li.classList= 'drama-cart';
      wrapper.appendChild(li);
  })
}

showCategory(elSlidder,dramaArr);
showCategory(elSlidder2,comedyArr);

var owl = $('.owl-carousel');
owl.owlCarousel({
    center: false,
    items: 10,
    nav:true,
    margin:20,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },            
        960:{
            items:3
        },
        1200:{
            items:4
        }
    }
});
owl.on('mousewheel', '.owl-stage', function (e) {
    if (e.deltaY>0) {
        owl.trigger('next.owl');
    } else {
        owl.trigger('prev.owl');
    }
    e.preventDefault();
});



   

let leftBtn = document.querySelector('#prevBtn')
let rightBtn = document.querySelector('#nextBtn')
let itemCard = document.querySelectorAll('.slider__item li')
let moviesList= document.querySelector('.sliderL')

let idx =0;

function featureSlider() {
    if(idx > itemCard.length-4){
        idx = 0;
    }
    else if(idx < 0){
        idx = itemCard-4
    }
    moviesList.style.transform =`translateX(${-idx*320}px)`
}

rightBtn.addEventListener('click', ()=> {
    idx++;
    resetInter();
    featureSlider();
})
leftBtn.addEventListener('click', ()=> {
    idx--;
    resetInter();
    featureSlider();
})

let interval = setInterval(run, 3000);

function run() {
    idx++;
    featureSlider();
}
function resetInter() {
    clearInterval(interval);
}

let elSearch = document.getElementById('searchInput');
let elHero = document.getElementById('hero');
let yourSearchList = document.getElementById('yourSearchList');
let yourSearch = document.getElementById('yourSearch');

yourSearch.style.display='none';
elHero.style.display='block';
let firstForm = document.getElementById('firstForm');
firstForm.addEventListener('submit', searchMovie);

function searchMovie(e){
  e.preventDefault();
  yourSearch.style.display='block';
  yourSearchList.innerHTML='';
  elHero.style.display='none';
  let text = elSearch.value;
  if(text!==''){
    let searchList = movies.filter(item=> item.title.toLocaleLowerCase().indexOf(text) > -1 );
  showCategory(yourSearchList,searchList);
  }else{
    yourSearchList.style.display='none'
  }
}

let elSearchBtn = document.getElementById('searchBtn');
let elForm = document.getElementById('searchForm');
let elSelect = document.getElementById('selectForm');
let startYear = document.getElementById('startYear');
let endYear = document.getElementById('endYear');
let sortedUl = document.getElementById('sortedUl');
let movieTitle = document.getElementById('movieTitle')

elForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  let categoryValue = elSelect.value;
  let start= startYear.value;
  let end = endYear.value;
  let Mtitle = movieTitle.value;
  let newSortedArr = movies.filter((item)=>{
    if(categoryValue==item.categories && start<=item.year<=end && Mtitle==item.title){
      return item
    }
  } );
  console.log(newSortedArr);
  // showCategory(sortedUl,newSortedArr);
})

