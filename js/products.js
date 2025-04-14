// Product Database
const products = [
    {
        id: 1,
        name: "SkinBliss Cleanser",
        brand: "Cleanser",
        price: 2100,
        originalPrice: 2500,
        discount: 16,
        description: "SkinBliss Cleanser is an affordable, eco-friendly face wash crafted without harsh chemicals or toxins. Enriched with natural rice water extracts, it's thoughtfully designed to address common skin concerns in Bangladesh, all while delivering a gentle, premium skincare experience.",
        ingredients: "Water, Rice Extract, Glycerin, Sodium Cocoyl Isethionate, Vitamin E, Aloe Vera Extract, Coconut Oil Derivatives.",
        howToUse: "Apply a small amount to your damp face. Gently massage in circular motions to create a lather, then rinse thoroughly with water. Use daily for best results.",
        size: "50ml",
        sku: "TBS-RW-M-001",
        category: "Cleanser",
        tags: ["hydrating", "rice water", "moisturizer", "sustainable"],
        image: "product1.jpeg",
        images: [
            "product1.jpeg",
            "product1.jpeg",
            "product1.jpeg"
        ],
        inStock: true,
        rating: 4.8,
        reviews: 75
    },
    {
        id: 2,
        name: "Rice Brightening Cleansing Foam",
        brand: "Innisfree",
        price: 1500,
        originalPrice: 1800,
        discount: 17,
        description: "Premium Korean beauty product with natural ingredients. This eco-conscious cleansing foam is specially formulated with rice extracts and adapted to meet local skin needs at affordable prices.",
        ingredients: "Water, Rice Extract, Glycerin, Sodium Cocoyl Isethionate, Hyaluronic Acid, Butylene Glycol, Citrus Extract",
        howToUse: "Apply a small amount to damp face and massage in circular motions. Rinse thoroughly with lukewarm water.",
        size: "150ml",
        sku: "IN-RB-CF-002",
        category: "Cleanser",
        tags: ["brightening", "rice", "cleanser", "Korean"],
        image: "product2.jpeg",
        images: [
            "product2.jpeg",
            "product2.jpeg",
            "product2.jpeg"
        ],
        inStock: true,
        rating: 4.7,
        reviews: 63
    },
    {
        id: 3,
        name: "Rice Mask Wash Off",
        brand: "Skinfood",
        price: 1800,
        originalPrice: 2000,
        discount: 10,
        description: "Unique food-oriented organic skincare with rice extracts. This wash-off mask offers daily skincare at budget-friendly costs while effectively addressing local skincare needs.",
        ingredients: "Water, Rice Extract, Glycerin, Kaolin, Bentonite, Butylene Glycol, Panthenol, Allantoin, Centella Asiatica Extract",
        howToUse: "Apply a thin layer to clean skin, avoiding the eye and lip areas. Leave on for 10-15 minutes, then rinse off with lukewarm water.",
        size: "100ml",
        sku: "SF-RM-WO-003",
        category: "Mask",
        tags: ["rice", "mask", "organic", "wash-off"],
        image: "product3.jpeg",
        images: [
            "product3.jpeg",
            "product3.jpeg",
            "product3.jpeg"
        ],
        inStock: true,
        rating: 4.9,
        reviews: 89
    },
    {
        id: 4,
        name: "Rice Water Face Wash",
        brand: "Mamaearth",
        price: 600,
        originalPrice: 700,
        discount: 14,
        description: "Premium, cost-friendly moisturizer with rice water extracts. This local product is formulated to address Bangladeshi skin needs while maintaining global quality standards.",
        ingredients: "Water, Rice Extract, Glycerin, Hyaluronic Acid, Butylene Glycol, Cetearyl Alcohol, Dimethicone, Niacinamide, Panthenol, Centella Asiatica Extract",
        howToUse: "Apply a small amount to face after cleansing and toning. Gently massage into skin in upward motions until fully absorbed.",
        size: "100ml",
        sku: "ME-RW-FW-004",
        category: "Cleanser",
        tags: ["rice water", "face wash", "chemical-free", "eco-friendly"],
        image: "product4.jpeg",
        images: [
            "product4.jpeg",
            "product4.jpeg",
            "product4.jpeg"
        ],
        inStock: true,
        rating: 4.6,
        reviews: 52
    },
  
];

// Function to format price in BDT
function formatPrice(price) {
    return '৳' + price.toLocaleString();
}

// Function to create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.discount > 0 ? `<div class="discount-tag">-${product.discount}%</div>` : ''}
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-name">
                    <a href="product-details.html?id=${product.id}">${product.name}</a>
                </h3>
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${product.discount > 0 ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="add-to-wishlist" data-id="${product.id}"><i class="far fa-heart"></i></button>
                </div>
            </div>
        </div>
    `;
}

// Function to display featured products on homepage
function displayFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featuredProducts');
    if (featuredProductsContainer) {
        // Show all 5 products for featured section
        const featuredProducts = products;
        
        featuredProductsContainer.innerHTML = featuredProducts.map(product => 
            createProductCard(product)
        ).join('');
    }
}

// Function to display all products on products page
function displayAllProducts() {
    const productsContainer = document.getElementById('productsContainer');
    if (productsContainer) {
        productsContainer.innerHTML = products.map(product => 
            createProductCard(product)
        ).join('');
    }
}

// Function to display single product details
function displayProductDetails() {
    const productDetailsContainer = document.getElementById('productDetailsContainer');
    if (productDetailsContainer) {
        // Get product ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        
        // Find product by ID
        const product = products.find(p => p.id === productId);
        
        if (product) {
            // Update product details
            document.getElementById('productTitle').textContent = product.name;
            document.getElementById('productBrand').textContent = product.brand;
            document.getElementById('productDescription').textContent = product.description;
            
            // Update price
            const priceHTML = `
                <span class="current-price">${formatPrice(product.price)}</span>
                ${product.discount > 0 ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
            `;
            document.getElementById('productPrice').innerHTML = priceHTML;
            
            // Update main image
            document.getElementById('mainImage').src = product.image;
            
            // Update thumbnails
            const thumbnailsContainer = document.getElementById('productThumbnails');
            thumbnailsContainer.innerHTML = product.images.map((img, index) => `
                <div class="thumbnail ${index === 0 ? 'active' : ''}" data-img="${img}">
                    <img src="${img}" alt="${product.name} view ${index + 1}">
                </div>
            `).join('');
            
            // Add thumbnail click event
            const thumbnails = document.querySelectorAll('.thumbnail');
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', function() {
                    // Remove active class from all thumbnails
                    thumbnails.forEach(t => t.classList.remove('active'));
                    // Add active class to clicked thumbnail
                    this.classList.add('active');
                    // Update main image
                    document.getElementById('mainImage').src = this.getAttribute('data-img');
                });
            });
            
            // Update product details
            document.getElementById('productSku').textContent = product.sku;
            document.getElementById('productCategory').textContent = product.category;
            document.getElementById('productSize').textContent = product.size;
            
            // Update add to cart button
            const addToCartBtn = document.getElementById('addToCartBtn');
            addToCartBtn.setAttribute('data-id', product.id);
            
            // Update breadcrumb
            document.getElementById('productName').textContent = product.name;
        } else {
            // Product not found
            productDetailsContainer.innerHTML = `
                <div class="error-message">
                    <h2>Product Not Found</h2>
                    <p>The requested product could not be found.</p>
                    <a href="products.html" class="btn primary-btn">Back to Products</a>
                </div>
            `;
        }
    }
}

// Initialize products when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    displayFeaturedProducts();
    displayAllProducts();
    displayProductDetails();
});
