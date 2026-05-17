import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function Profile() {
  const { getProfile, logout } = useContext(UserContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data) setUser(data);
    };

    fetchProfile();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Perfil</h2>

      <p>{user?.email}</p>

      <button className="btn btn-danger" onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
}