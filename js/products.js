const products = [
    {
        id: 1,
        name: "Burger",
        price: 8.99,
        category: "food",
        emoji: "🍔"
    },
    {
        id: 2,
        name: "Pizza Slice",
        price: 4.99,
        category: "food",
        emoji: "🍕"
    },
    {
        id: 3,
        name: "French Fries",
        price: 3.99,
        category: "food",
        emoji: "🍟"
    },
    {
        id: 4,
        name: "Hot Dog",
        price: 5.99,
        category: "food",
        emoji: "🌭"
    },
    {
        id: 5,
        name: "Sandwich",
        price: 6.99,
        category: "food",
        emoji: "🥪"
    },
    {
        id: 6,
        name: "Taco",
        price: 4.49,
        category: "food",
        emoji: "🌮"
    },
    {
        id: 7,
        name: "Coffee",
        price: 3.49,
        category: "beverage",
        emoji: "☕"
    },
    {
        id: 8,
        name: "Orange Juice",
        price: 4.99,
        category: "beverage",
        emoji: "🧃"
    },
    {
        id: 9,
        name: "Soda",
        price: 2.49,
        category: "beverage",
        emoji: "🥤"
    },
    {
        id: 10,
        name: "Bubble Tea",
        price: 5.49,
        category: "beverage",
        emoji: "🧋"
    },
    {
        id: 11,
        name: "Ice Cream",
        price: 4.99,
        category: "dessert",
        emoji: "🍦"
    },
    {
        id: 12,
        name: "Donut",
        price: 2.99,
        category: "dessert",
        emoji: "🍩"
    },
    {
        id: 13,
        name: "Cake Slice",
        price: 5.99,
        category: "dessert",
        emoji: "🍰"
    },
    {
        id: 14,
        name: "Cookie",
        price: 1.99,
        category: "dessert",
        emoji: "🍪"
    },
    {
        id: 15,
        name: "Chocolate",
        price: 3.49,
        category: "dessert",
        emoji: "🍫"
    }
];

function getProducts(category = 'all') {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

function getProductById(id) {
    return products.find(product => product.id === id);
}
