import PropTypes from 'prop-types';
import pluralize from 'pluralize';

import './Header.scss';

const Header = ({ title, alerts }) => (
  <div className="accordion__header__inner">
    <h3 className="accordion__header__title">
      {title}
    </h3>

    {!!alerts && (
      <span>
        <i className="fas fa-exclamation-triangle icon-left accordion__header__alert-icon" />
        {`${alerts} ${pluralize('issue', alerts)}`}
      </span>
    )}
  </div>
);

Header.propTypes = {
  alerts: PropTypes.number,
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  alerts: 0,
};

export default Header;
