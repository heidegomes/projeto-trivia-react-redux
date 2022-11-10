import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Load from './Load';
import Timer from './Timer';

const THIRTY_SECONDS = 30000;

class QuestionCards extends Component {
  state = ({
    loading: true,
    Answers: '',
    Page: 0,
    disabled: false,
  });

  componentDidMount() {
    const { Results } = this.props;
    const { Page } = this.state;
    const arrays = Results[Page].incorrect_answers;
    arrays.push(Results[Page].correct_answer);
    this.setState({
      loading: false,
      Answers: arrays,
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
    for (let i = answers.length - 1; i > 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [
        newAnswersArr[i],
        newAnswersArr[randomIndex],
      ] = [newAnswersArr[randomIndex], newAnswersArr[i]];
    }
    return newAnswersArr;
  };

  handleAnswers = (event) => {
    const { id } = event.target;
    console.log(id);
  };

  render() {
    const { loading, Answers, Page, disabled } = this.state;
    const { Results } = this.props;
    console.log('Answers', Answers);
    const options = this.randomAnswers(Answers);
    console.log('Opções', options);
    return (
      <div>
        { loading ? <Load /> : (
          <>
            <Timer />
            <div data-testid="question-category">
              {`Categoria: ${Results[Page].category}`}
            </div>
            <div data-testid="question-text">
              {`Pergunta: ${Results[Page].question}`}
            </div>
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
                  >
                    {option}
                  </button>
                ))
              }
            </div>
          </>
        ) }
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
  Question: state.gamer.question,
});

export default connect(mapStateToProps)(QuestionCards);
