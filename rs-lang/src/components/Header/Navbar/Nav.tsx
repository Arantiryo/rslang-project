import { MdExitToApp } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import LoaderButton from "../../LoaderButton/LoaderButton";
import { initialState, updateUserInfo } from "../../LoginForm/loginSlice";

type NavProps = {
  open: boolean;
};

const RightNav = ({ open }: NavProps) => {
  const userInfo = useAppSelector((state) => state.loginReducer);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(updateUserInfo(initialState));
  };

  return (
    <ul
      className={`list-none flex items-center flex-nowrap z-50 mw:flex-col mw:bg-gray-700 
      mw:fixed ${open ? "mw:translate-x-0" : "mw:translate-x-full"} 
      mw:top-0 mw:right-0 mw:h-screen mw:w-[280px] mw:pt-14 mw:transition-transform mw:duration-500 mw:gap-3
      
      `}
    >
      <li>
        <NavLink
          className={
            "py-2 px-3 xl:px-8 text-white cursor-pointer text-center hover:text-yellow-500 transition-colors"
          }
          to="/textbook"
          activeClassName="text-yellow-500"
        >
          Учебник
        </NavLink>
      </li>
      <li>
        <NavLink
          className="py-2 px-3 xl:px-8 text-white cursor-pointer text-center hover:text-yellow-500 transition-colors"
          to="/games"
          activeClassName="text-yellow-500"
        >
          Игры
        </NavLink>
      </li>
      <li>
        <NavLink
          className="py-2 px-3 xl:px-8 text-white cursor-pointer text-center hover:text-yellow-500 transition-colors"
          to="/team"
          activeClassName="text-yellow-500"
        >
          О команде
        </NavLink>
      </li>
      <li>
        <NavLink
          className="py-2 px-3 xl:px-8 text-white cursor-pointer text-center hover:text-yellow-500 transition-colors"
          to="/statistics"
          activeClassName="text-yellow-500"
        >
          Статистика
        </NavLink>
      </li>
      {userInfo.userId === "" ? (
        <>
          <li>
            <NavLink
              className="py-2 px-3 xl:px-8 text-white cursor-pointer text-center hover:text-yellow-500 transition-colors"
              to="/signup"
              activeClassName="text-yellow-500"
            >
              Регистрация
            </NavLink>
          </li>
          <li>
            <NavLink
              className="text-white cursor-pointer text-center"
              to="/login"
              activeClassName="text-yellow-500"
            >
              <div className="py-2 px-6 xl:px-8 w-full mx-auto h-full transition-colors bg-emerald-700 hover:bg-emerald-600">
                Войти
              </div>
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li className="py-2 px-3 xl:px-8 text-white text-center ml-2">
            {userInfo.name}
          </li>
          <li className="text-white flex items-center">
            <LoaderButton
              type="button"
              className="header__btn_logout relative w-[92px] h-[40px] text-base
              bg-purple-800 hover:bg-purple-700 transition-colors text-white"
              onClick={handleLogout}
            >
              <span className="flex items-center justify-around">
                Выход <MdExitToApp className="text-base" />
              </span>
            </LoaderButton>
          </li>
        </>
      )}
    </ul>
  );
};

export default RightNav;
