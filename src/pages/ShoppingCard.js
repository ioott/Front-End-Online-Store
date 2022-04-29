import React from 'react';
import { getProductsFromId } from '../services/api';

class ShoppingCard extends React.Component {
  constructor() {
    super();

    this.state = {
      cartItens: [],
    };
  }

  async componentDidMount() {
    try {
      const products = await this.getProducts();
      this.setState({
        cartItens: products,
      });
    } catch (err) {
      console.log('erro');
    }
  }

  getProducts = async () => {
    const storedItens = JSON.parse(localStorage.getItem('cart'));
    const productsPromises = await Promise.all(storedItens.map(async (element) => (
      getProductsFromId(element)
    )));
    const products = productsPromises;
    return products;
  }

  render() {
    const { cartItens } = this.state;
    return (
      <div>
        <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
        {cartItens.map((element) => (
          <div key={ element.id }>
            <h3 data-testid="shopping-cart-product-name">{ element.title }</h3>
            <h4 data-testid="shopping-cart-product-quantity">1</h4>
            <img
              src={ element.thumbnail }
              alt="imagem do produto"
            />
            <p>{element.price}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default ShoppingCard;

// Uso correto do Promise.all (para usar o .map com async/await) retirado do link:
// https://www.techiediaries.com/promise-all-map-async-await-example/
