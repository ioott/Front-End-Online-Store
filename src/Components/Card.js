import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Card extends React.Component {
  constructor() {
    super();

    this.state = {
      query: '',
      lista: [],
      productsToSend: [],
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  onHandleClick = async () => {
    const { query } = this.state;
    const returnAPI = await getProductsFromCategoryAndQuery('', query);
    this.setState({
      lista: returnAPI.results,
    });
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
    const { lista, query } = this.state;
    return (
      <div>
        <label htmlFor="input">
          <input
            data-testid="query-input"
            type="text"
            id="input"
            name="query"
            value={ query }
            onChange={ this.onInputChange }
          />
        </label>
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.onHandleClick }
        >
          Enviar
        </button>
        {lista.length === 0
          ? <p>Nenhum produto foi encontrado</p>
          : (
            lista.map((element) => (
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
            ))
          )}
      </div>
    );
  }
}

export default Card;
