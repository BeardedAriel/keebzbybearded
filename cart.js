// Function to display the cart items
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // If the cart is empty
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceElement.textContent = '0.00';
        return;
    }

    // Clear the container before adding new items
    cartItemsContainer.innerHTML = '';

    // Loop through the cart items and display them
    let totalPrice = 0;
    cart.forEach(item => {
        if (item && item.name && item.price) {
            const itemHTML = `
                <div class="cart-item" data-product-id="${item.id}">
                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <p>$${item.price}</p>
                        <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                    </div>
                    <button class="remove-item">Remove</button>
                </div>
            `;
            cartItemsContainer.innerHTML += itemHTML;
            totalPrice += parseFloat(item.price) * item.quantity;
        } else {
            console.error('Invalid item found:', item);
        }
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);

    // Attach event listeners to the remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.closest('.cart-item').getAttribute('data-product-id');
            removeFromCart(productId);
        });
    });
}

// Event listener for quantity change
document.getElementById('cart-items').addEventListener('input', function(event) {
    if (event.target && event.target.classList.contains('quantity-input')) {
        const productId = event.target.getAttribute('data-id');
        const newQuantity = event.target.value;
        updateQuantityInCart(productId, newQuantity);
    }
});

// Function to update the quantity of an item in the cart
function updateQuantityInCart(productId, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.map(item => {
        if (item.id === productId) {
            item.quantity = parseInt(newQuantity); // Update the quantity (ensure it's an integer)
        }
        return item;
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Refresh cart display
}

// Function to add item to cart
function addToCart(productId, productName, productPrice, productImage) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item already exists in the cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        // If the item already exists, increase the quantity
        existingItem.quantity += 1;
    } else {
        // If the item does not exist, add it with quantity 1
        const newItem = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };
        cart.push(newItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Refresh cart display
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id != productId); // Remove the selected item
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart(); // Refresh cart
}

// WhatsApp share function
function sendCartToWhatsApp() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    // Get selected options
    const orderPartsOnly = document.getElementById('order-parts-only').checked ? 'Yes' : 'No';
    const customBuild = document.getElementById('custom-build').checked ? 'Yes' : 'No';
    const privateBuild = document.getElementById('private-build').checked ? 'Yes' : 'No';
    const giftOption = document.getElementById('gift-option').checked ? 'Yes' : 'No';
    const paymentMethod = document.getElementById('payment-method').value;

    // Format the cart message for WhatsApp
    let message = `*Keyboard Inquiry Request*\n\n`;
    message += `Hello, I am interested in ordering a custom keyboard from *Keebs by Bearded*. Below are the details of my request:\n\n`;

    // List cart items
    message += `*Selected Parts:*\n`;
    let totalPrice = 0;
    cart.forEach(item => {
        if (item && item.name && item.price) {
            message += `*${item.name}* x${item.quantity} - $${(parseFloat(item.price) * item.quantity).toFixed(2)}\n`;
            totalPrice += parseFloat(item.price) * item.quantity;
        }
    });

    message += `\n*Total Price:* $${totalPrice.toFixed(2)}\n\n`;

    // Include the options chosen by the user
    message += `*Order Parts Only:* ${orderPartsOnly}\n`;
    message += `*Custom Build (Stream):* ${customBuild}\n`;
    message += `*Private Build (No Stream):* ${privateBuild}\n`;
    message += `*This is a Gift:* ${giftOption}\n`;
    message += `*Payment Method:* ${paymentMethod}\n`;

    // Add the phone number to the WhatsApp link (replace '1234567890' with your own number)
    const phoneNumber = '+972523813861';  // Replace this with your actual WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Send to WhatsApp
    window.open(whatsappUrl, '_blank');
}

// Attach event listeners for WhatsApp checkout
document.getElementById('checkout-whatsapp-button').addEventListener('click', sendCartToWhatsApp);

// Display the cart when the page loads
window.onload = function() {
    displayCart();
};
