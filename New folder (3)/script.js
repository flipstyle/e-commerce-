// Simple client-side cart + fetch products from api.php
const API = './api.php';
let products = [];
let cart = JSON.parse(localStorage.getItem('ez_cart')||'{}');


function saveCart(){ localStorage.setItem('ez_cart', JSON.stringify(cart)); updateCartUI(); }


function updateCartUI(){
const itemsEl = document.getElementById('cart-items');
const countEl = document.getElementById('cart-count');
const totalEl = document.getElementById('cart-total');
itemsEl.innerHTML='';
let total = 0, qty=0;
for(const id in cart){
const item = cart[id];
qty+=item.qty; total += item.qty * item.price;
const li = document.createElement('li');
li.innerHTML = `<div>${item.name} x ${item.qty}</div><div>₱${(item.price*item.qty).toFixed(2)}</div>`;
itemsEl.appendChild(li);
}
countEl.textContent = qty;
totalEl.textContent = total.toFixed(2);
}


async function loadProducts(){
const res = await fetch(API+'?action=get_products');
const data = await res.json();
products = data.products || [];
const grid = document.getElementById('products');
grid.innerHTML='';
products.forEach(p=>{
const card = document.createElement('article');
card.className = 'product';
card.innerHTML = `
<img src="${p.image||'https://via.placeholder.com/400x300?text=Product'}" alt="${p.name}" />
<h3>${p.name}</h3>
<div class="price">₱${parseFloat(p.price).toFixed(2)}</div>
<button data-id="${p.id}">Add to cart</button>
`;
grid.appendChild(card);
});
grid.querySelectorAll('button[data-id]').forEach(btn=>btn.addEventListener('click',()=>{
const id = btn.getAttribute('data-id');
const p = products.find(x=>x.id==id);
if(!cart[id]) cart[id] = {id:p.id,name:p.name,price:parseFloat(p.price),qty:0};
cart[id].qty+=1; saveCart();
document.getElementById('cart-panel').classList.remove('hidden');
}));
}


// checkout
document.addEventListener('DOMContentLoaded',()=>{
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('close-cart').addEventListener('click',()=>{
document.getElementById('cart-panel').classList.add('hidden');
});
document.getElementById('checkout-form').addEventListener('submit', async (e)=>{
e.preventDefault();
const form = new FormData(e.target);
const order = {name:form.get('name'), email:form.get('email'), address:form.get('address'), items:cart};
if(Object.keys(cart).length===0){ alert('Your cart is empty'); return; }
const res = await fetch(API, {method:'POST',headers:{'Accept':'application/json'},body: JSON.stringify({action:'place_order',order})});
const json = await res.json();
if(json.success){
alert('Order placed! Order ID: '+json.order_id);
cart = {}; saveCart();
} else {
alert('Failed to place order');
}
});
updateCartUI();
loadProducts();
});