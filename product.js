const params = new URLSearchParams(window.location.search);
const mealId = params.get("id");
const mealPrice = params.get("price") || (Math.random()*10+5).toFixed(2);

fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
.then(res => res.json())
.then(data => {

    const meal = data.meals[0];

    // LEFT SIDE IMAGE
    document.querySelector(".product-hero-left img").src = meal.strMealThumb;

    // RIGHT SIDE INNER HTML
    const heroRight = document.querySelector(".product-hero-right");

    heroRight.innerHTML = `
        <h1 class="meal-title">${meal.strMeal}</h1>

        <div class="varites">
            <p>${meal.strCategory}</p>
            <p style="color:#f36244">${meal.strArea}</p>
        </div>

        <div class="price-cart-row">
            <p id="product-hero-left-price">$${mealPrice}</p>

            <button class="product-cart-button">
                <img src="https://img.icons8.com/?size=24&id=9671&format=png&color=ffffff">
                Add to Cart
            </button>
        </div>

        <h3>Ingredients</h3>
        <div id="ingredients"></div>

        <h3>Instructions</h3>
        <div id="instructions"></div>
    `;

    // INGREDIENTS
    const ingredient_object = getIngredients(meal);
    const ingredients = document.getElementById("ingredients");

    ingredient_object.forEach(item => {
        const div = document.createElement("div");
        div.className = "ingredient";

        div.innerHTML = `
            <p class="ingredient-left">${item.name}</p>
            <p class="ingredient-right">${item.measure}</p>
        `;

        ingredients.append(div);
    });

    // INSTRUCTIONS
    const paragraphs = meal.strInstructions
        .split(/\r?\n/)
        .filter(p => p.trim() !== "");

    document.getElementById("instructions").innerHTML =
        paragraphs.map(p => `<p class="instruction-step">${p}</p>`).join("");

    // ADD TO CART BUTTON
    document.querySelector(".product-cart-button").onclick = () => {

        const cartItem = {
            id: meal.idMeal,
            name: meal.strMeal,
            image: meal.strMealThumb,
            price: mealPrice,
            qty: 1
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existing = cart.find(item => item.id === cartItem.id);

        if(existing){
            existing.qty++;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Added to cart ✅");
    };

    // LOAD SIMILAR MEALS
    foodCards = document.getElementById('product-food-cards');
    if(typeof loadMeals === "function"){
        loadMeals(meal.strCategory);
    }

});
function loadMeals(categorie){
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`)
    .then((res) => res.json())
    .then(data => {
       const allmeals=data.meals;
        // data.meals.forEach(food => createFoodCard(food));
       const nextMeals=allmeals.slice(0,4); 
       nextMeals.forEach(food => createFoodCard(food));

        // const countnumber=document.createElement("p");
        // countnumber.innerHTML=`${allmeals.length} meals found`;
        // count.append(countnumber);

      });
  }
  function createFoodCard(food){
    const card = document.createElement("div");
    card.className = "food_card";
    card.onclick = () => {
    window.location.href = `product.html?id=${food.idMeal}&price=${price}`;
};


    card.innerHTML = `
        <img src="${food.strMealThumb}" alt="${food.strMeal}">
        <div class="food-card-matter">
            <h3>${food.strMeal}</h3>
            <div class="rate-addcart">
                <p>$${(Math.random()*10+5).toFixed(2)}</p>
                <button class="cart-button">
                    <img src="https://img.icons8.com/?size=16&id=9671&format=png&color=ffffff" alt="">
                        <p>Add</p>
                </button>
            </div>
        </div>
    `;

    foodCards.appendChild(card);
  }
function getIngredients(meal){
    let ingredients = [];

    for(let i=1; i<=20; i++){

        let name = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];

        if(name && name.trim() !== ""){
            ingredients.push({
                name: name.trim(),
                measure: measure ? measure.trim() : ""
            });
        }
    }

    return ingredients;
}

