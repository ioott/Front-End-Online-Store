import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Card from '../Components/Card';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      products: [],
    };
  }

  componentDidMount = async () => {
    const categoriesObj = await getCategories();
    this.setState({
      categories: categoriesObj,
    });
  }

  onCategoryClick = async ({ target }) => {
    const query = target.id;
    console.log(target);
    const productsObj = await getProductsFromCategoryAndQuery(query);
    this.setState({
      products: productsObj.results,
    });
  }

  callCategories = async () => {
    const categoriesObj = await getCategories();
    return categoriesObj.map((element) => (
      <button
        data-testid="category"
        type="button"
        key={ element.id }
      >
        { element.name }
      </button>
    ));
  }

  render() {
    const { categories, products } = this.state;
    return (
      <div>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Card />
        <Link to="/ShoppingCard" data-testid="shopping-cart-button">compra</Link>
        {categories.map((element) => (
          <button
            data-testid="category"
            type="button"
            key={ element.id }
            id={ element.id }
            onClick={ this.onCategoryClick }
          >
            { element.name }
          </button>
        ))}
        {products.map((element) => (
          <div data-testid="product" key={ element.id }>
            <h1>{ element.title }</h1>
            <img
              src={ element.thumbnail }
              alt="imagem do produto"
            />
            <p>{element.price}</p>
            <Link
              data-testid="product-detail-link"
              to={ `/productdetails/${element.id}` }
            >
              Detalhes
            </Link>
          </div>
        ))}
      </div>

    );
  }
}

export default Home;
