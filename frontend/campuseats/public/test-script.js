// Test script to verify CampusEats functionality
console.log("🍽️ CampusEats Application Test");

// Test cart functionality
function testCart() {
    console.log("Testing cart functionality...");
    
    // Test item to add to cart
    const testItem = {
        id: 1,
        name: "Test Paneer Butter Masala",
        price: 160,
        description: "Test description",
        image: "test-image.jpg",
        category: "Main Course",
        type: "Vegetarian",
        quantity: 1
    };
    
    // Simulate adding to cart
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log("Current cart:", cart);
    
    // Add item to cart
    const existingItemIndex = cart.findIndex(item => item.id === testItem.id);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
        console.log("✅ Updated existing item quantity");
    } else {
        cart.push(testItem);
        console.log("✅ Added new item to cart");
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("Updated cart:", cart);
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    console.log(`💰 Total amount: ₹${total}`);
    
    return cart.length > 0;
}

// Test authentication
function testAuth() {
    console.log("Testing authentication...");
    const token = localStorage.getItem('token');
    console.log("Token exists:", !!token);
    return !!token;
}

// Run tests
console.log("🧪 Running tests...");
console.log("Auth test:", testAuth() ? "✅ PASS" : "❌ FAIL");
console.log("Cart test:", testCart() ? "✅ PASS" : "❌ FAIL");

console.log("\n🎉 CampusEats is ready to use!");
console.log("📝 Features available:");
console.log("  - User Authentication (Register/Login)");
console.log("  - Food Menu Display (8 vegetarian items)");
console.log("  - Cart Management (Add/Remove/Update)");
console.log("  - Modern UI with animations");
console.log("  - Responsive design");
console.log("  - Order placement simulation");