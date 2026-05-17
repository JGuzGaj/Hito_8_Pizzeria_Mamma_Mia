import Header from '../components/Header';
import CardPizza from '../components/CardPizza';
import pizzas from '../data/pizzas';

const Home = () => {
  return (
    <>
      <Header />
      <div className='container mt-4'>
        <div className='row'>
          {pizzas.map((pizza) => (
            <div className='col-md-4 mb-4' key={pizza.id}>
              <CardPizza pizza={pizza} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;