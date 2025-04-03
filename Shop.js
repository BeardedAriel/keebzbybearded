// Ensure the script is loaded
console.log("Shop.js loaded");

// Function to add an item to the cart
function addToCart(id, name, price, image) {
    let cartItems = getCartItems();
    let itemExists = cartItems.find(item => item.id === id);

    if (itemExists) {
        itemExists.quantity += 1; // Increase quantity
    } else {
        const newItem = {
            id: id,
            name: name,
            price: parseFloat(price), // Ensure price is a float
            image: image,
            quantity: 1
        };
        cartItems.push(newItem);
    }

    saveCartItems(cartItems);
    console.log("✅ Cart updated:", cartItems); // Debugging output
}

// Event delegation for better performance and dynamic elements
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-to-cart")) {
        const button = event.target;
        const id = button.getAttribute("data-id");
        const name = button.getAttribute("data-name");
        const price = button.getAttribute("data-price");
        const image = button.getAttribute("data-image");

        console.log("🛒 Attempting to add item:", { id, name, price, image }); // Debugging output

        if (!id || !name || !price || !image) {
            console.error("❌ Missing data attributes! Check HTML button:", button);
            return;
        }

        addToCart(id, name, price, image);
    }
});

// Helper function to get cart items from localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Helper function to save cart items to localStorage
function saveCartItems(cartItems) {
    localStorage.setItem("cart", JSON.stringify(cartItems));
}