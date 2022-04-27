import React from 'react';
import { getCategories } from '../services/api';

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
