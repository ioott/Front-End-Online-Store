import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import Card from '../Components/Card';
// import ShoppingCard from './ShoppingCard';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      products: [],
      productsToSend: [],
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

  sendToCart = ({ target }) => {
    const productId = target.id;
    this.setState((prevState) => ({
      productsToSend: [...prevState.productsToSend, productId],
    }), () => {
      this.storeCart();
    });
  }

  storeCart = () => {
    const { productsToSend } = this.state;
    localStorage.setItem('cart', JSON.stringify(productsToSend));
  }

  render() {
    const { categories, products, productsToSend } = this.state;
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
            <button
              data-testid="product-add-to-cart"
              type="button"
              key={ element.id }
              id={ element.id }
              onClick={ this.sendToCart }
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
        <div>{productsToSend}</div>
        {/* <Route
          path="/shoppingcard"
          render={ (props) => (<ShoppingCard
            { ... props }
            productsToCart={ productsToSend }
          />) }
        /> */}
      </div>

    );
  }
}

export default Home;
