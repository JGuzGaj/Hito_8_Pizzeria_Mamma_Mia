import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='text-center mt-5'>
      <img src="https://i.imgur.com/egUwx5Q.gif" alt="100px" />
      <h1>404</h1>
      <p>Página no encontrada</p>
      <Link to='/'>Volver al inicio</Link>
    </div>
  );
}