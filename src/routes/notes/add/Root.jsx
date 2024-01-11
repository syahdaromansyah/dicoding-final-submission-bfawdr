import MDEditor from '@uiw/react-md-editor';
import cn from 'classnames';
import { useContext, useId, useState } from 'react';
import { CgSpinnerTwo } from 'react-icons/cg';
import { FaMarkdown, FaRegCircleCheck } from 'react-icons/fa6';
import rehypeSanitize from 'rehype-sanitize';
import Alert from '../../../components/Alert.jsx';
import ButtonIconPrimary from '../../../components/ButtonIconPrimary.jsx';
import MarkdownContent from '../../../components/MarkdownContent';
import { LanguageContext, ThemeContext } from '../../../contexts/contexts';
import { addNote } from '../../../utilities/network-data.js';
import useAlert from '../../_route-custom-hooks/use-alert.js';

const customMDEditorComponents = {
  preview: (source) => {
    return <MarkdownContent>{source}</MarkdownContent>;
  },
};

export default function AddNoteRootRoute() {
  const inputId = useId();

  const [titleNote, setTitleNote] = useState('');
  const [bodyNote, setBodyNote] = useState('');
  const [loadingSaveNote, setLoadingSaveNote] = useState(false);

  const { theme } = useContext(ThemeContext);
  const { switchLang } = useContext(LanguageContext);

  const {
    alertIsShown,
    alertSeverity,
    alertTitle,
    alertMessage,
    showAlert,
    closeAlert,
  } = useAlert();

  const handleCloseAlert = () => closeAlert();

  const handleTitleNote = (ev) => {
    const inputValue = ev.target.value;
    setTitleNote(() => inputValue);
  };

  const handleBodyNote = (inputValue) => setBodyNote(() => inputValue);

  const handleSaveNote = async () => {
    setLoadingSaveNote(() => true);

    const trimmedTitleValue = titleNote.trim();

    if (trimmedTitleValue === '' || bodyNote.trim() === '') {
      showAlert({
        severity: 'error',
        title: {
          en: 'Hold up',
          id: 'Perhatian',
        },
        message: {
          en: 'Please fill the title and note message',
          id: 'Mohon isi judul dan pesan catatan',
        },
      });

      return setLoadingSaveNote(() => false);
    }

    const { error } = await addNote({
      title: trimmedTitleValue,
      body: bodyNote,
    });

    if (error) {
      showAlert({
        severity: 'error',
        title: {
          en: 'Hold up',
          id: 'Perhatian',
        },
        message: {
          en: 'Saving note failed',
          id: 'Gagal menyimpan catatan',
        },
      });
    } else {
      showAlert({
        severity: 'success',
        title: {
          en: 'Success',
          id: 'Berhasil',
        },
        message: {
          en: 'Saving note is success',
          id: 'Menyimpan catatan berhasil',
        },
      });
    }

    setLoadingSaveNote(() => false);
    setTitleNote(() => '');
    setBodyNote(() => '');
  };

  return (
    <div className="relative mx-auto h-full max-h-full max-w-2xl md:px-0 lg:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl">
      <Alert
        shown={alertIsShown}
        severity={alertSeverity}
        title={switchLang(alertTitle)}
        message={switchLang(alertMessage)}
        handleClose={handleCloseAlert}
      />

      <div className="mx-auto flex h-full max-w-lg flex-col gap-y-4 lg:max-w-2xl xl:max-w-[84rem]">
        <div className="flex-none border-b-2 border-gray-300">
          <p>
            <label
              htmlFor={`${inputId}-title-note`}
              className="inline-block w-full"
            >
              <span className="sr-only">
                {switchLang({
                  en: 'Input title note',
                  id: 'Masukan judul catatan',
                })}
              </span>

              <input
                id={`${inputId}-title-note`}
                className="inline-block w-full bg-transparent pb-4 pt-6 font-space-grotesk text-2xl font-bold outline-none lg:text-4xl lg:placeholder:text-4xl"
                type="text"
                placeholder={switchLang({
                  en: 'Title note',
                  id: 'Judul catatan',
                })}
                value={titleNote}
                onChange={handleTitleNote}
              />
            </label>
          </p>
        </div>

        <div className="flex flex-none justify-end">
          <p className="flex w-max select-none items-center gap-x-2 rounded-md bg-blue-100 px-2 py-1 dark:bg-gray-800">
            <span className="inline-block text-2xl">
              <FaMarkdown />
            </span>{' '}
            <span className="inline-block font-space-grotesk font-semibold">
              {switchLang({
                en: 'Markdown Supported',
                id: 'Mendukung Markdown',
              })}
            </span>
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div
            className={cn(
              'h-full',
              '[&_.w-md-editor-text-input]:!text-lg',
              'md:[&_.w-md-editor-text-input]:!text-xl',
              '[&_.w-md-editor-text-input]:!font-jetbrains-mono',
              '[&_.w-md-editor-text-input]:!font-semibold',
              '[&_.w-md-editor-text-pre_>_code]:!text-lg',
              'md:[&_.w-md-editor-text-pre_>_code]:!text-xl',
              '[&_.w-md-editor-text-pre_>_code]:!font-jetbrains-mono',
              '[&_.w-md-editor-text-pre_>_code]:!font-semibold',
            )}
          >
            <MDEditor
              preview="edit"
              height="100%"
              visibleDragbar={false}
              components={customMDEditorComponents}
              value={bodyNote}
              onChange={handleBodyNote}
              data-color-mode={theme === 'dark' ? 'dark' : 'light'}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
            />
          </div>
        </div>

        <div className="flex-none">
          {loadingSaveNote ? (
            <div className="pb-4">
              <p className="flex select-none items-center justify-center lg:justify-end">
                <span className="flex w-max items-center justify-end gap-x-1 rounded-md bg-gray-200 px-3 py-2 dark:bg-gray-700">
                  <span className="inline-block animate-spin">
                    <CgSpinnerTwo />
                  </span>
                  <span className="inline-block">
                    {switchLang({
                      en: 'Saving note',
                      id: 'Menyimpan catatan',
                    })}
                  </span>
                </span>
              </p>
            </div>
          ) : (
            <div className="pb-4 text-center lg:text-right">
              <ButtonIconPrimary
                text={switchLang({
                  en: 'Save note',
                  id: 'Simpan catatan',
                })}
                icon={<FaRegCircleCheck />}
                handleClick={handleSaveNote}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
