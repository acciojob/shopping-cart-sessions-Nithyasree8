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

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Function to render the list of products
function renderProducts() {
    products.forEach((product) => {
        const li = document.createElement("li");
        li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
        productList.appendChild(li);
    });
}

// Function to render the shopping cart
function renderCart() {
    cartList.innerHTML = ""; // Clear existing list
    const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];

    cartItems.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;
        cartList.appendChild(li);
    });
}

// Function to add an item to the cart
function addToCart(productId) {
    const productToAdd = products.find((product) => product.id === productId);

    if (productToAdd) {
        let cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
        const existingProduct = cartItems.find(item => item.id === productToAdd.id);
        if (!existingProduct) {
            cartItems.push(productToAdd);
            sessionStorage.setItem("cart", JSON.stringify(cartItems));
            renderCart();
        }
    }
}

// Function to clear the cart
function clearCart() {
    sessionStorage.removeItem("cart");
    renderCart();
}

// Event listener for adding to cart
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
