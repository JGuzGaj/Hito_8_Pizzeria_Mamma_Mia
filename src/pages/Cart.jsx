import { useCart } from "../context/CartContext";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function Cart() {
  const { cart, increase, decrease, total, clearCart } = useCart();
  const { token } = useContext(UserContext);
  const [success, setSuccess] = useState(false);

  const handleCheckout = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/checkouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ cart }),
    });

    if (!res.ok) throw new Error("Error en la compra");

    setSuccess(true);

    // 👉 AQUÍ limpias el carrito
    clearCart();

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="container mt-4">
      <h2>Carrito</h2>

      {cart.map((item) => (
        <div key={item.id} className="d-flex justify-content-between mb-3">
          <h5>{item.name}</h5>

          <div>
            <button className="btn btn-danger me-2" onClick={() => decrease(item.id)}>
              -
            </button>

            {item.count}

            <button className="btn btn-primary ms-2" onClick={() => increase(item.id)}>
              +
            </button>
          </div>
        </div>
      ))}

      <h3>Total: ${total}</h3>

      <button className="btn btn-success" disabled={!token} onClick={handleCheckout}>
        Pagar
      </button>

      {success && <p className="text-success mt-3">Compra realizada con éxito 🎉</p>}
    </div>
  );
}