import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import Load from '../Components/Load';
import QuestionCards from '../Components/QuestionCards';
import requestQuestions from '../Requisiçoẽs/RequestQuestions';
import './Game.css';
import setResults from '../redux/actions/actions';
import RankingButton from '../Components/RankingButton';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      canUptade: false,
    };
  }

  async componentDidMount() {
    const { history, dispatch, Questions } = this.props;
    // const fail = 3;
    const token = localStorage.getItem('token');
    const requestQuestion = await requestQuestions(token);
    if (requestQuestion.results.length === 0) {
      localStorage.clear();
      history.push('/');
    } else {
      const Results = requestQuestion.results;
      this.setState({
        canUptade: true,
      });
      if (Questions.length === 0) {
        dispatch(setResults(Results));
      }
    }
  }

  render() {
    const { canUptade } = this.state;
    return (
      <div>
        <RankingButton />
        { !canUptade ? <Load /> : (
          <>
            <Header />
            <div>Game</div>
            <QuestionCards />
          </>
        ) }
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  Questions: state.gamer.questions,
});

export default connect(mapStateToProps)(Game);
