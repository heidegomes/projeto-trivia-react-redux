import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TiHome } from 'react-icons/ti';
import { connect } from 'react-redux';
import PlayersCards from '../Components/PlayersCards';
import { resetScore } from '../redux/actions/actions';

class Rankings extends Component {
  handleHome = async () => {
    const { history, dispatch } = this.props;
    dispatch(resetScore());
    history.push('/');
  };

  render() {
    return (
      <h1
        data-testid="ranking-title"
      >
        <button type="button" onClick={ this.handleHome } data-testid="btn-go-home">
          <TiHome pointerEvents="none" />
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
export default connect()(Rankings);
