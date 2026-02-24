fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  .then((res) => res.json())
  .then((foodData) => {
    const cat = foodData.categories;
    const cato = new Set();

    cat.forEach((food) => {
      cato.add(food.strCategory);
    });

    const buttons = document.getElementById("categories_buttons");

    cato.forEach((element) => {
      let btn = document.createElement("button");
      btn.innerText = element;

      btn.onclick = () => {
        document.querySelectorAll("#categories_buttons button").forEach((b) => {
          b.classList.remove("active");
        });

        btn.classList.add("active");
      };

      buttons.appendChild(btn);
    });
  });
