import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SettingsButton from '../Components/SettingsButton';
import fetchTokenApi from '../Requisiçoẽs/RequestToken';
import { userAction } from '../redux/actions/actions';
import logo from '../trivia.png';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    disabled: true,
  };

  handleChange = (e) => {
    const { name, type, checked } = e.target;
    const value = type === 'checkbox' ? checked : e.target.value;
    this.setState({
      [name]: value,
    }, () => this.isButtonDisabled());
  };

  handleClick = async () => {
    const { history } = this.props;
    const userToken = await fetchTokenApi();
    localStorage.setItem('token', userToken.token);
    const { dispatch } = this.props;
    dispatch(userAction(this.state));
    history.push('/game');
  };

  isButtonDisabled = () => {
    const { state } = this;
    const nameLength = 1;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const emailTest = regex.test(state.email);
    if (state.name.length >= nameLength && emailTest) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  render() {
    const { disabled } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
          <div>
            <label htmlFor="name-input">
              <input
                onChange={ this.handleChange }
                name="name"
                data-testid="input-player-name"
                id="name-input"
              />
            </label>
            <label htmlFor="email-input">
              <input
                name="email"
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
                id="email-input"
              />
            </label>
            <button
              disabled={ disabled }
              type="button"
              data-testid="btn-play"
              onClick={ this.handleClick }
            >
              Play
            </button>
            <SettingsButton />
          </div>
        </header>
      </div>
    );
  }
}

Login.defaultProps = {
  history: () => { },
  dispatch: () => {},
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
};

export default connect()(Login);
