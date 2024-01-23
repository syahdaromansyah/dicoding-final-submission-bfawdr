import PropTypes from 'prop-types';

export default function PageLayout({ children }) {
  return (
    <div className="relative h-screen min-h-screen bg-gray-100 font-inter text-slate-800 dark:bg-gray-900 dark:text-slate-100">
      {children}
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
