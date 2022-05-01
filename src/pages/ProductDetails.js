import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromId } from '../services/api';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: [],
    };

    this.addCartButton = this.addCartButton.bind(this);
  }

  componentDidMount() {
    this.pegarProduto();
  }

  storeCart = (cartProduct) => {
    const storedProducts = JSON.parse(localStorage.getItem('cart'));
    if (storedProducts) {
      localStorage.setItem('cart', JSON.stringify([...storedProducts, cartProduct]));
    } else {
      localStorage.setItem('cart', JSON.stringify(cartProduct));
    }
  }

  pegarProduto = async () => {
    const { match: { params: { productId } } } = this.props;
    const product = await getProductsFromId(productId);
    this.setState({
      lista: product,
    });
  }

  addCartButton() {
    const { lista } = this.state;
    const { id } = lista;
    const items = JSON.parse(localStorage.getItem('cart'));
    if (items) {
      localStorage.setItem('cart', JSON.stringify([...items, id]));
    } else {
      localStorage.setItem('cart', JSON.stringify([id]));
    }
  }

  render() {
    const { lista } = this.state;
    const { attributes } = lista;
    return (
      <div>
        <h1 data-testid="product-detail-name">{ lista.title }</h1>
        <img
          src={ lista.thumbnail }
          alt="imagem do produto"
        />
        <p>{lista.price}</p>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          key={ lista.id }
          id={ lista.id }
          onClick={ () => this.addCartButton(lista) }
        >
          Adicionar ao carrinho
        </button>
        <div>
          <br />
          <Link to="/ShoppingCard" data-testid="shopping-cart-button">
            carrinho de compras
            <img src="https://super.so/icon/dark/shopping-cart.svg" alt="carrinho de compras" />
          </Link>
        </div>
        <h4>Especificações Técnicas:</h4>
        {attributes !== undefined
          && (
            attributes.map((element) => (
              <li key={ element.id }>
                {element.name}
                :
                {' '}
                {element.value_name}
              </li>
            )))}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      productId: propTypes.string,
    }) }).isRequired,
};

export default ProductDetails;
