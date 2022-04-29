export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';

  const response = await fetch(url);
  const categoriesObj = await response.json();
  return (categoriesObj);
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (categoryId && !query) {
    const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;

    const response = await fetch(url);
    const categoriesId = await response.json();
    return categoriesId;
  } if (!categoryId && query) {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;

    const response = await fetch(url);
    const queryResponse = await response.json();
    return queryResponse;
  }
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;

  const response = await fetch(url);
  const categoriesQuery = await response.json();
  return categoriesQuery;
}

export async function getProductsFromId(productId) {
  const url = `https://api.mercadolibre.com/items/${productId}`;

  const response = await fetch(url);
  const productsId = await response.json();
  return productsId;
}
