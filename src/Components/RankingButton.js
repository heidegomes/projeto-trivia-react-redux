import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
export default withRouter(RankingButton);
