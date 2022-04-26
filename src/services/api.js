export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';

  const response = await fetch(url);
  const categoriesObj = await response.json();
  return (categoriesObj);
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  if (categoryId && !query) {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID';

    const response = await fetch(url);
    const categoriesId = await response.json();
    return categoriesId;
  } if (!categoryId && query) {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=$QUERY';

    const response = await fetch(url);
    const queryResponse = await response.json();
    return queryResponse;
  }
  const url = 'https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID&q=$QUERY';

  const response = await fetch(url);
  const categoriesQuery = await response.json();
  return categoriesQuery;
}
