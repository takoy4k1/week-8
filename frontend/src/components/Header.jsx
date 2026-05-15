import { NavLink } from "react-router";

const navLinkClass = ({ isActive }) => {
  const base = "rounded-md px-3 py-2 text-sm text-white font-medium";
  return isActive
    ? `${base} bg-gray-400 text-black`
    : `${base} text-gray-700 hover:bg-gray-500`;
};

function Header() {
  return (
    <header className="border-b border-gray-200 bg-black text-gray-100">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <NavLink to="/" className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://media.istockphoto.com/id/1214084790/vector/black-cat-circle-symbol.jpg?s=170667a&w=is&k=20&c=iAUDqTxMZeaDjqYHKFgl1zSaqloE4BnwNd9k_mMjBIY="
            alt="App logo"
          />
          <span className="text-base font-semibold text-white sm:text-lg">
            User Management
          </span>
        </NavLink>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-1 sm:gap-2">
            <li>
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/adduser" className={navLinkClass}>
                Add User
              </NavLink>
            </li>

            <li>
              <NavLink to="/userslist" className={navLinkClass}>
                Users List
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;