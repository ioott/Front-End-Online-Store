import React from 'react';
import propTypes from 'prop-types';
import { getProductsFromId } from '../services/api';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      lista: [],
    };
  }

  componentDidMount() {
    this.pegarProduto();
  }

  pegarProduto = async () => {
    const { match: { params: { productId } } } = this.props;
    const product = await getProductsFromId(productId);
    this.setState({
      lista: product,
    });
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
          type="button"
        >
          Carrinho
        </button>
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
  match: propTypes.string.isRequired,
  params: propTypes.string.isRequired,
  productId: propTypes.string.isRequired,
};

export default ProductDetails;
