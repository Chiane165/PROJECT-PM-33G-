const products = [

{
    name:"Apple",
    price:50,
    oldPrice:70,
    rating:4.8,
    badge:"Best Seller",
    category:"fruit",
    image:"assets/apple.jpg"
},

{
name:"Banana",
price:30,
oldPrice:40,
rating:4.7,
badge:"Fresh",
category:"fruit",
image:"assets/banana.jpg"
},

{
name:"Orange",
price:45,
oldPrice:60,
rating:4.9,
badge:"Organic",
category:"fruit",
image:"assets/orange.jpg"
},

{
name:"Mango",
price:80,
oldPrice:100,
rating:5,
badge:"Top Seller",
category:"fruit",
image:"assets/mango.jpg"
},

{
name:"Grapes",
price:95,
oldPrice:120,
rating:4.8,
badge:"Fresh",
category:"fruit",
image:"assets/grapes.jpg"
},

{
name:"Pineapple",
price:90,
oldPrice:120,
rating:4.7,
badge:"Organic",
category:"fruit",
image:"assets/pineapple.jpg"
},

{
name:"Watermelon",
price:150,
oldPrice:180,
rating:4.6,
badge:"Fresh",
category:"fruit",
image:"assets/watermelon.jpg"
},

{
name:"Strawberry",
price:120,
oldPrice:150,
rating:5,
badge:"Premium",
category:"fruit",
image:"assets/strawberry.jpg"
},

{
name:"Carrot",
price:35,
oldPrice:50,
rating:4.7,
badge:"Fresh",
category:"vegetable",
image:"assets/carrot.jpg"
},

{
name:"Tomato",
price:25,
oldPrice:35,
rating:4.8,
badge:"Best Seller",
category:"vegetable",
image:"assets/tomato.jpg"
},

{
name:"Potato",
price:45,
oldPrice:60,
rating:4.8,
badge:"Fresh",
category:"vegetable",
image:"assets/potato.jpg"
},

{
name:"Broccoli",
price:70,
oldPrice:90,
rating:4.9,
badge:"Organic",
category:"vegetable",
image:"assets/broccoli.jpg"
},

{
name:"Bell Pepper",
price:65,
oldPrice:85,
rating:4.7,
badge:"Fresh",
category:"vegetable",
image:"assets/bell pepper.jpg"
},

{
name:"Lettuce",
price:50,
oldPrice:70,
rating:4.8,
badge:"Organic",
category:"vegetable",
image:"assets/lettuce.jpg"
},

{
name:"Cucumber",
price:30,
oldPrice:45,
rating:4.7,
badge:"Fresh",
category:"vegetable",
image:"assets/cucumber.jpg"
},

];

// DOM Elements
const productContainer = document.getElementById("products");
const cartItems = document.getElementById("cartItems");
const totalDisplay = document.getElementById("total");
const cartCount = document.getElementById("cartCount");
const searchInput = document.getElementById("search");
const cartBtn = document.getElementById("cartBtn");
const cart = document.getElementById("cart");


let shoppingCart =
JSON.parse(localStorage.getItem("cart")) || [];

// Display Products
function displayProducts(items){

productContainer.innerHTML = "";

items.forEach(product=>{

const discount =
Math.round(
((product.oldPrice - product.price)
/ product.oldPrice) * 100
);

productContainer.innerHTML += `

<div class="card">

<div class="badge">
${product.badge}
</div>

<button class="wishlist">
❤️
</button>

<img src="${product.image}" alt="${product.name}">

<div class="info">

<h3>${product.name}</h3>

<div class="rating">
⭐ ${product.rating}
</div>

<p class="price">
₱${product.price}
</p>

<p class="old-price">
₱${product.oldPrice}
</p>

<p>
🔥 ${discount}% OFF
</p>

<button
class="add"
onclick="addToCart('${product.name}', ${product.price})">
🛒 Add to Cart
</button>

</div>

</div>

`;

});

}

// Add To Cart
function addToCart(name, price){

shoppingCart.push({
name,
price
});

updateCart();

}

// Update Cart
function updateCart(){

cartItems.innerHTML = "";

let total = 0;

shoppingCart.forEach((item,index)=>{

total += item.price;

cartItems.innerHTML += `
<div class="cart-item">

<p>
${item.name}
</p>

<p>
₱${item.price}
</p>

<button onclick="removeItem(${index})">
❌ Remove
</button>

</div>
`;

});

totalDisplay.textContent = total;
cartCount.textContent = shoppingCart.length;

localStorage.setItem(
"cart",
JSON.stringify(shoppingCart)
);

}

// Remove Item
function removeItem(index){

shoppingCart.splice(index,1);

updateCart();

}

// Search Products
searchInput.addEventListener("keyup",(e)=>{

const value =
e.target.value.toLowerCase();

const filtered =
products.filter(product=>
product.name
.toLowerCase()
.includes(value)
);

displayProducts(filtered);

});

// Category Filters
document.querySelectorAll(".filter")
.forEach(button=>{

button.addEventListener("click",()=>{

const category =
button.dataset.category;

if(category === "all"){

displayProducts(products);

}else{

const filtered =
products.filter(product=>
product.category === category
);

displayProducts(filtered);

}

});

});

// Toggle Cart Sidebar
cartBtn.addEventListener("click",()=>{

cart.classList.toggle("active");

});

// Checkout
document.querySelector(".checkout")
.addEventListener("click",()=>{

if(shoppingCart.length === 0){

alert("Your cart is empty!");

return;

}

alert(
"🎉 Order placed successfully!"
);

shoppingCart = [];

updateCart();

});

// Initial Load
displayProducts(products);
updateCart();