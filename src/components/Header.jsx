import BannerImg from '../assets/Header.jpg';

export default function Header() {
  return (
    <div 
          className="header-banner d-flex flex-column justify-content-center align-items-center text-white text-center" 
          style={{ 
            backgroundImage: `linear-gradient(rgba(241, 227, 227, 0.5), rgba(0,0,0,0.5)), url(${BannerImg})`, 
            height: '40vh', 
            backgroundSize: 'cover',
            backgroundPosition: 'center' 
          }}
        >
          <h1>¡Pizzería Mamma Mia!</h1>
          <p>¡Tenemos las mejores pizzas que podrás encontrar!</p>
          <hr className="w-75" />
        </div>
      );
}