import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import LogoDark from "../../images/logo/sss.jpeg";
import Logo from "../../images/logo/logo.svg";
import DefaultLayout from "../../layout/DefaultLayout";
import { signUp } from "aws-amplify/auth"
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { getCustomAttributes } from '../../hooks/authServices';
import {
  signIn,
  confirmSignUp,
  signOut,
  getCurrentUser,
  updateUserAttribute,
} from 'aws-amplify/auth';
interface SignInProps {
  onLoginSuccess: () => void;
}
const SignIn: React.FC<SignInProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState();
//   const handleClickSignup = async () => {
//     console.log("tesr");
    
//   const { isSignUpComplete, userId, nextStep } = await signUp({
//     username: "hello@mycompany.com",
//     password: "hunter2",
//     options: {
//       userAttributes: {
//         email: "hello@mycompany.com",
//         phone_number: "+6476419995" // E.164 number convention
//       },
//     }
//   });
// }
const handleLogout = async () => {
  try {
    const response = await signOut();
    console.log('signout response ', response);
    localStorage.removeItem('loginTimestamp');
    navigate('/auth/signin');
  } catch (error) {
    console.log('error signing out: ', error);
  }
};
const handleClickSignup = async (event) => {
  event.preventDefault(); // Prevents page reload
  console.log("test");

  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
          username: "vaishalipanchal6899@gmail.com",
          password: "V@ishu6899",
          options: {
            userAttributes: {
              email: "vaishalipanchal6899@Gmail.com",
              phone_number: "+6476419995" // E.164 number convention
            },
          }
        });
  } catch (error) {
    console.log('Error signing up:', error);
  }
};


const handleConfirmSignup= async (event) => {
  event.preventDefault(); // Prevents page reload
  console.log("test");

  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: "vaishalipanchal6899@Gmail.com",
      confirmationCode: "994016"
    });
  } catch (error) {
    console.log('Error signing up:', error);
  }
};



  const handleClickSignIn= async (event) => {
    event.preventDefault();
    console.log('username: ', username, ', password: ', password);
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: username,
        password: password,
      });

      console.log('Signed', isSignedIn);

      const { tableID, userType } = await getCustomAttributes();
      console.log('userType', userType);
      console.log('userType', tableID);

      isSignedIn && onLoginSuccess();
      // isSignedIn && onLoginSuccess();
    } catch (error) {
      console.log('error signing in', error);
      // 'Invalid username or password'
      setErrorMsg(error.message);
    }

  };
  useEffect(() => {
  handleLogout()
  }, []);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-40 px-40 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img src={LogoDark} alt="Logo" />
              </Link>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to Supreme Security Services
              </h2>

              <form onSubmit={handleClickSignIn}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Re-type Password
                  </label>
                  <div className="relative">
                    <input
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="6+ Characters, 1 Capital letter"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Sign In"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>

                <div className="mt-6 text-center" >
                  <p>
                    Don’t have any account?{" "}
                    <Link to="/auth/signup" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
