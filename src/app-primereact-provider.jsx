import cn from 'classnames';
import { PrimeReactProvider } from 'primereact/api';
import PropTypes from 'prop-types';

const TRANSITIONS = {
  overlay: {
    enterFromClass: 'opacity-0 scale-75',
    enterActiveClass:
      'transition-transform transition-opacity duration-150 ease-in',
    leaveActiveClass: 'transition-opacity duration-150 ease-linear',
    leaveToClass: 'opacity-0',
  },
};

const ptComponents = {
  inputswitch: {
    root: ({ props }) => ({
      className: cn('inline-block relative', 'w-12 h-7', {
        'opacity-60 select-none pointer-events-none cursor-default':
          props.disabled,
      }),
    }),
    slider: ({ props }) => ({
      className: cn(
        'absolute cursor-pointer top-0 left-0 right-0 bottom-0 border border-transparent',
        'transition-colors duration-200 rounded-2xl',
        'focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]',
        "before:absolute before:content-'' before:top-1/2 before:bg-gray-50 before:dark:bg-gray-900 before:w-5 before:h-5 before:left-1 before:-mt-2.5 before:rounded-full before:transition-duration-200",
        {
          'bg-gray-200 dark:bg-gray-800': !props.checked,
          'bg-blue-500 before:transform before:translate-x-5': props.checked,
        },
      ),
    }),
  },
  dropdown: {
    root: ({ props }) => ({
      className: cn(
        'cursor-pointer inline-flex relative select-none',
        'bg-white border border-gray-400 transition-colors duration-200 ease-in-out rounded-md',
        'dark:bg-gray-900 dark:border-blue-900/40 dark:hover:border-blue-300',
        'w-full md:w-56',
        'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]',
        {
          'opacity-60 select-none pointer-events-none cursor-default':
            props.disabled,
        },
      ),
    }),
    input: ({ props }) => ({
      className: cn(
        'cursor-pointer block flex flex-auto overflow-hidden overflow-ellipsis whitespace-nowrap relative',
        'bg-transparent border-0 text-slate-800',
        'dark:text-slate-100',
        'p-3 transition duration-200 bg-transparent rounded appearance-none font-inter text-base',
        'focus:outline-none focus:shadow-none',
        { 'pr-7': props.showClear },
      ),
    }),
    trigger: {
      className: cn(
        'flex items-center justify-center shrink-0',
        'bg-transparent text-slate-500 w-12 rounded-tr-lg rounded-br-lg',
      ),
    },
    wrapper: {
      className: cn(
        'max-h-[200px] overflow-auto',
        'bg-white text-slate-700 border-0 rounded-md shadow-lg',
        'dark:bg-gray-800 dark:text-slate-100',
      ),
    },
    list: 'p-2 list-none m-0 grid gap-y-2',
    item: ({ context }) => ({
      className: cn(
        'cursor-pointer font-inter font-normal overflow-hidden relative whitespace-nowrap',
        'm-0 p-3 border-0  transition-shadow duration-200 rounded-md',
        'dark:text-slate-100 dark:hover:bg-gray-700 dark:hover:text-slate-100',
        'hover:text-slate-700 hover:bg-gray-200',
        {
          'text-slate-700': !context.focused && !context.selected,
          'bg-gray-300 text-slate-700 dark:text-slate-100 dark:bg-gray-800/90':
            context.focused && !context.selected,
          'bg-blue-400 text-blue-700 dark:bg-blue-400 dark:text-slate-100':
            context.focused && context.selected,
          'bg-blue-50 text-blue-700 dark:bg-gray-900 dark:text-slate-100 dark:hover:!bg-gray-900 hover:!bg-blue-50':
            !context.focused && context.selected,
        },
      ),
    }),
    itemgroup: {
      className: cn(
        'm-0 p-3 text-slate-800 bg-white font-bold',
        'dark:bg-gray-900 dark:text-slate-100',
        'cursor-auto',
      ),
    },
    header: {
      className: cn(
        'p-3 border-b border-gray-300 text-slate-700 bg-gray-100 mt-0 rounded-tl-lg rounded-tr-lg',
        'dark:bg-gray-800 dark:text-slate-100 dark:border-blue-900/40',
      ),
    },
    filtercontainer: 'relative',
    filterinput: {
      className: cn(
        'pr-7 -mr-7',
        'w-full',
        'font-inter text-base text-slate-700 bg-white py-3 px-3 border border-gray-300 transition duration-200 rounded-lg appearance-none',
        'dark:bg-gray-900 dark:border-blue-900/40 dark:hover:border-blue-300 dark:text-slate-100',
        'hover:border-blue-500 focus:outline-none focus:outline-offset-0 focus:shadow-[0_0_0_0.2rem_rgba(191,219,254,1)] dark:focus:shadow-[0_0_0_0.2rem_rgba(147,197,253,0.5)]',
      ),
    },
    filtericon: '-mt-2 absolute top-1/2',
    clearicon: 'text-slate-500 right-12 -mt-2 absolute top-1/2',
    transition: TRANSITIONS.overlay,
  },
};
const providerValue = { unstyled: true, pt: ptComponents };

export default function AppPrimeReactProvider({ children }) {
  return (
    <PrimeReactProvider value={providerValue}>{children}</PrimeReactProvider>
  );
}

AppPrimeReactProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
