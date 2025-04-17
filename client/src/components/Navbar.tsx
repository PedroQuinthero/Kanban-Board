import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck]);

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, path: string) => {
    event.preventDefault();
    if (auth.isTokenExpired(auth.getToken())) {
      auth.logout();
      navigate('/login');
      setLoginCheck(false);
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
    setLoginCheck(false);
  };

  return (
    <div>
      <ul>
        {
          !loginCheck ? (
            <div className='nav'>
              <li className='nav-title'>
                <Link to='/login'>Krazy Kanban Board</Link>
              </li>
              <li className='nav-item'>
                <button type='button'>
                  <Link to='/login'>Login</Link>
                </button>
              </li>
            </div>
          ) : (
            <div className='nav'>
              <li className='nav-title'>
                <Link to='/' onClick={(event) => handleLinkClick(event, '/')}>Krazy Kanban Board</Link>
              </li>
              <li className='nav-item'>
                <button type='button' onClick={handleLogout}>Logout</button>
              </li>
            </div>
          )
        }
      </ul>
    </div>
  );
};

export default Navbar;