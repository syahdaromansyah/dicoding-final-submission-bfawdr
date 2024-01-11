import PropTypes from 'prop-types';

export default function AuthInput({ labelProps, inputProps, srText }) {
  return (
    <p>
      <label className="inline-block w-full" htmlFor={labelProps.htmlFor}>
        <input
          {...inputProps}
          className="inline-block w-full rounded-md border border-gray-300 p-4 transition disabled:bg-gray-200 disabled:text-slate-400 dark:border-gray-700 dark:bg-gray-800 dark:placeholder:text-slate-400 dark:disabled:bg-gray-950 dark:disabled:text-slate-700"
          id={labelProps.htmlFor}
        />

        <span className="sr-only">{srText}</span>

        {inputProps.required && (
          <span className="sr-only">
            <strong>
              <span aria-label="required">*</span>
            </strong>
          </span>
        )}
      </label>
    </p>
  );
}

AuthInput.propTypes = {
  labelProps: PropTypes.exact({
    htmlFor: PropTypes.string.isRequired,
  }).isRequired,
  inputProps: PropTypes.object.isRequired,
  srText: PropTypes.string.isRequired,
};
