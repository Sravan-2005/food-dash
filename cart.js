document.addEventListener("click", function(e){

    if(e.target.classList.contains("add-cart")){

        const mealId = e.target.dataset.id;

        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {

            const meal = data.meals[0];

            const item = {
                id: meal.idMeal,
                name: meal.strMeal,
                img: meal.strMealThumb,
                price: (Math.random()*10+5).toFixed(2),
                qty: 1
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const exist = cart.find(x => x.id === item.id);

            if(exist) exist.qty++;
            else cart.push(item);

            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Added to cart ✔");
        });
    }
});

function renderCart(){

    const cartBox = document.getElementById("cart-purchase");
    if(!cartBox) return;   // important for other pages

    cartBox.innerHTML = "";

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(item => {

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <img src="${item.img}" class="cart-img">

            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>$${item.price} each</p>
            </div>

            <div class="cart-actions">
                <span>Qty: ${item.qty}</span>
                <p>Total $${(item.qty*item.price).toFixed(2)}</p>
            </div>
        `;

        cartBox.appendChild(div);
    });
}

const cart=document.getElementById("cart");
cart.style.display="none";
document.querySelectorAll(".plus").forEach(btn=>{
    btn.addEventListener("click", ()=>{
        let count = btn.parentElement.querySelector(".count");
        count.innerText = Number(count.innerText) + 1;
    });
});

document.querySelectorAll(".minus").forEach(btn=>{
    btn.addEventListener("click", ()=>{
        let count = btn.parentElement.querySelector(".count");
        let val = Number(count.innerText);
        if(val > 1){
            count.innerText = val - 1;
        }
    });
});
