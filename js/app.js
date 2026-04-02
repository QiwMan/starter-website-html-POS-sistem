const cart = new Cart();

function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById('datetime').textContent = now.toLocaleDateString('en-US', options);
}

function renderProducts(category = 'all') {
    const grid = document.getElementById('products-grid');
    const products = getProducts(category);
    
    grid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-emoji">${product.emoji}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
        </div>
    `).join('');

    grid.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const productId = parseInt(card.dataset.id);
            cart.addItem(productId);
            renderCart();
        });
    });
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const items = cart.getItems();

    if (items.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">Cart is empty</p>';
    } else {
        cartItems.innerHTML = items.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.emoji} ${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" data-action="decrease" data-id="${item.id}">-</button>
                    <span class="cart-item-qty">${item.quantity}</span>
                    <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
                    <button class="qty-btn remove" data-action="remove" data-id="${item.id}">✕</button>
                </div>
            </div>
        `).join('');
    }

    document.getElementById('subtotal').textContent = `$${cart.getSubtotal().toFixed(2)}`;
    document.getElementById('tax').textContent = `$${cart.getTax().toFixed(2)}`;
    document.getElementById('total').textContent = `$${cart.getTotal().toFixed(2)}`;

    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.disabled = cart.isEmpty();

    cartItems.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.dataset.id);
            const action = btn.dataset.action;
            const item = cart.getItems().find(i => i.id === productId);

            if (action === 'increase') {
                cart.updateQuantity(productId, item.quantity + 1);
            } else if (action === 'decrease') {
                cart.updateQuantity(productId, item.quantity - 1);
            } else if (action === 'remove') {
                cart.removeItem(productId);
            }

            renderCart();
        });
    });
}

function handleCheckout() {
    if (cart.isEmpty()) return;

    const modal = document.getElementById('modal');
    const summary = document.getElementById('order-summary');
    
    const itemCount = cart.getItemCount();
    const total = cart.getTotal();
    
    summary.innerHTML = `
        <strong>${itemCount} item(s)</strong><br>
        Total Amount: <strong style="color: #667eea; font-size: 24px;">$${total.toFixed(2)}</strong><br><br>
        Thank you for your purchase!
    `;
    
    modal.classList.add('active');
    cart.clear();
    renderCart();
}

function initCategoryFilter() {
    const buttons = document.querySelectorAll('.category-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.category);
        });
    });
}

function initModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('close-modal');

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

function init() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    renderProducts();
    renderCart();
    initCategoryFilter();
    initModal();

    document.getElementById('checkout-btn').addEventListener('click', handleCheckout);
}

document.addEventListener('DOMContentLoaded', init);
