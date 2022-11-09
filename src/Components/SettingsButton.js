import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class SettingsButton extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    return (
      <button
        onClick={ this.handleClick }
        type="button"
        data-testid="btn-settings"
      >
        Settings
      </button>
    );
  }
}

SettingsButton.defaultProps = {
  history: () => {},
};
SettingsButton.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
export default withRouter(SettingsButton);
