import {
  Fragment,
  useRef,
  useReducer,
  useState,
  useContext,
  useEffect,
} from "react";
import classes from "./Login.module.css";
import Card from "../UI/Card";
import AuthContext from "../store/auth-context";

const emailReducer = (state, action) => {
  if (action.type === "INPUT_HANDLER") {
    return { value: action.val, isValid: action.val.includes("@") };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }

  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "INPUT_HANDLER") {
    return { value: action.val, isValid: action.val.trim().length > 5 };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 5 };
  }

  return { value: "", isValid: false };
};

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const changedEmailHandler = (event) => {
    dispatchEmail({ type: "INPUT_HANDLER", val: event.target.value });

    setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const blurredEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const changedPasswordHandler = (event) => {
    dispatchPassword({ type: "INPUT_HANDLER", val: event.target.value });

    setFormIsValid(event.target.value.trim().length > 5 && emailState.isValid);
  };

  const blurredPasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Fragment>
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <div className={classes["form-group"]}>
            <label htmlFor="text">Email Address</label>
            <input
              className={classes["spec-input"]}
              id="text"
              type="text"
              ref={emailInputRef}
              value={emailState.value}
              onChange={changedEmailHandler}
              onBlur={blurredEmailHandler}
            ></input>
          </div>

          <div className={classes["form-group"]}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="Password"
              ref={passwordInputRef}
              value={passwordState.value}
              onChange={changedPasswordHandler}
              onBlur={blurredPasswordHandler}
            ></input>
          </div>

          <button className={classes.button} type="submit">
            Login
          </button>
        </form>
      </Card>
    </Fragment>
  );
};

export default Login;
