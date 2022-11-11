import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TiHome } from 'react-icons/ti';
import PlayersCards from '../Components/PlayersCards';

class Rankings extends Component {
  handleHome = async () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <h1
        data-testid="ranking-title"
      >
        <button type="button" onClick={ this.handleHome } data-testid="btn-go-home">
          <TiHome />
        </button>
        Rankings
        <PlayersCards />
      </h1>
    );
  }
}

Rankings.propTypes = {
  email: PropTypes.any,
  name: PropTypes.shape({
    charAt: PropTypes.func,
    slice: PropTypes.func,
  }),
  score: PropTypes.any,
}.isRequired;
export default Rankings;
