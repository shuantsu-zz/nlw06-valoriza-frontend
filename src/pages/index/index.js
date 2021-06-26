import Register from "./Register";
import Login from "./Login";

import './style.scss';
import 'react-toastify/dist/ReactToastify.css';

export default function Index() {
  return <section className="index">
    <h1 className="main-title">NLW:Valoriza</h1>
    <div className="panels-wrapper">
      <div className="panels-container">
        <Register />
        <Login />
      </div>
    </div>
  </section>
}