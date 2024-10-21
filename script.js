// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
    { id: 4, name: "Product 4", price: 40 },
    { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Load cart from session storage
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
    products.forEach((product) => {
        const li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
        productList.appendChild(li);
    });
}

// Render cart list
function renderCart() {
    cartList.innerHTML = ""; // Clear the current cart display
    cart.forEach((item) => {
        const li = document.createElement("li");
        li.innerText = `${item.name} - $${item.price}`;
        cartList.appendChild(li);
    });
}

// Add item to cart
function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (product) {
        cart.push(product);
        sessionStorage.setItem("cart", JSON.stringify(cart)); // Update session storage
        renderCart(); // Update the cart display
    }
}

// Clear cart
function clearCart() {
    cart = []; // Reset the cart
    sessionStorage.removeItem("cart"); // Remove from session storage
    renderCart(); // Update the cart display
}

// Event listener for adding products to the cart
productList.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-to-cart-btn")) {
        const productId = parseInt(event.target.getAttribute("data-id"));
        addToCart(productId);
    }
});

// Event listener for clearing the cart
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
