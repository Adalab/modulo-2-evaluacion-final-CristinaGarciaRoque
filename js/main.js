'use strict';
const inputSearch = document.querySelector('.js-input-search');
const searchBtn = document.querySelector('.js-search-btn');
let drinkList = [];
const list = document.querySelector('.js-list');
const listFav= document.querySelector('.js-list-favs');

localStorage.setItem('idsFavLocalStorage', '');

const title = document.querySelector('.title');
title.classList.add('pink');


let idsFav = [];
let allDrinks=[];
if(localStorage.getItem('idsFavLocalStorage')!=''){

const idsSaved = JSON.parse(localStorage.getItem('idsFavLocalStorage'));
 idsFav = [idsSaved];
console.log(idsFav);
  if(idsFav.length>0){
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
    .then(function (response) {
      return response.json();
      console.log(response);
    })
    .then(function (data) {
      allDrinks = data.drinks;
      console.log(allDrinks);
      for (let b = 0; b < allDrinks.length; b++) {
        const idTemp = allDrinks[b]['idDrink'];
        console.log(idTemp);
        if(idsFav.indexOf(idTemp)>=0){
          console.log(idTemp);
          const favName = allDrinks[b]['strDrink'];
          const favPhoto = allDrinks[b]['strDrinkThumb'];
          listFav.innerHTML +=`<li class="js-li"><span class="js-id-drink hidden">${idDrink}</span> <img class="" src="${drinkPhoto}" alt="${drinkName}"> <p>${drinkName}</p> </li>`;
        }
        
      }
    })
    console.log(idsFav);
  }

}








searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let inputSearchValue = inputSearch.value;

    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+inputSearchValue)
  .then(function (response) {
    return response.json();
    console.log(response);
  })
  .then(function (data) {
   drinkList = data.drinks;
   // console.log(drinkList);
    
    list.innerHTML='';
    for (let index = 0; index < drinkList.length; index++) {
      const drinkName = drinkList[index]['strDrink'];
      const drinkPhoto = drinkList[index]['strDrinkThumb'];
      const idDrink = drinkList[index]['idDrink'];
      if(drinkPhoto==null){
        drinkPhoto='https://via.placeholder.com/300x300/ffffff/666666/?text=Cocktail';
      }
      list.innerHTML +=`<li class="js-li"><span class="js-id-drink hidden">${idDrink}</span> <img class="" src="${drinkPhoto}" alt="${drinkName}"> <p>${drinkName}</p> </li>`;

      
    }

    let listElement = document.querySelectorAll('.js-li');

    for (let i = 0; i < listElement.length; i++) {
    listElement[i].addEventListener("click", (event) => {
      event.preventDefault();
      let selectorClick = event.currentTarget.querySelector('.js-id-drink');
      let idFav = selectorClick.innerHTML;
      if(idsFav.indexOf(idFav)<0){
        idsFav.push(idFav);
        localStorage.setItem('idsFavLocalStorage', JSON.stringify(idFav));
      }
      console.log(idsFav);
    })
  }
  })
  .catch(function(error) {
    console.log(error);
  });



});