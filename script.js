// REGISTER
function registerUser(){
let name=document.getElementById("name").value.trim();
let pass=document.getElementById("pass").value.trim();

localStorage.setItem("user",JSON.stringify({name,pass}));
alert("Registered ✅");
window.location.href="index.html";
return false;
}

// LOGIN
function loginUser(){
let username=document.getElementById("username").value.trim();
let password=document.getElementById("password").value.trim();

let user=JSON.parse(localStorage.getItem("user"));

if(user && username===user.name && password===user.pass){
    alert("Login Successful 🚀");
    window.location.href="home.html";
return false;
}else{
    alert("Wrong details ❌");
    return false;
}
}

// LOGOUT
function logout(){
window.location.href="index.html";
}

// PRODUCTS ✅ 
let products=[
{name:"Watch",price:1999,image:"https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg"},
{name:"Headphones",price:999,image:"https://images.unsplash.com/photo-1481207801830-97f0f9a1337e"},
{name:"Shoes",price:2499,image:"https://images.unsplash.com/photo-1543508282-6319a3e2621f"},
{name:"Perfume",price:149,image:"https://images.unsplash.com/photo-1585386959984-a4155224a1ad"},
{name:"Laptop",price:49999,image:"https://images.unsplash.com/photo-1580894894513-541e068a3e2b"},
{name:"Glasses",price:799,image:"https://images.unsplash.com/photo-1572635196237-14b3f281503f"}
];

// CART
let cart=JSON.parse(localStorage.getItem("cart"))||[];

// Add TO kart 
function addToCart(i){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let product = products[i];

let found = cart.find(item => item.name === product.name);

if(found){
    found.qty = (found.qty || 1) + 1;
}
else{
    cart.push({
        name:product.name,
        price:product.price,
        image:product.image,
        qty:1
    });
}

localStorage.setItem("cart",JSON.stringify(cart));
updateCart();

}

// UPDATE CART
function updateCart(){
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let count=document.getElementById("cartCount");
let totalQty = 0;

cart.forEach(item => {
    totalQty += item.qty || 1;
});

if(count) count.innerText = "🛒 " + totalQty;

let cartItems=document.getElementById("cartItems");
let total=document.getElementById("totalPrice");

if(cartItems){
cartItems.innerHTML="";
let sum=0;

cart.forEach((item,index)=>{

let qty = item.qty || 1;
sum += item.price * qty;

cartItems.innerHTML+=`
<div>
${item.name} - ₹${item.price} x ${qty}
<button onclick="removeItem(${index})">❌</button>
</div>`;
});

total.innerText="Total :- ₹"+sum;
}
}

// REMOVE
function removeItem(i){
cart.splice(i,1);
localStorage.setItem("cart",JSON.stringify(cart));
updateCart();
}

function showOrder(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let html = "";
let total = 0;

cart.forEach(item => {

let price = Number(item.price);
let qty = Number(item.qty || 1);

html += `
<div class="order-card">
<img src="${item.image}" onerror="this.src='https://via.placeholder.com/100'">
<div>
<p class="pname">${item.name}</p>
<p class="price">Price: ₹${price}</p>
<p class="qty">Quantity: ${qty}</p>
<p class="subtotal">Subtotal: ₹${price * qty}</p>
</div>
</div>
`;

total += price * qty;

});

document.getElementById("orderItems").innerHTML = html;
document.getElementById("totalAmount").innerHTML = "Total ₹" + total;

}

function confirmOrder(){
alert("Your Order has been booked");
localStorage.removeItem("cart");
window.location = "home.html";
}

// SEARCH
function searchProduct(){
let input=document.getElementById("search").value.toLowerCase();
let cards=document.getElementsByClassName("card");

for(let i=0;i<cards.length;i++){
let text=cards[i].innerText.toLowerCase();
cards[i].style.display=text.includes(input)?"block":"none";
}
}

// LOAD
window.onload=updateCart;