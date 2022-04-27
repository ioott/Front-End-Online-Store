import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
import Card from '../Components/Card';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
    };
  }

  componentDidMount = async () => {
    const categoriesObj = await getCategories();
    this.setState({
      categories: categoriesObj,
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
    const { categories } = this.state;
    console.log(categories);
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
          >
            { element.name }
          </button>
        ))}
      </div>

    );
  }
}

export default Home;
