async function loadProducts() {
try {
const response = await fetch("./products.json");

```
    if (!response.ok) {
        throw new Error("Cannot load products.json");
    }

    const products = await response.json();

    displayProducts(products);

    document.getElementById("searchInput").addEventListener("input", function () {
        const searchValue = this.value.toLowerCase();

        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchValue)
        );

        displayProducts(filtered);
    });

    document.getElementById("categoryFilter").addEventListener("change", function () {
        const category = this.value;

        if (category === "All") {
            displayProducts(products);
        } else {
            const filtered = products.filter(
                product => product.category === category
            );

            displayProducts(filtered);
        }
    });

} catch (error) {
    document.getElementById("productsContainer").innerHTML =
        "<h2 style='color:white;text-align:center;'>Error loading products</h2>";
}
```

}

function displayProducts(products) {
const container = document.getElementById("productsContainer");

```
container.innerHTML = "";

products.forEach(product => {
    container.innerHTML += `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">₹${product.price}</p>
                <p class="category">${product.category}</p>
            </div>
        </div>
    `;
});
```

}

loadProducts();
