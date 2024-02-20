import * as types from "../actions/authActions";
import fb from "../../config/firebase";
import { toast } from "react-toastify";

const loginUser = (payload) => {
  return {
    type: types.SIGN_IN,
    payload,
  };
};

const logOutUser = () => {
  return {
    type: types.SIGN_OUT,
  };
};

export const signInUser = (email, password, setSuccess) => (dispatch) => {
  fb.auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch(
        loginUser({
          uid: user.user.uid,
          email: user.user.email,
          displayName: user.user.displayName,
        })
      );
      setSuccess(true);
    })
    .catch((error) => {
      toast.error("Invalid Email or Password!");
    });
};

export const signUpUser = (name, email, password, setSuccess) => (dispatch) => {
  fb.auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      fb.auth()
        .currentUser.updateProfile({
          displayName: name,
        })
        .then(() => {
          const currentUser = fb.auth().currentUser;
          dispatch(
            loginUser({
              uid: currentUser.uid,
              name: currentUser.displayName,
              email: currentUser.email,
            })
          );
          setSuccess(true);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      if ((error.code = "auth/email-already-in-use")) {
        toast.error("Email aleardy registered!");
      }
      if ((error.code = "auth/invalid-email")) {
        toast.error("Email is invalid!");
      }
      if ((error.code = "auth/weak-password")) {
        toast.error("Password is weak!");
      }
    });
};

export const SignOutUser = () => (dispatch) => {
  fb.auth()
    .signOut()
    .then(() => {
      dispatch(logOutUser());
    });
};

export const checkIsLoggedIn = () => (dispatch) => {
  fb.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(
        loginUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      );
    }
  });
};
