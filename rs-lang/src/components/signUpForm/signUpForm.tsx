import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import closeIcon from "../../assets/svg/close.svg";
import { CreateUserDto } from "../../interfaces/user";
import { createUser } from "../../utils/WebClients";
import { DangerAlert, SuccessAlert } from "../Alerts/Alerts";
import CustomInput from "../CustomInput/CustomInput";
import LoaderButton from "../LoaderButton/LoaderButton";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alertActive, setAlertActive] = useState(false);
  const [errorActive, setErrorActive] = useState(false);
  const [alertMessage, setAlertMessage] = useState(["", ""]);

  const handleError = (text: string) => {
    setErrorActive(true);
    setAlertMessage(["Ошибка!", text]);
    setTimeout(() => setErrorActive(false), 3000);
  };

  const history = useHistory();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: CreateUserDto = { name, email, password };

    createUser(user)
      .then(() => {
        setAlertActive(true);
        setAlertMessage(["Успех!", "Вы будете перенаправлены на страницу входа."]);
        setTimeout(() => setAlertActive(false), 3000);

        setTimeout(() => history.push("/login"), 3000);
      })
      .catch((err) => {
        switch (err.message) {
          case "417":
            handleError("Пользователь с таким имейлом уже существует.");
            break;
          case "422":
            handleError("Некорректный имейл или пароль.");
            break;
          default:
            handleError("Что-то пошло не так. Пожалуйста, попробуй ещё раз.");
            break;
        }
      });
  };

  return (
    <div className="signup-container relative rounded bg-gray-700 w-96 h-96 px-11">
      {alertActive && (
        <div className="absolute top-0 right-0 z-10">
          <SuccessAlert title={alertMessage[0]} text={alertMessage[1]} />
        </div>
      )}
      {errorActive && (
        <div className="absolute top-0 right-0 z-10">
          <DangerAlert title={alertMessage[0]} text={alertMessage[1]} />
        </div>
      )}
      <Link to="/" className="absolute text-gray-200 top-4 right-4">
        <img src={closeIcon} alt="close" />
      </Link>
      <form
        className="signup flex flex-col items-center justify-center border-b-2 border-gray-400 pt-9 pb-6"
        onSubmit={handleSubmit}
      >
        <h4 className="text-lg font-bold text-gray-200 tracking-wide mb-6">Регистрация</h4>
        <CustomInput
          autoFocus
          id="signupUserName"
          placeholder="Имя пользователя"
          required
          value={name}
          onChange={(e: Event) => setName((e.target as HTMLInputElement).value)}
        />
        <CustomInput
          id="signupEmail"
          type="email"
          placeholder="Укажите адрес эл. почты"
          required
          value={email}
          onChange={(e: Event) => setEmail((e.target as HTMLInputElement).value)}
        />
        <CustomInput
          id="signupPassword"
          type="password"
          placeholder="Введите пароль"
          minLength="8"
          required
          autoComplete="new-password"
          value={password}
          onChange={(e: Event) => setPassword((e.target as HTMLInputElement).value)}
        />
        <LoaderButton
          type="submit"
          className="btn_signup w-full mt-4 bg-emerald-700 hover:bg-emerald-600 transition-colors text-white leading-6 font-bold py-2 px-4"
          isLoading={false}
          disabled={false}
        >
          Продолжить
        </LoaderButton>
      </form>
      <Link
        to="/login"
        className="text-emerald-500 hover:text-emerald-400 transition-colors block text-center text-xs tracking-wide mx-auto mt-6"
      >
        Уже есть аккаунт? Войти
      </Link>
    </div>
  );
}
