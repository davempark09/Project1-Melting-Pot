const menu = document.querySelector('#mobile')
const menuLinks = document.querySelector('.navMenu')

const searchBtn = document.getElementById('searchBtn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.mealDetailsContent');
const recipeCloseBtn = document.getElementById('recipeCloseBtn');

const form = document.querySelector(".formSheet")

searchBtn && searchBtn.addEventListener('click', getMealList);
mealList && mealList.addEventListener('click', getMealRecipe);
form && form.addEventListener("submit", submitForm);
recipeCloseBtn && recipeCloseBtn.addEventListener('click', () => {
mealDetailsContent.parentElement.classList.remove('showRecipe');
});




function submitForm(e) {
    e.preventDefault();
    let name = document.querySelector(".name").value
    let phone = document.querySelector(".number").value
    let email = document.querySelector(".email").value
    let message = document.querySelector(".message").value
    sendEmail(name, phone, email, message)
}
function sendEmail(name, phone, email, message) {
    Email.send({
        SecureToken : "3a767535-e244-4285-93a4-31d03fdd5913",
        To : 'davempark@gmail.com',
        From : 'holynuggets36@gmail.com',
        Subject : name+" has sent you a message",
        Body : "Name:"+name+"Phone Number:"+phone+"E-Mail"+email+"Message:"+message
    }).then(
    m => alert(m)
    );
}

menu && menu.addEventListener('click', getBars);
function getBars(){
    menu.classList.toggle('isActive');
    menuLinks.classList.toggle('active')
}

function getMealList(){
    let searchInputTxt = document.getElementById('searchInput').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                <div class = "mealItem" data-id = "${meal.idMeal}">
                <div class = "mealImg">
                <img src = "${meal.strMealThumb}" alt = "food">
                </div>
                <div class = "mealName">
                <h3>${meal.strMeal}</h3>
                <a href = "#" class = "recipeBtn">Get Recipe</a>
                </div>
                </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }
        
        mealList.innerHTML = html;
    });
}



function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipeBtn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}


function mealRecipeModal(meal){
    meal = meal[0];
    let html = `
    <h2 class = "recipeTitle">${meal.strMeal}</h2>
    <p class = "recipeCategory">${meal.strCategory}</p>
    <div class = "recipeInstruct">
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
    </div>
    <div class = "recipeLink">
    <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
    </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}

