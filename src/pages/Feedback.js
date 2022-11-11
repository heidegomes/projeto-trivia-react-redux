import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import RankingButton from '../Components/RankingButton';

const THREE = 3;

class Feedback extends Component {
  feedbackText = () => {
    const { assertions } = this.props;
    console.log(assertions);
    if (assertions < THREE) {
      return 'Could be better...';
    }
    return 'Well Done!';
  };

  handleClick = () => {
    const {history} = this.props;
    history.push('/');
  }

  render() {
    const { score, assertions } = this.props;
    return (
      <>
        <Header />
        <RankingButton />
        <div data-testid="feedback-text">{this.feedbackText()}</div>
        <div data-testid="feedback-total-score">{Number(score)}</div>
        <div data-testid="feedback-total-question">{Number(assertions)}</div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={this.handleClick}
        >
          Play Again
        </button>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});
export default connect(mapStateToProps)(Feedback);
