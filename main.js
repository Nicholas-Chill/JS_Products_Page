let products = [
    {
        name: "Banana",
        description: "A yellow berry",
        price: 9 
    },
    {
        name: "Pineapple",
        description: "It's neither related to pines or apples",
        price: 15
    },
    {
        name: "Plum",
        description: "A purple fruit with a big seed",
        price: 10
    }
];

// Display all products
function showProducts() {
    let html = '';
    for(let product of products){
        html += `
            <div class="product">
                <h2>${product.name}</h2>
                <div class="info">
                    <p>${product.description}</p>
                    <p>Price: <b>${product.price}</b></p>
                </div>
                <button class="remove" data-product-name="${product.name}">Remove</button>
                <hr>
            </div>
        `;
    }
    document.querySelector('.products').innerHTML = html;
}

// Handel all click events
function handleEvents() {
    // Add event listener to entire body and listen for clicks
    document.querySelector('body').addEventListener('click', function(event) {
        let productClicked = event.target.closest('.product');
        // If clicked somewhere unrelated we just return
        if(!productClicked) {return;}

        // Get the info-div from the clicked product
        let infoProduct = productClicked.querySelector('.info');
        infoProduct.style.display = infoProduct.style.display === 'block' ? 'none' : 'block';

        // If the closest elemetn is the remove button
        let removeButton = event.target.closest('.remove');
        if(removeButton) {
            let productName = removeButton.getAttribute('data-product-name');
            // Remove product by name from array
            products = products.filter((product) => product.name !== productName);
            productClicked.remove();
            
        }
    });

    // Event listener fot the add product form that listens for submit, and not click
    let addProductForm = document.querySelector('#add-product-form');
    addProductForm.addEventListener('submit', function(event) {
        // Don't let the site reload when submit is clicked
        event.preventDefault();

        // Get the values from the form
        let name = document.querySelector('#name').value;
        let description = document.querySelector('#description').value;
        let price = Number(document.querySelector('#price').value);

        //Error handling, check that all fields are filled out
        if(name && description && price) {
             // New product
            let newProduct = {
                name: name,
                description: description,
                price: price
            };

            // Add the product to the products array
            products.push(newProduct);
            
            // Reset the form and show a new div
            let productsDiv = document.querySelector('.products');
            productsDiv.innerHTML = '';
            // Render the products again
            showProducts();
            //Reset the form
            addProductForm.reset();

        } else {
        alert('Please fill in all the fields!')
        };
    });
}

showProducts();
handleEvents();