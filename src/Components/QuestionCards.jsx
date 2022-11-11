import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveAssertions } from '../redux/actions/actions';
import Load from './Load';
import Timer from './Timer';
import '../Style/QuestionCard.css';

const THIRTY_SECONDS = 30000;
const FOUR = 4;

class QuestionCards extends Component {
  state = ({
    loading: true,
    Answers: '',
    Page: 0,
    disabled: false,
    assertions: 0,
    showButton: false,
  });

  componentDidMount() {
    const { Results } = this.props;
    console.log(Results);
    const { Page } = this.state;
    const arrayConjunto = Results[Page].incorrect_answers;
    arrayConjunto.push(Results[Page].correct_answer);
    const ObjetoSemRepeticao = new Set(arrayConjunto);
    const ArrayDoObjeto = Array.from(ObjetoSemRepeticao);
    console.log('NovoArray', ArrayDoObjeto);
    // var novaArr = arr.filter((este, i) => arr.indexOf(este) === i);
    this.setState({
      loading: false,
      Answers: ArrayDoObjeto,
    });
    setTimeout(() => {
      this.setState((prevState) => ({
        ...prevState,
        disabled: true,
      }));
    }, THIRTY_SECONDS);
  }

  randomAnswers = (answers) => {
    const newAnswersArr = answers;
    console.log(newAnswersArr);
    for (let i = answers.length - 1; i > 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [
        newAnswersArr[i],
        newAnswersArr[randomIndex],
      ] = [newAnswersArr[randomIndex], newAnswersArr[i]];
    }
    console.log(newAnswersArr);
    return newAnswersArr;
  };

  handleAnswers = (event) => {
    this.setState((prevState) => ({
      ...prevState,
      showButton: true,
    }));

    const { id } = event.target;
    const { dispatch, Results } = this.props;
    // console.log(Results[1]);
    const { Page } = this.state;
    const dificulty = Results[Page].difficulty;
    let valueDifficulty = 0;
    const tree = 3;
    const two = 2;
    const one = 1;
    const ten = 10;
    switch (dificulty) {
    case 'hard':
      valueDifficulty = tree;
      break;
    case 'medium':
      valueDifficulty = two;
      break;
    case 'easy':
      valueDifficulty = one;
      break;
    default:
      break;
    }
    if (id === Results[Page].correct_answer) {
      const timer = event.target.parentNode.previousSibling.innerHTML;
      const score = ten + (Number(timer) * valueDifficulty);
      console.log('batata');
      dispatch(saveAssertions(score));
    }
  };

  handleClick = () => {
    const { Page } = this.state;
    const { history } = this.props;
    if (Page === FOUR) history.push('/feedback');
    else {
      this.setState((prevState) => ({
        ...prevState,
        showButton: false,
        Page: prevState.Page + 1,
      }), () => this.componentDidMount());
    }
  };

  render() {
    const { loading, Answers, Page, disabled, showButton } = this.state;
    const { Results } = this.props;
    // console.log('Answers', Answers);
    const options = this.randomAnswers(Answers);
    console.log('Opções', options);
    return (
      <div>
        { loading ? <Load /> : (
          <>
            <div data-testid="question-category">
              {`${Results[Page].category}`}
            </div>
            <div data-testid="question-text">
              {`${Results[Page].question}`}
            </div>
            <Timer />
            <div data-testid="answer-options">
              {
                options.map((option, i) => (
                  <button
                    type="button"
                    onClick={ this.handleAnswers }
                    key={ i }
                    id={ option }
                    disabled={ disabled }
                    data-testid={ option === Results[Page].correct_answer
                      ? 'correct-answer'
                      : `wrong-answer-${Results[Page]
                        .incorrect_answers.indexOf(option)}` }
                    className={ option === Results[Page].correct_answer
                      ? `${showButton}Correct`
                      : `${showButton}Incorrect` }
                  >
                    {option}
                  </button>
                ))
              }
            </div>
          </>
        ) }
        { showButton
          && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleClick }
            >
              Next
            </button>
          )}
      </div>
    );
  }
}

QuestionCards.propTypes = {
  results: PropTypes.shape({
    map: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  Results: state.gamer.questions,
});

export default connect(mapStateToProps)(withRouter(QuestionCards));
