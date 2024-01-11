import cn from 'classnames';
import PropTypes from 'prop-types';
import { useContext, useEffect, useRef } from 'react';
import {
  IoAlertCircle,
  IoCheckmarkCircle,
  IoClose,
  IoCloseCircle,
  IoWarning,
} from 'react-icons/io5';
import { LanguageContext } from '../contexts/contexts';

export default function Alert({
  shown,
  severity,
  title,
  message,
  handleClose,
}) {
  const closeAlertBtnRef = useRef(null);

  const { switchLang } = useContext(LanguageContext);

  useEffect(() => {
    if (shown) closeAlertBtnRef.current.focus();
  }, [shown]);

  return (
    <div className="relative">
      <div
        className={cn(
          'absolute left-0 top-0 z-40 flex w-full items-center justify-center',
          {
            hidden: !shown,
            block: shown,
          },
        )}
      >
        <div className="py-4">
          <div
            className={cn(
              'flex max-w-fit items-center rounded-md border-2 py-2 backdrop-blur',
              {
                'border-emerald-600 bg-emerald-100/60': severity === 'success',
                'border-blue-600 bg-blue-100/60': severity === 'info',
                'border-yellow-600 bg-yellow-100/60': severity === 'warning',
                'border-rose-600 bg-rose-100/60': severity === 'error',
              },
            )}
          >
            <div>
              <span
                className={cn('inline-block p-4 text-4xl', {
                  'text-emerald-600 dark:text-emerald-800':
                    severity === 'success',
                  'text-blue-600 dark:text-blue-800': severity === 'info',
                  'text-yellow-600 dark:text-yellow-800':
                    severity === 'warning',
                  'text-rose-600 dark:text-rose-800': severity === 'error',
                })}
                aria-hidden
              >
                {severity === 'success' && <IoCheckmarkCircle />}
                {severity === 'info' && <IoAlertCircle />}
                {severity === 'warning' && <IoWarning />}
                {severity === 'error' && <IoCloseCircle />}
              </span>
            </div>

            <div>
              <h2
                className={cn('font-space-grotesk text-xl font-bold', {
                  'text-emerald-600 dark:text-emerald-800':
                    severity === 'success',
                  'text-blue-600 dark:text-blue-800': severity === 'info',
                  'text-yellow-600 dark:text-yellow-800':
                    severity === 'warning',
                  'text-rose-600 dark:text-rose-800': severity === 'error',
                })}
              >
                {title}!
              </h2>

              <p className="min-w-[14rem] max-w-sm">{message}</p>
            </div>

            <div>
              <p className="flex items-center justify-center">
                <button
                  ref={closeAlertBtnRef}
                  className="inline-block p-4"
                  type="button"
                  onClick={handleClose}
                >
                  <span className="text-2xl">
                    <IoClose />
                  </span>{' '}
                  <span className="sr-only">
                    {switchLang({
                      en: 'Close alert',
                      id: 'Tutup peringatan',
                    })}
                  </span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Alert.propTypes = {
  shown: PropTypes.bool.isRequired,
  severity: PropTypes.oneOf(['success', 'info', 'warning', 'error']).isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};
