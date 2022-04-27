import React from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Card extends React.Component {
  constructor() {
    super();

    this.state = {
      query: '',
      lista: [],
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
    const returnAPI = await getProductsFromCategoryAndQuery(query);
    this.setState({
      lista: returnAPI.results,
    });
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
        {lista === []
          ? <p>Nenhum produto foi encontrado</p>
          : (
            lista.map((element) => (
              <div data-testid="product" key={ element.id }>
                <h1>{ element.title }</h1>
                <img
                  src={ element.thumbnail }
                  alt="imagem do produto"
                />
                <p>{ element.price }</p>
              </div>
            ))
          )}
      </div>
    );
  }
}

export default Card;
