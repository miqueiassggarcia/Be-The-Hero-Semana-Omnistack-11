import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";

import { DivGlobal, DivContent, Form, Title } from "./styles.js";

import logoImg from "../../assets/logo.svg";
import HeroesImg from "../../assets/heroes.png";

export default function Logon() {
  const [id, setId] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("sessions", { id });

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);

      history.push("/profile");
    } catch (err) {
      alert("Falha no login, tente novamente.");
    }
  }

  return (
    <DivGlobal>
      <DivContent>
        <img src={logoImg} alt="Be The Hero" />

        <Form onSubmit={handleLogin}>
          <Title>Faça seu logon</Title>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </Form>
      </DivContent>

      <img src={HeroesImg} alt="Heroes" />
    </DivGlobal>
  );
}
