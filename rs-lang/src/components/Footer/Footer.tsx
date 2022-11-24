import { Link } from "react-router-dom";
import footerRsschool from "../../assets/svg/footer__rsschool.svg";
import footerGithub from "../../assets/svg/github.svg";

export default function Footer() {
  return (
    <footer className="footer px-5 max-w-7xl mx-auto xxl:px-0 relative w-full flex items-center justify-between py-2 md:min-h-[100px]">
      <div className="rs-logo md:min-w-[220px]">
        <Link
          to={{ pathname: "https://rs.school/" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="sm:w-[100px] lg:w-[140px]"
            src={footerRsschool}
            alt="rsschool logo"
          />
        </Link>
      </div>
      <div className="year md:min-w-[220px] text-center">
        <span className="text-white text-xs leading-3 md:text-base md:leading-5">
          2022
        </span>
      </div>
      <div className="gh-profiles md:flex md:gap-3">
        <Link
          to={{ pathname: "https://github.com/multeng" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex items-center bg-gray-600 mb-2 p-1">
            <img className="inline" src={footerGithub} alt="rsschool logo" />
            <span className="text-white text-[10px] leading-3 ml-[5px]">
              multeng
            </span>
          </div>
        </Link>
        <Link
          to={{ pathname: "https://github.com/kondratio" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex items-center bg-gray-600 mb-2 p-1">
            <img className="inline" src={footerGithub} alt="rsschool logo" />
            <span className="text-white text-[10px] leading-3 ml-[5px]">
              kondratio
            </span>
          </div>
        </Link>
        <Link
          to={{ pathname: "https://github.com/arantiryo" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex items-center bg-gray-600 p-1">
            <img className="inline" src={footerGithub} alt="rsschool logo" />
            <span className="text-white text-[10px] leading-3 ml-[5px]">
              arantiryo
            </span>
          </div>
        </Link>
      </div>
    </footer>
  );
}
