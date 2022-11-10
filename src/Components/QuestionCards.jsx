import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Load from './Load';

class QuestionCards extends Component {
  state = ({
    loading: true,
    Answers: '',
    Page: 0,
  });

  componentDidMount() {
    const { Results } = this.props;
    const { Page } = this.state;
    const arrays = Results[Page].incorrect_answers;
    console.log(Results);
    arrays.push(Results[Page].correct_answer);
    this.setState({
      loading: false,
      Answers: arrays,
    });
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
    const { loading, Answers, Page } = this.state;
    const { Results } = this.props;
    const options = this.randomAnswers(Answers);
    return (
      <div>
        { loading ? <Load /> : (
          <>
            {/* { console.log(Question) } */}
            { console.log(options) }
            <div data-testid="question-category">
              {`Categoria: ${Results[Page].category}`}
            </div>
            <div data-testid="question-text">
              {`Categoria: ${Results[Page].question}`}
            </div>
            <div data-testid="answer-options">
              {
                options.map((option) => (
                  <button
                    type="button"
                    onClick={ this.handleAnswers }
                    key={ option }
                    id={ option }
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
