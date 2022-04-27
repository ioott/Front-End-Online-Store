import React from 'react';
import Card from '../Components/Card';

class Home extends React.Component {
  render() {
    return (
      <div>
        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Card />
      </div>
    );
  }
}

export default Home;
