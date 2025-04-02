document.addEventListener('DOMContentLoaded', () => {
    /**
     * We removed "Face" and "Aesthetics" entirely
     * and combined all IV drips and single injections
     * into a single category: "IV Hydration & Injections".
     */
  
    // Updated categories
    const categories = [
      "All",
      "Weight Loss",
      "IV Hydration & Injections",
      "Buy Now Online"
    ];
  
    let selectedCategory = "All";
    let searchQuery = "";
  
    // Updated product list
    // Removed any items from the "Aesthetics" or "Face" category
    // Renamed "Hydration" to "IV Hydration & Injections"
    const products = [
      // Weight Loss
      { name: "Amino Acid Fat-Burning Injections", price: "$--", description: "Boost metabolism and support weight loss.", category: "Weight Loss" },
      { name: "Vitamin B12 Injections", price: "$--", description: "Increase energy levels and support overall health.", category: "Weight Loss" },
      { name: "Antioxidant Injections", price: "$--", description: "Glutathione injections to boost immune system and detoxify.", category: "Weight Loss" },
      { name: "Tirzepatide Injections", price: "$150 - $830", description: "Offered in 6-week, 4-week, and single injection packages.", category: "Weight Loss" },
      { name: "Appetite Suppressants", price: "$125", description: "Prescription-strength options with Lipo B or C included.", category: "Weight Loss" },
  
      // IV Hydration & Injections
      { name: "Lipo B & Lipo C", price: "$20 - $30", description: "Fat-burning injections available in single or double doses.", category: "IV Hydration & Injections" },
      { name: "Glutathione", price: "$20 - $30", description: "Antioxidant injection for detox and immune boost.", category: "IV Hydration & Injections" },
      { name: "B12", price: "$20 - $30", description: "Energy-enhancing injection in two dose options.", category: "IV Hydration & Injections" },
      { name: "Biotin", price: "$30", description: "Promotes skin, hair, and nail health.", category: "IV Hydration & Injections" },
      { name: "Toradol", price: "$25", description: "Pain relief through anti-inflammatory injection.", category: "IV Hydration & Injections" },
      { name: "Tri-Immune", price: "$30", description: "Blend of Glutathione, Vitamin C, and Zinc.", category: "IV Hydration & Injections" },
      { name: "Vitamin C", price: "$30", description: "Immune-boosting vitamin injection.", category: "IV Hydration & Injections" },
      { name: "NAD", price: "$100", description: "Supports energy production and neurological health.", category: "IV Hydration & Injections" },
      { name: "Myers' Cocktail", price: "$160", description: "Blend of vitamins for overall wellness.", category: "IV Hydration & Injections" },
      { name: "Quench", price: "$160", description: "Formulated for rapid rehydration.", category: "IV Hydration & Injections" },
      { name: "Inner Beauty", price: "$190", description: "Enhance skin, hair, and nails.", category: "IV Hydration & Injections" },
      { name: "Reboot", price: "$150", description: "Hangover relief and rehydration.", category: "IV Hydration & Injections" },
      { name: "I'm NEVER Drinking Again", price: "$170", description: "Enhanced hangover solution.", category: "IV Hydration & Injections" },
      { name: "B-Lean", price: "$160", description: "Boost metabolism and energy.", category: "IV Hydration & Injections" },
      { name: "Get-Up-&-Go", price: "$140", description: "Boost performance and energy.", category: "IV Hydration & Injections" },
      { name: "Recovery & Performance", price: "$170", description: "Support muscle recovery and endurance.", category: "IV Hydration & Injections" },
      { name: "Immunity", price: "$160", description: "Strengthen immune system.", category: "IV Hydration & Injections" },
      { name: "Tri-Immunity (IV)", price: "$180", description: "Comprehensive immune support.", category: "IV Hydration & Injections" },
  
      // Buy Now Online
      { name: "Vita Surge (16oz)", price: "$30", description: "Energy-boosting natural supplement.", category: "Buy Now Online" },
      { name: "Glutathione Gummies (60 count)", price: "$30", description: "Antioxidant gummies for immune and skin health.", category: "Buy Now Online" }
    ];
  
    // ============ CART FUNCTIONALITY ============
    let cart = [];
  
    function addToCart(product) {
      cart.push(product);
      updateCartCount();
      renderCartItems();
    }
  
    function updateCartCount() {
      const cartButton = document.getElementById('cart-button');
      cartButton.textContent = `Cart (${cart.length})`;
    }
  
    function renderCartItems() {
      const cartItemsContainer = document.getElementById('cart-items');
      cartItemsContainer.innerHTML = "";
      cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
  
        const itemInfo = document.createElement("div");
        itemInfo.textContent = `${item.name} - ${item.price}`;
  
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
          removeFromCart(index);
        });
  
        itemDiv.appendChild(itemInfo);
        itemDiv.appendChild(removeBtn);
        cartItemsContainer.appendChild(itemDiv);
      });
    }
  
    function removeFromCart(index) {
      cart.splice(index, 1);
      updateCartCount();
      renderCartItems();
    }
  
    // DOM Elements for cart overlay
    const cartButton = document.getElementById("cart-button");
    const cartOverlay = document.getElementById("cart-overlay");
    const closeCartButton = document.getElementById("close-cart");
  
    // Toggle cart overlay when cart button is clicked
    cartButton.addEventListener("click", () => {
      cartOverlay.classList.toggle("active");
    });
  
    // Close cart overlay
    closeCartButton.addEventListener("click", () => {
      cartOverlay.classList.remove("active");
    });
  
    // ============ PRODUCT DISPLAY & SEARCH ============
    const categoriesContainer = document.querySelector('.categories');
    const productGrid = document.getElementById('productGrid');
    const searchInput = document.getElementById('searchInput');
  
    // Render category buttons
    function renderCategories() {
      categoriesContainer.innerHTML = "";
      categories.forEach(category => {
        const btn = document.createElement("button");
        btn.textContent = category;
        btn.classList.toggle("active", category === selectedCategory);
        btn.addEventListener("click", () => {
          selectedCategory = category;
          renderCategories();
          renderProducts();
        });
        categoriesContainer.appendChild(btn);
      });
    }
  
    // Render products based on filters
    function renderProducts() {
      productGrid.innerHTML = "";
      const filteredProducts = products.filter(product => {
        const matchesCategory = (selectedCategory === "All" || product.category === selectedCategory);
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
  
      filteredProducts.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
  
        // Product image (using a placeholder)
        const img = document.createElement("img");
        img.src = "https://via.placeholder.com/300x200";
        img.alt = product.name;
        card.appendChild(img);
  
        // Product title
        const title = document.createElement("h3");
        title.textContent = product.name;
        card.appendChild(title);
  
        // Product description
        const desc = document.createElement("p");
        desc.textContent = product.description;
        card.appendChild(desc);
  
        // Price information
        const price = document.createElement("p");
        price.className = "price";
        price.textContent = product.price;
        card.appendChild(price);
  
        // Action buttons
        const btnsDiv = document.createElement("div");
        btnsDiv.className = "buttons";
  
        const infoBtn = document.createElement("button");
        infoBtn.className = "info-btn";
        infoBtn.textContent = "More Info";
        // You can implement a modal or separate page for detailed info
        btnsDiv.appendChild(infoBtn);
  
        // Show "Add to Cart" only if it's in "Buy Now Online"
        if (product.category === "Buy Now Online") {
          const addToCartBtn = document.createElement("button");
          addToCartBtn.className = "buy-btn";
          addToCartBtn.textContent = "Add to Cart";
          addToCartBtn.addEventListener("click", () => {
            addToCart(product);
          });
          btnsDiv.appendChild(addToCartBtn);
        }
  
        card.appendChild(btnsDiv);
        productGrid.appendChild(card);
      });
    }
  
    // Event listener for the search input
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  
    // Initial render
    renderCategories();
    renderProducts();
  });
  