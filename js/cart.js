// Cart functionality
class ShoppingCart {
    constructor() {
        this.cart = [];
        this.loadCart();
    }
    
    // Load cart from localStorage
    loadCart() {
        const savedCart = localStorage.getItem('beautyCart');
        if (savedCart) {
            this.cart = JSON.parse(savedCart);
        }
        this.updateCartCount();
    }
    
    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('beautyCart', JSON.stringify(this.cart));
        this.updateCartCount();
    }
    
    // Add item to cart
    addToCart(productId, quantity = 1) {
        const product = products.find(p => p.id === parseInt(productId));
        
        if (!product) {
            console.error('Product not found:', productId);
            return false;
        }
        
        // Check if product is already in cart
        const existingItem = this.cart.find(item => item.id === parseInt(productId));
        
        if (existingItem) {
            // Update quantity if already in cart
            existingItem.quantity += quantity;
        } else {
            // Add new item to cart
            this.cart.push({
                id: product.id,
                name: product.name,
                brand: product.brand,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        this.saveCart();
        return true;
    }
    
    // Remove item from cart
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== parseInt(productId));
        this.saveCart();
    }
    
    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === parseInt(productId));
        if (item) {
            item.quantity = parseInt(quantity);
            // Remove item if quantity is 0 or less
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.saveCart();
            }
        }
    }
    
    // Calculate cart total
    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    // Calculate shipping cost (simplified version)
    getShippingCost() {
        const subtotal = this.getCartTotal();
        // Free shipping for orders over 5000 BDT
        return subtotal > 5000 ? 0 : 120;
    }
    
    // Get cart count
    getCartCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }
    
    // Update cart count display
    updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const count = this.getCartCount();
        
        cartCountElements.forEach(element => {
            element.textContent = count;
        });
    }
    
    // Clear cart
    clearCart() {
        this.cart = [];
        this.saveCart();
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Function to display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSummaryContainer = document.getElementById('cartSummary');
    const emptyCartContainer = document.getElementById('emptyCart');
    
    if (cartItemsContainer && cartSummaryContainer) {
        if (cart.cart.length === 0) {
            // Show empty cart message
            if (emptyCartContainer) {
                emptyCartContainer.style.display = 'block';
            }
            cartItemsContainer.style.display = 'none';
            cartSummaryContainer.style.display = 'none';
        } else {
            // Hide empty cart message
            if (emptyCartContainer) {
                emptyCartContainer.style.display = 'none';
            }
            cartItemsContainer.style.display = 'block';
            cartSummaryContainer.style.display = 'block';
            
            // Display cart items
            cartItemsContainer.innerHTML = cart.cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <div class="cart-item-brand">${item.brand}</div>
                        <div class="cart-item-price">${formatPrice(item.price)}</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease-quantity" data-id="${item.id}">-</button>
                        <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                        <button class="quantity-btn increase-quantity" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
                </div>
            `).join('');
            
            // Display cart summary
            const subtotal = cart.getCartTotal();
            const shipping = cart.getShippingCost();
            const total = subtotal + shipping;
            
            document.getElementById('subtotal').textContent = formatPrice(subtotal);
            document.getElementById('shipping').textContent = shipping > 0 ? formatPrice(shipping) : 'Free';
            document.getElementById('total').textContent = formatPrice(total);
            
            // Add event listeners for cart actions
            addCartEventListeners();
        }
    }
}

// Add event listeners for cart actions
function addCartEventListeners() {
    // Increase quantity
    const increaseButtons = document.querySelectorAll('.increase-quantity');
    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const inputElement = document.querySelector(`.quantity-input[data-id="${productId}"]`);
            const currentValue = parseInt(inputElement.value);
            inputElement.value = currentValue + 1;
            cart.updateQuantity(productId, currentValue + 1);
            displayCartItems();
        });
    });
    
    // Decrease quantity
    const decreaseButtons = document.querySelectorAll('.decrease-quantity');
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const inputElement = document.querySelector(`.quantity-input[data-id="${productId}"]`);
            const currentValue = parseInt(inputElement.value);
            if (currentValue > 1) {
                inputElement.value = currentValue - 1;
                cart.updateQuantity(productId, currentValue - 1);
                displayCartItems();
            }
        });
    });
    
    // Update quantity input
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const productId = this.getAttribute('data-id');
            const newValue = parseInt(this.value);
            if (newValue >= 1) {
                cart.updateQuantity(productId, newValue);
                displayCartItems();
            } else {
                this.value = 1;
                cart.updateQuantity(productId, 1);
                displayCartItems();
            }
        });
    });
    
    // Remove item
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            cart.removeFromCart(productId);
            displayCartItems();
        });
    });
    
    // Checkout button
    const checkoutButton = document.getElementById('checkoutBtn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            alert('Thank you for your order! This is a demo checkout process.');
            cart.clearCart();
            displayCartItems();
        });
    }
}

// Event listeners for add to cart buttons
document.addEventListener('DOMContentLoaded', function() {
    // Add to cart from product cards
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.getAttribute('data-id');
            if (cart.addToCart(productId)) {
                showNotification('Product added to cart!');
            }
        }
    });
    
    // Add to cart from product details page
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const quantity = parseInt(document.getElementById('quantity').value);
            if (cart.addToCart(productId, quantity)) {
                showNotification('Product added to cart!');
            }
        });
    }
    
    // Display cart items on cart page
    displayCartItems();
});

// Function to show notification
function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.padding = '10px 20px';
        notification.style.backgroundColor = 'var(--primary-color)';
        notification.style.color = 'white';
        notification.style.borderRadius = 'var(--border-radius)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        document.body.appendChild(notification);
    }
    
    // Set message and show notification
    notification.textContent = message;
    notification.style.opacity = '1';
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
    }, 3000);
}
