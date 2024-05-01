import propTypes from "prop-types";
import { NavLink } from "react-router-dom";

function Menu({ children, menuTitle, className = "", menuSpanClass = "", link }) {
  
  return (
    <li className={className}>
      <NavLink
        to={link}
        className={`flex flex-col items-center justify-center border-white py-1 sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4`}
      >
        <button>
          <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
            {children}
          </span>
          <span
            className={`block sm:hidden sm:group-hover:inline ${menuSpanClass}`}
          >
            {menuTitle}
          </span>
        </button>
      </NavLink>
    </li>
  );
}

Menu.propTypes = {
  children: propTypes.node,
  menuTitle: propTypes.string,
  className: propTypes.string,
  menuSpanClass: propTypes.string,
  link: propTypes.string
};

export default Menu;
