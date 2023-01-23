const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

window.onload = async () => {
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  let recipeId = urlParams.get("recipeId");
  if (recipeId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("receipe-headline").innerHTML =
          `
        <h2>` +
          data.meals[0].strMeal +
          `</h2>
          <h5>` +
          data.meals[0].strArea +
          ` ` +
          data.meals[0].strCategory +
          `</h5>
        <div class="receipe-duration">
            <h6>Prep: ` +
          random(20, 60) +
          ` mins</h6>
            <h6>Cook: ` +
          random(15, 90) +
          ` mins</h6>
            <h6>Yields: ` +
          random(2, 10) +
          ` Servings</h6>
        </div> 
        `;

        const recipeInstructions = data.meals[0].strInstructions.split(/\r?\n/);
        let idx = 1;
        recipeInstructions.forEach((instruction) => {
          if (instruction) {
            document.getElementById("preperation-steps").innerHTML +=
              `
          <div class="single-preparation-step d-flex">
          <h4> ` +
              idx +
              `
          </h4>
          <p> ` +
              instruction +
              `
          </p>
          </div>
          `;
            idx++;
          }
        });

        // const recipeKeys = Object.keys(data.meals[0]);
        // const ingredientKeys = recipeKeys.filter((key) => {
        //   if (key.startsWith("strIngredient")) {
        //     return key;
        //   }
        // });
        for (let idx = 1; idx <= 20; idx++) {
          ingredient = data.meals[0][`strIngredient${idx}`];
          measurement = data.meals[0][`strMeasure${idx}`];
          if (ingredient) {
            document.getElementById("ingredients").innerHTML +=
              `<div class="custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customCheck` +
              idx +
              `"
            />
            <label class="custom-control-label" for="customCheck` +
              idx +
              `"
              >` +
              measurement +
              ` ` +
              ingredient +
              `</label
            >
          </div>`;
          }
        }
        console.log(data.meals[0].strYoutube);

        document.getElementById("recipe-video-container").innerHTML =
          `
          <iframe width="100%" height="400" src="` +
          data.meals[0].strYoutube
            .replace("watch", "embed")
            .replace("?v=", "/") +
          `" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
        document.getElementById(
          "receipe-img"
        ).style.backgroundImage = `url(${data.meals[0].strMealThumb})`;
      });
  } else {
    document.getElementById("receipe-post-search").style.display = "block";
    // fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     for (idx = 0; idx < data.length; idx++) {
    //       document.getElementById("select1").innerHTML +=
    //         `<option value=` +
    //         idx`>` +
    //         data.meals[idx].strCategory +
    //         `</option>`;
    //     }
    //   });
  }
};
