import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState(localStorage.getItem("email"));

  // Guardar en localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    }
  }, [token, email]);

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error login");

      setToken(data.token);
      setEmail(data.email);

      return { success: true };

    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // REGISTER
  const register = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error register");

      setToken(data.token);
      setEmail(data.email);

      return { success: true };

    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // LOGOUT
  const logout = () => {
    setToken(null);
    setEmail(null);
  };

  // PROFILE
  const getProfile = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("No autorizado");

      return await res.json();

    } catch (error) {
      logout();
    }
  };

  return (
    <UserContext.Provider value={{
      token,
      email,
      login,
      register,
      logout,
      getProfile,
    }}>
      {children}
    </UserContext.Provider>
  );
};
import { useContext } from "react";

export const useUser = () => useContext(UserContext);