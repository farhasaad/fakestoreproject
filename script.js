
const categorySelect = document.getElementById('categorySelect');
const productsContainer = document.getElementById('productsContainer');

fetch('https://fakestoreapi.com/products/categories')
  .then(res => res.json())
  .then(categories => {
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });
  });

categorySelect.addEventListener('change', () => {
  const selectedCategory = categorySelect.value;
  if (selectedCategory) {
    fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
      .then(res => res.json())
      .then(products => {
        displayProducts(products);
      });
  } else {
    productsContainer.innerHTML = '';
  }
});

function displayProducts(products) {
  productsContainer.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
    `;
    productsContainer.appendChild(card);
  });
}
