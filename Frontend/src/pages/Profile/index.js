import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";

import {
  DivContent,
  Header,
  Span,
  Img,
  Button,
  H1,
  Ul,
  Li,
  ButtonLi,
  Strong,
  P,
} from "./styles";

import logoImg from "../../assets/logo.svg";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const history = useHistory();

  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: ongId,
        },
      })
      .then((response) => {
        setIncidents(response.data);
      });
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });

      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (err) {
      alert("Erro ao deletar caso, tente novamente.");
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push("/");
  }

  return (
    <DivContent>
      <Header>
        <Img src={logoImg} alt="Be The Hero" />
        <Span>Bem vinda, {ongName}</Span>

        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>
        <Button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </Button>
      </Header>

      <H1>Casos cadastrados</H1>

      <Ul>
        {incidents.map((incident) => (
          <Li key={incident.id}>
            <Strong>CASO:</Strong>
            <P>{incident.title}</P>

            <Strong space>DESCRIÇÕES</Strong>
            <P>{incident.description}</P>

            <Strong space>VALOR</Strong>
            <P>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(incident.value)}
            </P>

            <ButtonLi
              onClick={() => handleDeleteIncident(incident.id)}
              type="button"
            >
              <FiTrash2 size={20} color="#A8A8B3" />
            </ButtonLi>
          </Li>
        ))}
      </Ul>
    </DivContent>
  );
}
