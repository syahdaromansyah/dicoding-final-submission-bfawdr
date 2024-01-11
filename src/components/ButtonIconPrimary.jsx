import cn from 'classnames';
import PropTypes from 'prop-types';

export default function ButtonIconPrimary({
  text,
  icon,
  minimalist = false,
  handleClick,
}) {
  return (
    <p>
      <button
        className="inline-block rounded-md bg-gray-200 px-4 py-2 shadow shadow-gray-300 transition hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-200 dark:bg-gray-700 dark:shadow-none dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:active:bg-gray-700"
        type="button"
        onClick={handleClick}
      >
        <span className="flex items-center gap-x-2">
          <span className="inline-block">{icon}</span>{' '}
          <span
            className={cn({
              'sr-only': minimalist,
            })}
          >
            {text}
          </span>
        </span>
      </button>
    </p>
  );
}

ButtonIconPrimary.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  minimalist: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
};
