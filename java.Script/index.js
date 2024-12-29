// Archivo: script.js

// Selección de elementos del DOM
const productContainer = document.querySelector('.cards');
const cart = []; // Array para almacenar los productos añadidos al carrito

// Función para obtener datos de productos desde una API REST
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products'); // API ficticia
        const products = await response.json();
        displayProducts(products);
        console.log(products);
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

function displayProducts(products) {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const clearCart = document.getElementById('clear-cart');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updateCartUI = () => {
        cartCount.textContent = cart.length;
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.textContent = `${item.name} - $${item.price}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar';
            removeButton.className = 'btn btn-sm btn-danger';
            removeButton.addEventListener('click', () => {
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartUI();
            });

            li.appendChild(removeButton);
            cartItems.appendChild(li);
        });
    };




    products.forEach(product => {
        const productCard = document.createElement('article');
        productCard.innerHTML = `
            <a href="#"></a>
            <figure>
                <img src="${product.image}" alt="${product.title}">
            </figure>
            <div class="tarjeta-content">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p id="price"><strong>Precio: $${product.price.toFixed(2)}</strong></p>
                <button class="add-to-cart btn btn-primary" 
                 data-id="${product.id}" 
                 data-name="${product.title}"
                 data-price="${product.price.toFixed(2)}"
                >Añadir al carrito</button>
            </div>
        `;
        productContainer.appendChild(productCard);
    });

    // Funcionalidad para agregar items al carrito (solo una vez)
    document.querySelectorAll('.add-to-cart').forEach(button => {
       



        button.addEventListener('click', () => {
            const id = button.dataset.id;
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);

            // Verificar si el item ya existe en el carrito
            const existingItem = cart.find(item => item.id === id);
            if (!existingItem) {
                cart.push({ id, name, price });
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartUI();
                  // Smooth scroll to the top
                   window.scrollTo({
                       top: 0,
                       behavior: 'smooth'
                   });
            } else {
                alert('El producto ya está en el carrito.');
            }
        });
    });
}



// Función para añadir productos al carrito
function addToCart(event) {
    const productId = event.target.dataset.id;

    // Verifica si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        const productTitle = event.target.parentElement.querySelector('h2')?.innerText;
        const productPrice = parseFloat(event.target.parentElement.querySelector('strong').innerText.replace('$', ''));
        cart.push({
            id: productId,
            title: productTitle,
            price: productPrice,
            quantity: 1
        });
    }

    updateCartDisplay();
}

// Función para mostrar el carrito actualizado
function updateCartDisplay() {
    const cartContainer = document.querySelector('#cart-container');
    if (!cartContainer) return;

    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p>${item.title} - Cantidad: ${item.quantity} - Precio: $${(item.price * item.quantity).toFixed(2)}</p>
        `;
        cartContainer.appendChild(cartItem);
    });
}

// Inicializa la carga de productos
fetchProducts();


//funcionalidad del modal
document.addEventListener("DOMContentLoaded", () => {
    //selecionando elementos que se encuentran en el modal 
    const articles = document.querySelectorAll("article");
    const modal = document.getElementById("articleModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalImage = document.getElementById("modalImage");
    const modalDescription = document.getElementById("modalDescription");
    const modalPrice = document.getElementById('modalPrice');
//iterando con forEach articulos de html ya escritos en el archivo.html
    console.log(articles)
    articles.forEach((article) => {
        //añadiendo una escucha para hacer click a cada uno de ellos 
        article.addEventListener("click", () => {
           // console.log('estoy haciendo click, escucha añadida')
            //selecionando los elementos que estan en el articulo html y ingresando a sus valores
            const image = article.querySelector("img").src;
            const title = article.querySelector("h2").textContent;
            const description = article.querySelector("#description").textContent;
            const price = article.querySelector("#price").textContent;
           
            // ingresando a las propiedades de los elementos del modal y asignando
            // los valores de los elementos de articulos del html
            modalImage.src = image;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modalPrice.textContent = price;

            // Show the modal
            const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
        });
    });
});


//Modal productos carrito
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsList = document.getElementById("cart-items");
    const cartCount = document.getElementById('cart-count');
    const clearCart = document.getElementById('clear-cart');

    // Retrieve the cart from localStorage or initialize an empty cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to show an empty cart message
    const onShowEmptyMessage = () => {
        cartCount.textContent = "0"; // Reset cart count
        cartItemsList.innerHTML = ''; // Clear the cart items list
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent = "No hay productos añadidos al carrito";
        emptyMessage.classList.add("list-group-item", "text-center");
        cartItemsList.appendChild(emptyMessage);
    };

    // Function to update the cart UI
    const updateCartUI = () => {
        cartCount.textContent = cart.length; // Update the cart count
        cartItemsList.innerHTML = ''; // Clear the cart items list
        if (cart.length === 0) {
            onShowEmptyMessage();
            return;
        }
        cart.forEach((item, index) => {
            // Create a new list item for each cart product
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.textContent = `${item.name} - $${item.price}`;

            // Create a remove button for each product
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar';
            removeButton.className = 'btn btn-sm btn-danger';

            // Add event listener for removing items
            removeButton.addEventListener('click', () => {
                cart.splice(index, 1); // Remove item from cart array
                localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
                updateCartUI(); // Update UI after removal
            });

            li.appendChild(removeButton); // Add remove button to list item
            cartItemsList.appendChild(li); // Add list item to cart UI
        });
    };

    // Add event listeners to "Add to Cart" buttons
// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const id = button.dataset.id;
        const name = button.dataset.name;
        const price = button.dataset.price;
        
        cart.push({ id, name, price }); // Add product to cart
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        updateCartUI(); // Update UI

        // Smooth scroll to the top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});


    // Clear cart event listener
    clearCart.addEventListener('click', () => {
        cart = []; // Empty the cart array
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
        onShowEmptyMessage(); // Show empty cart message
    });

    // Initialize cart UI on page load
    if (cart.length === 0) {
        onShowEmptyMessage();
    } else {
        updateCartUI();
    }
});

