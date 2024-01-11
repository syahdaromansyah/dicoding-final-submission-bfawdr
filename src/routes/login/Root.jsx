import { useContext, useId, useState } from 'react';
import { CgSpinnerTwo } from 'react-icons/cg';
import { FaArrowRightLong, FaGear } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../../components/Alert.jsx';
import ButtonIconPrimary from '../../components/ButtonIconPrimary';
import { AuthContext, LanguageContext } from '../../contexts/contexts';
import AuthError from '../../exceptions/AuthError.js';
import LoginError from '../../exceptions/LoginError.js';
import {
  getUserLogged,
  login,
  putAccessToken,
} from '../../utilities/network-data.js';
import AuthInput from '../_route-components/AuthInput';
import NavBoardSettings from '../_route-components/NavBoardSettings';
import useAlert from '../_route-custom-hooks/use-alert.js';
import useInput from '../_route-custom-hooks/use-input.js';

export default function LoginRootRoute() {
  const [showSettings, setShowSettings] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const { switchLang } = useContext(LanguageContext);
  const { updateUserAuth } = useContext(AuthContext);

  const inputId = useId();

  const navigate = useNavigate();

  const {
    alertIsShown,
    alertSeverity,
    alertTitle,
    alertMessage,
    showAlert,
    closeAlert,
  } = useAlert();

  const [emailInput, handleEmailInput] = useInput();
  const [passwordInput, handlePasswordInput] = useInput();

  const handleShowSettings = () => setShowSettings(() => true);

  const handleCloseSettings = () => setShowSettings(() => false);

  const handleCloseAlert = () => closeAlert();

  const handleLogin = async (ev) => {
    try {
      ev.preventDefault();

      closeAlert();

      if (loadingLogin) return;

      setLoadingLogin(() => true);

      const responseLogin = await login({
        email: emailInput,
        password: passwordInput,
      });

      if (responseLogin.error) throw new LoginError(responseLogin.message);

      putAccessToken(responseLogin.data.accessToken);

      const responseUserLogged = await getUserLogged();

      if (responseUserLogged.error) throw new AuthError();

      updateUserAuth({
        id: responseUserLogged.data.id,
        name: responseUserLogged.data.name,
        email: responseUserLogged.data.email,
      });

      navigate('/', { replace: true });
    } catch (error) {
      setLoadingLogin(() => false);

      showAlert({
        severity: 'error',
        title: {
          en: 'Hold up',
          id: 'Perhatian',
        },
        message: getLoginErrorMsg(error),
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
          onSubmit={handleLogin}
        >
          <div className="px-4 md:w-[32rem] xl:w-[36rem]">
            <div className="mb-4 grid gap-y-2 text-center">
              <h1 className="font-space-grotesk text-4xl font-bold">
                {switchLang({
                  en: 'Welcome Back',
                  id: 'Selamat Datang Kembali',
                })}
                !
              </h1>

              <p>
                {switchLang({
                  en: "Don't have an account",
                  id: 'Belum memiliki',
                })}
                ?{' '}
                <Link
                  className="font-semibold underline"
                  to={loadingLogin ? '/login' : '/register'}
                >
                  {switchLang({
                    en: 'Sign up',
                    id: 'Buat akun',
                  })}
                </Link>
              </p>
            </div>

            <section className="mb-6">
              <h2 className="sr-only">
                {switchLang({
                  en: 'Login Information Section',
                  id: 'Bagian Informasi Masuk',
                })}
              </h2>

              <div className="grid gap-y-4">
                <AuthInput
                  labelProps={{
                    htmlFor: `${inputId}-email`,
                  }}
                  inputProps={{
                    type: 'email',
                    required: true,
                    disabled: loadingLogin,
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

                <AuthInput
                  labelProps={{
                    htmlFor: `${inputId}-password`,
                  }}
                  inputProps={{
                    type: 'password',
                    required: true,
                    minLength: 6,
                    disabled: loadingLogin,
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
              </div>
            </section>

            <section>
              <p>
                <button
                  className="group inline-block min-h-14 w-full rounded-md bg-gray-700 py-4 font-space-grotesk font-bold text-slate-100 transition hover:bg-gray-800 focus:bg-gray-800 active:bg-gray-700 disabled:bg-gray-400"
                  type="submit"
                  disabled={loadingLogin}
                >
                  <span className="flex items-center justify-center">
                    {loadingLogin ? (
                      <span className="animate-spin">
                        <span className="sr-only">
                          {switchLang({
                            en: 'Log in an account',
                            id: 'Sedang melakukan proses masuk akun',
                          })}
                        </span>
                        <CgSpinnerTwo />
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-x-2">
                        <span>
                          {switchLang({
                            en: 'Sign in',
                            id: 'Masuk akun',
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

function getLoginErrorMsg(error) {
  if (error instanceof LoginError) {
    if (error.message === '"email" is not allowed to be empty') {
      return {
        en: 'Email is not allowed to be empty',
        id: 'Surel tidak boleh kosong',
      };
    } else if (error.message === '"email" must be a valid email') {
      return {
        en: 'Email is not valid',
        id: 'Surel tidak valid',
      };
    } else if (error.message === 'Email not found') {
      return {
        en: error.message,
        id: 'Email tidak ditemukan',
      };
    } else if (error.message === '"password" is not allowed to be empty') {
      return {
        en: 'Password is not allowed to be empty',
        id: 'Kata sandi tidak boleh kosong',
      };
    } else if (error.message === 'Password is wrong') {
      return {
        en: error.message,
        id: 'Kata sandi Anda salah',
      };
    } else {
      return {
        en: 'Please check again your email and your password',
        id: 'Mohon periksa kembali surel dan kata sandi Anda',
      };
    }
  } else {
    return {
      en: 'Login account failed',
      id: 'Masuk akun gagal',
    };
  }
}
