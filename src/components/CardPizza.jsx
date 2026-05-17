import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CardPizza({ pizza }) {
  const { addToCart } = useCart();

  return (
    <div className='card h-100'>
      <img src={pizza.img} alt={pizza.name} />

      <div className='card-body'>
        <h5>{pizza.name}</h5>
        <p>${pizza.price}</p>

        <Link to={`/pizza/${pizza.id}`} className='btn btn-secondary me-2'>
          Ver más
        </Link>

        <button
          className='btn btn-dark'
          onClick={() => addToCart(pizza)}
        >
          Añadir
        </button>
      </div>
    </div>
  );
}