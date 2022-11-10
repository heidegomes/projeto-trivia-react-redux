import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import Load from '../Components/Load';
import QuestionCards from '../Components/QuestionCards';
import requestQuestions from '../Requisiçoẽs/RequestQuestions';
import './Game.css';

class Game extends React.Component {
  state = {
    Results: {},
    canUptade: false,
  };

  async componentDidMount() {
    const { history } = this.props;
    // const fail = 3;
    const token = localStorage.getItem('token');
    const requestQuestion = await requestQuestions(token);
    if (requestQuestion.results.length === 0) {
      localStorage.clear();
      history.push('/');
    } else {
      const Results = requestQuestion.results;
      this.setState({
        Results,
        canUptade: true,
      });
    }
  }

  render() {
    const { Results, canUptade } = this.state;
    console.log(Results);
    return (
      <div>
        { !canUptade ? <Load /> : (
          <>
            <Header />
            <div>Game</div>
            <QuestionCards Results={ Results } />
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
export default connect()(Game);
