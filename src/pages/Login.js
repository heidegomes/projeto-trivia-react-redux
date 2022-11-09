import React from 'react';
import PropTypes from 'prop-types'
import fetchApi from '../Api';

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

  handleClick = async () => {
    const { history } = this.props;
    const userToken = await fetchApi();
    localStorage.setItem('token', userToken);
    history.push('/game');
  };

  render() {
    const { disabled } = this.state;
    return (
      <div>
        <label htmlFor="name-input">
          <input
            onChange={this.handleChange}
            name="name"
            data-testid="input-player-name"
            id="name-input"
          />
        </label>
        <label htmlFor="email-input">
          <input
            name="email"
            onChange={this.handleChange}
            data-testid="input-gravatar-email"
            id="email-input"
          />
        </label>
        <button
          disabled={disabled}
          type="button"
          data-testid="btn-play"
          onClick={this.handleClick}
        >
          Play
        </button>
      </div>
    );
  }
}

Login.defaultProps = {
  history: () => { },
};

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default Login;
