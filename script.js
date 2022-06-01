const countries = document.querySelector(".countries");
const Section2 = document.querySelector(".sec2");
const recipeContainer = document.querySelector(".recipe-card");

const searchInput = document.querySelector(".search-content");
const searchBtn = document.querySelector("#search-btn");
const mealsCards = document.querySelector(".meals-container");

let countryValue = localStorage.getItem("0");

let countryUrl = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
let mealsUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${countryValue}`;

function fetch(url, cb) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      switch (xhr.status) {
        case 200:
          let data = JSON.parse(xhr.responseText);

          cb(data);

          break;
        default:
          Section2.textContent = " NO Cuisine Available";
      }
    }
  };
  xhr.open("GET", url);
  xhr.send();
}

function renderCountries(country) {
  country.meals.forEach((ele) => {
    const cuisineCard = document.createElement("div");
    const countryNamePara = document.createElement("p");
    const countryBtn = document.createElement("button");
    const link = document.createElement("a");

    cuisineCard.setAttribute("class", "cuisine");
    countryNamePara.setAttribute("class", "country");
    countryBtn.setAttribute("class", "go-meals");

    countryBtn.textContent = "Show Meals";

    countries.appendChild(cuisineCard);
    cuisineCard.appendChild(countryNamePara);
    cuisineCard.appendChild(link);
    link.appendChild(countryBtn);

    countryNamePara.textContent = ele.strArea + " Cuisine";
    countryNamePara.id = ele.strArea;
    link.href = "./meals.html";

    link.addEventListener("click", function () {
      console.log(111111);
      localStorage.setItem("0", link.previousSibling.id);
    });
  });
}

function search(obj) {
  searchBtn.addEventListener("click", () => {
    mealsCards.textContent = "";

    obj.meals.forEach((ele) => {
      if (ele.strMeal.toLowerCase().includes(searchInput.value.toLowerCase())) {
        const mealDiv = document.createElement("div");
        const mealImg = document.createElement("img");
        const mealTitle = document.createElement("p");
        const recipeBtn = document.createElement("button");

        mealDiv.setAttribute("class", "meal");
        mealImg.setAttribute("class", "meal-photo");
        mealTitle.setAttribute("class", "meal-name");
        recipeBtn.setAttribute("class", "get-recipe");

        mealsCards.appendChild(mealDiv);
        mealDiv.appendChild(mealImg);
        mealDiv.appendChild(mealTitle);
        mealDiv.appendChild(recipeBtn);

        mealTitle.textContent = ele.strMeal;
        mealTitle.id = ele.idMeal;
        mealImg.src = ele.strMealThumb;
        recipeBtn.textContent = "Get Recipe";


        recipeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.setItem("1", mealTitle.id);
      
            let recipeId = localStorage.getItem("1");
            let recipeUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      
            fetch(recipeUrl, addRecipe);
          });

      }
    });
  });
}

function mealcard(obj) {
  obj.meals.forEach((ele) => {
    const mealDiv = document.createElement("div");
    const mealImg = document.createElement("img");
    const mealTitle = document.createElement("p");
    const recipeBtn = document.createElement("button");

    mealDiv.setAttribute("class", "meal");
    mealImg.setAttribute("class", "meal-photo");
    mealTitle.setAttribute("class", "meal-name");
    recipeBtn.setAttribute("class", "get-recipe");

    mealsCards.appendChild(mealDiv);
    mealDiv.appendChild(mealImg);
    mealDiv.appendChild(mealTitle);
    mealDiv.appendChild(recipeBtn);

    mealTitle.textContent = ele.strMeal;
    mealTitle.id = ele.idMeal;
    mealImg.src = ele.strMealThumb;
    recipeBtn.textContent = "Get Recipe";

    recipeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.setItem("1", mealTitle.id);

      let recipeId = localStorage.getItem("1");
      let recipeUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

      fetch(recipeUrl, addRecipe);
    });
  });
}

function addRecipe(obj) {

if(recipeContainer.children.length===0){


  const recipeDiv = document.createElement("div");
  const closeBtn = document.createElement("a");
  const i = document.createElement("i");
  const recipeTittle = document.createElement("h2");
  const description = document.createElement("p");

  recipeDiv.setAttribute("class", "recipe");
  i.setAttribute("class", "fas fa-window-close");

  recipeContainer.appendChild(recipeDiv);
  recipeDiv.appendChild(closeBtn);
  closeBtn.appendChild(i);
  recipeDiv.appendChild(recipeTittle);
  recipeDiv.appendChild(description);

  recipeTittle.textContent = obj.meals.strMeal;
  console.log((recipeTittle.textContent = obj.meals[0].strMeal));
  description.textContent = obj.meals[0].strInstructions;
  recipeContainer.style.display = "block";

  closeBtn.onclick = () => {
    recipeDiv.remove();
    recipeContainer.style.display="none"
  };


}
    
}

fetch(countryUrl, renderCountries);
fetch(mealsUrl, mealcard);
fetch(mealsUrl, search);
