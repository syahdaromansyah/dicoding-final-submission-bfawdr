import cn from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function NavBoardNavLink({
  to,
  icon,
  text,
  handleClick = () => null,
}) {
  return (
    <p>
      <NavLink
        className={({ isActive }) => {
          return cn(
            'inline-block w-full rounded-md p-4 transition hover:bg-gray-200 focus:bg-gray-200 active:bg-gray-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:active:bg-gray-600',
            {
              'bg-gray-100 font-bold hover:!bg-gray-100 focus:!bg-gray-100 active:!bg-gray-100 dark:bg-gray-700 dark:hover:!bg-gray-700 dark:focus:!bg-gray-700 dark:active:!bg-gray-700':
                isActive,
            },
          );
        }}
        to={to}
        onClick={handleClick}
      >
        <span className="inline-flex items-center gap-x-4">
          <span>{icon}</span> <span className="inline-block">{text}</span>
        </span>
      </NavLink>
    </p>
  );
}

NavBoardNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};
