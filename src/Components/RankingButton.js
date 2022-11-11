import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class RankingButton extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/rankings');
  };

  render() {
    return (
      <button
        onClick={ this.handleClick }
        type="button"
        data-testid="btn-ranking"
      >
        Ranking
      </button>
    );
  }
}
RankingButton.defaultProps = {
  history: () => { },
};

RankingButton.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
export default connect()(withRouter(RankingButton));
