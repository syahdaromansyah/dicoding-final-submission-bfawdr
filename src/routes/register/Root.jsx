import { useContext, useId, useState } from 'react';
import { CgSpinnerTwo } from 'react-icons/cg';
import { FaArrowRightLong, FaGear } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert.jsx';
import ButtonIconPrimary from '../../components/ButtonIconPrimary';
import { LanguageContext } from '../../contexts/contexts';
import RegisterError from '../../exceptions/RegisterError.js';
import { register } from '../../utilities/network-data.js';
import AuthInput from '../_route-components/AuthInput';
import NavBoardSettings from '../_route-components/NavBoardSettings';
import useAlert from '../_route-custom-hooks/use-alert.js';
import useInput from '../_route-custom-hooks/use-input.js';

export default function RegisterRootRoute() {
  const inputId = useId();

  const navigate = useNavigate();

  const [showSettings, setShowSettings] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);

  const [nameInput, handleNameInput] = useInput();
  const [emailInput, handleEmailInput] = useInput();
  const [passwordInput, handlePasswordInput] = useInput();
  const [confirmedPassInput, handleConfirmedPassInput] = useInput();

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

  const handleShowSettings = () => setShowSettings(() => true);

  const handleCloseSettings = () => setShowSettings(() => false);

  const handleRegister = async (ev) => {
    try {
      ev.preventDefault();

      closeAlert();

      if (loadingRegister) return;

      const registerInputErrorMsg = getRegisterInputErrorMsg({
        nameInput,
        emailInput,
        passwordInput,
        confirmedPassword: confirmedPassInput,
      });

      if (registerInputErrorMsg !== null)
        return showAlert({
          severity: 'error',
          title: {
            en: 'Hold up',
            id: 'Perhatian',
          },
          message: registerInputErrorMsg,
        });

      setLoadingRegister(() => true);

      const { error, message } = await register({
        name: nameInput.trim(),
        email: emailInput.trim(),
        password: passwordInput.trim(),
      });

      if (error) throw new RegisterError(message);

      navigate('/login', { replace: true });
    } catch (error) {
      setLoadingRegister(() => false);

      showAlert({
        severity: 'error',
        title: {
          en: 'Hold up',
          id: 'Perhatian',
        },
        message: getRegisterErrorMsg(error),
      });
    }
  };

  return (
    <>
      <Alert
        shown={alertIsShown}
        severity={alertSeverity}
        title={switchLang(alertTitle)}
        message={switchLang(alertMessage)}
        handleClose={handleCloseAlert}
      />

      <header>
        <nav>
          <div className="absolute bottom-4 right-4">
            <div className="hidden md:block">
              <ButtonIconPrimary
                text={switchLang({
                  en: 'Settings',
                  id: 'Pengaturan',
                })}
                icon={<FaGear />}
                handleClick={handleShowSettings}
              />
            </div>

            <div className="md:hidden">
              <ButtonIconPrimary
                text={switchLang({
                  en: 'Settings',
                  id: 'Pengaturan',
                })}
                icon={<FaGear />}
                minimalist
                handleClick={handleShowSettings}
              />
            </div>
          </div>

          {/* Navigation app settings menu */}
          <NavBoardSettings
            showSettings={showSettings}
            handleCloseSettings={handleCloseSettings}
          />
        </nav>
      </header>

      <main className="h-full">
        <form
          className="flex h-full items-center justify-center"
          onSubmit={handleRegister}
        >
          <div className="px-4 md:w-[32rem] lg:w-[36rem] xl:w-[42rem]">
            <div className="mb-4 grid gap-y-2 text-center">
              <h1 className="font-space-grotesk text-4xl font-bold">
                {switchLang({
                  en: 'Register Account',
                  id: 'Registrasi Akun',
                })}
              </h1>

              <p>
                {switchLang({
                  en: 'Already have an account',
                  id: 'Sudah memiliki akun',
                })}
                ?{' '}
                <Link
                  className="font-semibold underline"
                  to={loadingRegister ? '/register' : '/login'}
                >
                  {switchLang({
                    en: 'Sign in',
                    id: 'Masuk',
                  })}
                </Link>
              </p>
            </div>

            <section className="mb-6">
              <h2 className="sr-only">
                {switchLang({
                  en: 'Register Information Section',
                  id: 'Bagian Informasi Registrasi ',
                })}
              </h2>

              <div className="grid gap-y-4">
                <div className="grid gap-y-4 md:grid-cols-2 md:gap-x-4">
                  <AuthInput
                    labelProps={{
                      htmlFor: `${inputId}-name`,
                    }}
                    inputProps={{
                      type: 'text',
                      required: true,
                      disabled: loadingRegister,
                      value: nameInput,
                      minLength: 1,
                      placeholder: switchLang({
                        en: 'Name',
                        id: 'Nama',
                      }),
                      onChange: handleNameInput,
                    }}
                    srText={switchLang({
                      en: 'Enter your name',
                      id: 'Masukan nama Anda',
                    })}
                  />

                  <AuthInput
                    labelProps={{
                      htmlFor: `${inputId}-email`,
                    }}
                    inputProps={{
                      type: 'email',
                      required: true,
                      disabled: loadingRegister,
                      value: emailInput,
                      placeholder: switchLang({
                        en: 'Email',
                        id: 'Surel',
                      }),
                      onChange: handleEmailInput,
                    }}
                    srText={switchLang({
                      en: 'Enter your email',
                      id: 'Masukan surel Anda',
                    })}
                  />
                </div>

                <AuthInput
                  labelProps={{
                    htmlFor: `${inputId}-password`,
                  }}
                  inputProps={{
                    type: 'password',
                    required: true,
                    minLength: 6,
                    disabled: loadingRegister,
                    value: passwordInput,
                    placeholder: switchLang({
                      en: 'Password (min 6 characters)',
                      id: 'Kata sandi (min 6 karakter)',
                    }),
                    onChange: handlePasswordInput,
                  }}
                  srText={switchLang({
                    en: 'Enter your password with 6 characters minimum',
                    id: 'Masukan kata sandi Anda dengan minimal 6 karakter',
                  })}
                />

                <AuthInput
                  labelProps={{
                    htmlFor: `${inputId}-confirm-password`,
                  }}
                  inputProps={{
                    type: 'password',
                    required: true,
                    minLength: 6,
                    disabled: loadingRegister,
                    value: confirmedPassInput,
                    placeholder: switchLang({
                      en: 'Confirm password',
                      id: 'Konfirmasi kata sandi',
                    }),
                    onChange: handleConfirmedPassInput,
                  }}
                  srText={switchLang({
                    en: 'Confirm your password',
                    id: 'Konfirmasi kata sandi Anda',
                  })}
                />
              </div>
            </section>

            <section>
              <p>
                <button
                  className="group inline-block min-h-14 w-full rounded-md bg-gray-700 py-4 font-space-grotesk font-bold text-slate-100 transition hover:bg-gray-800 focus:bg-gray-800 active:bg-gray-700 disabled:bg-gray-400"
                  type="submit"
                  disabled={loadingRegister}
                >
                  <span className="flex items-center justify-center">
                    {loadingRegister ? (
                      <span className="animate-spin">
                        <span className="sr-only">
                          {switchLang({
                            en: 'Registering an account',
                            id: 'Sedang melakukan registrasi akun',
                          })}
                        </span>
                        <CgSpinnerTwo />
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-x-2">
                        <span>
                          {switchLang({
                            en: 'Sign up',
                            id: 'Buat akun',
                          })}
                        </span>
                        <span className="inline-block transform transition group-hover:translate-x-1 group-focus:translate-x-1 group-active:translate-x-2">
                          <FaArrowRightLong />
                        </span>
                      </span>
                    )}
                  </span>
                </button>
              </p>
            </section>
          </div>
        </form>
      </main>
    </>
  );
}

function getRegisterInputErrorMsg({
  nameInput,
  emailInput,
  passwordInput,
  confirmedPassword,
}) {
  if (nameInput.trim() === '')
    return {
      en: 'Your name must not be empty',
      id: 'Nama Anda tidak boleh kosong',
    };

  if (emailInput.trim() === '')
    return {
      en: 'Your email must not be empty',
      id: 'Surel Anda tidak boleh kosong',
    };

  if (passwordInput.trim() === '')
    return {
      en: 'Your password must not be empty',
      id: 'Kata sandi Anda tidak boleh kosong',
    };

  if (passwordInput.length < 6)
    return {
      en: 'Password must contain at least 6 characters',
      id: 'Kata sandi wajib mengandung minimal 6 karakter',
    };

  if (passwordInput !== confirmedPassword)
    return {
      en: 'Your password does not match with the confirmed password',
      id: 'Kata sandi Anda tidak sama dengan kata sandi yang dikonfirmasi',
    };

  return null;
}

function getRegisterErrorMsg(error) {
  if (error instanceof RegisterError) {
    if (error.message === '"name" is not allowed to be empty') {
      return {
        en: 'Name is not allowed to be empty',
        id: 'Nama tidak boleh kosong',
      };
    } else if (error.message === '"email" must be a valid email') {
      return {
        en: 'Email is not valid',
        id: 'Surel tidak valid',
      };
    } else if (error.message === '"email" is not allowed to be empty') {
      return {
        en: 'Email is not allowed to be empty',
        id: 'Surel tidak boleh kosong',
      };
    } else if (error.message === 'Email already use') {
      return {
        en: 'Email is already used',
        id: 'Surel telah digunakan',
      };
    } else if (error.message === '"password" is not allowed to be empty') {
      return {
        en: 'Password is not allowed to be empty',
        id: 'Kata sandi tidak boleh kosong',
      };
    } else if (
      error.message === 'Password must contain at least 6 characters'
    ) {
      return {
        en: error.message,
        id: 'Kata sandi wajib mengandung minimal 6 karakter',
      };
    } else {
      return {
        en: 'Please fill the registration account correctly',
        id: 'Mohon isi registrasi akun dengan benar',
      };
    }
  } else {
    return {
      en: 'Registration account failed',
      id: 'Registari akun gagal',
    };
  }
}
