import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function RegisterPage() {
  const { register } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    register(email, password);
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-success">Registrarse</button>
      </form>
    </div>
  );
}