import React from 'react';
import { connect } from 'react-redux';
import requestCategory from '../Requisiçoẽs/RequestCategory';
import Load from './Load';

class Categorys extends React.Component {
  state = {
    CategoryList: [],
    Loading: true,
  };

  async componentDidMount() {
    const CategoryList = await requestCategory();
    const CategoryListDesestruturado = CategoryList.trivia_categories;
    this.setState({
      Loading: false,
      CategoryList: CategoryListDesestruturado,
    });
  }

  render() {
    const { CategoryList, Loading } = this.state;
    return (
      <div>
        { Loading ? <Load />
          : (
            <div>
              <h1> Categorias! </h1>
              { CategoryList.map((e) => (
                <button
                  key={ e.id }
                  type="button"
                  name="Category"
                  value={ e.id }
                  id="button"
                  onClick={ this.handleChange }
                >
                  { e.name }
                </button>
              )) }
            </div>
          ) }
      </div>
    );
  }
}

export default connect()(Categorys);
