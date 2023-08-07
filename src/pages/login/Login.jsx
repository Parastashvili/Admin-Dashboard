import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LoginOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Button, Space } from "antd";
const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Email address"
          prefix={<MailOutlined />}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          prefix={<LockOutlined />}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login" type="submit">
          Log In
          <LoginOutlined />
        </button>
        {error && <span className="errorText">Wrond Email or password!</span>}
      </form>
    </div>
  );
};

export default Login;
