// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // In a real application, you would send this to a server
                showNotification('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
    
    // Quantity controls on product details page
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decreaseQuantity');
    const increaseBtn = document.getElementById('increaseQuantity');
    
    if (quantityInput && decreaseBtn && increaseBtn) {
        decreaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
        
        quantityInput.addEventListener('change', function() {
            if (this.value < 1) {
                this.value = 1;
            }
        });
    }
    
    // Product filtering
    const filterOptions = document.querySelectorAll('.filter-option');
    if (filterOptions.length > 0) {
        filterOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Toggle active class
                if (this.classList.contains('filter-brand') || this.classList.contains('filter-tag')) {
                    // For brand and tag filters, allow multiple selections
                    this.classList.toggle('active');
                } else {
                    // For price and sort filters, only one selection allowed per group
                    const siblings = document.querySelectorAll(`.${this.classList[0]}`);
                    siblings.forEach(sib => sib.classList.remove('active'));
                    this.classList.add('active');
                }
                
                // Apply filters
                filterProducts();
            });
        });
    }
    
    // Function to filter products
    function filterProducts() {
        // Get active filters
        const activeBrands = Array.from(document.querySelectorAll('.filter-brand.active')).map(el => el.getAttribute('data-brand'));
        const activeTags = Array.from(document.querySelectorAll('.filter-tag.active')).map(el => el.getAttribute('data-tag'));
        const activePrice = document.querySelector('.filter-price.active')?.getAttribute('data-price-range');
        
        // Get all product cards
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const productId = parseInt(card.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            
            if (!product) return;
            
            let showProduct = true;
            
            // Filter by brand
            if (activeBrands.length > 0) {
                showProduct = showProduct && activeBrands.includes(product.brand);
            }
            
            // Filter by tag
            if (activeTags.length > 0) {
                showProduct = showProduct && activeTags.some(tag => product.tags.includes(tag));
            }
            
            // Filter by price
            if (activePrice) {
                const [min, max] = activePrice.split('-').map(p => parseInt(p));
                showProduct = showProduct && (product.price >= min && (max === 0 || product.price <= max));
            }
            
            // Show or hide product
            card.style.display = showProduct ? 'block' : 'none';
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-container input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm) {
                window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.trim().toLowerCase();
                if (searchTerm) {
                    window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    }
    
    // Handle search parameters on products page
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    
    if (searchParam && document.getElementById('productsContainer')) {
        // Update search input with search term
        if (searchInput) {
            searchInput.value = searchParam;
        }
        
        // Filter products based on search term
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const productId = parseInt(card.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            
            if (!product) return;
            
            // Check if product matches search term
            const nameMatch = product.name.toLowerCase().includes(searchParam.toLowerCase());
            const brandMatch = product.brand.toLowerCase().includes(searchParam.toLowerCase());
            const descMatch = product.description.toLowerCase().includes(searchParam.toLowerCase());
            const tagsMatch = product.tags.some(tag => tag.toLowerCase().includes(searchParam.toLowerCase()));
            
            // Show or hide product
            card.style.display = (nameMatch || brandMatch || descMatch || tagsMatch) ? 'block' : 'none';
        });
    }
});
