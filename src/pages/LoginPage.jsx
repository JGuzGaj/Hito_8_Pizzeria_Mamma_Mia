import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function LoginPage() {
  const { login } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await login(email, password);

  if (!res.success) {
    alert(res.message);
  }
};

  return (
    <div className="container mt-5">
      <h2>Login</h2>

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

        <button className="btn btn-primary">Ingresar</button>
      </form>
    </div>
  );
}