import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/test");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="signin-wrapper">
      <form onSubmit={handleSignin} className="div-center">
        <h2>Sign In</h2>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>

      <div className="signup-hint">
        <p>
          Don't have an account?{" "}
          <button className="link-button" onClick={() => navigate("/signup")}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signin;