import { useParams } from 'react-router-dom';
import pizzas from '../data/pizzas';

export default function Pizza() {
  const { id } = useParams();
  const pizza = pizzas.find((pizza) => pizza.id === id);

  if (!pizza) {
    return <h2>Pizza no encontrada</h2>;
  }

  return (
    <div className='container mt-4'>
      <h2>{pizza.name}</h2>
      <img src={pizza.img} alt={pizza.name} width='300' />
      <p>{pizza.desc}</p>
    </div>
  );
}