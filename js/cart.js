class Cart {
    constructor() {
        this.items = [];
        this.taxRate = 0.10;
    }

    addItem(productId, quantity = 1) {
        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const product = getProductById(productId);
            if (product) {
                this.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    emoji: product.emoji,
                    quantity: quantity
                });
            }
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
            }
        }
    }

    getSubtotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    getTax() {
        return this.getSubtotal() * this.taxRate;
    }

    getTotal() {
        return this.getSubtotal() + this.getTax();
    }

    getItemCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    isEmpty() {
        return this.items.length === 0;
    }

    clear() {
        this.items = [];
    }

    getItems() {
        return this.items;
    }
}
