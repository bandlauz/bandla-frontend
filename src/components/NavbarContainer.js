import Navbar from './Navbar';
import NavbarSimple from './NavbarSimple';

function NavbarContainer() {
  const isLoginPage = window.location.pathname === '/login';

  return isLoginPage ? <NavbarSimple /> : <Navbar />;
}

export default NavbarContainer;