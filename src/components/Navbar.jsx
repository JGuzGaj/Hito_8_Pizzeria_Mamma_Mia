import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function Navbar() {
  const { total } = useCart();
  const { token, logout } = useContext(UserContext);

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark px-4'>
      <Link className='navbar-brand' to='/'>🍕Pizzería Mamma Mia</Link>

      <div className='navbar-nav me-auto'>
        <Link className='nav-link' to='/'>Home</Link>

        {token ? (
          <>
            <Link className='nav-link' to='/profile'>🔓 Profile</Link>
            <button className='btn btn-danger ms-2' onClick={logout}>
  Logout
</button>
          </>
        ) : (
          <>
            <Link className='nav-link' to='/login'>🔒 Login</Link>
            <Link className='nav-link' to='/register'>Register</Link>
          </>
        )}
      </div>

      <Link className='btn btn-outline-info' to='/cart'>
        🛒 Total: ${total}
      </Link>
    </nav>
  );
}