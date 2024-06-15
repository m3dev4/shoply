import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredenials } from "../../redux/features/auth/authReducer";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Le mot de passe ne correspond pas");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredenials({ ...res }));
        navigate(redirect);
        toast.success(`Inscripion reussite, ravi de vous revoir ${username}`);
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <section className="flex justify-center align-center flex-wrap">
      <div className="absolute top-20 w-[50%]">
        <h2 className="font-semibold text-2xl">S'inscrire</h2>
        <form onSubmit={submitRegister}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-block"
            >
              Nom
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 border rounded-full w-full"
              placeholder="Entrer votre nom"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label
              htmlFor="email"
              className="block text-sm font-medium text-block"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded-full w-full"
              placeholder="Entrer votre addresse mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="password"
              className="block text-sm font-medium text-block"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded-full w-full"
              placeholder="Entrer votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="password"
              className="block text-sm font-medium text-block"
            >
              Confirme votre mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 border rounded-full w-full"
              placeholder="Confirme votre mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-1 "
          >
            {isLoading ? "Inscription..." : "Inscrire"}
          </button>
          {isLoading && <Loader />}
        </form>
        <div className="mt-4">
          <p>
            Déjà Client ?{" "}
            <Link to="/login" className="text-pink-400 font-semibold">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
