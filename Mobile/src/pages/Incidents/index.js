import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import api from "../../services/api";

import logoImg from "../../assets/logo.png";

import {
  Container,
  Header,
  ImageHeader,
  TextHeader,
  TextHeaderBold,
  Title,
  Description,
  IncidentList,
  IncidentsDetails,
  IncidentProperty,
  IncidentValue,
  ButtonDetials,
  ButtonTextDetails,
} from "./styles";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate("Detail", { incident });
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);

    const response = await api.get("incidents", {
      params: { page },
    });

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <Container>
      <Header>
        <ImageHeader source={logoImg} />
        <TextHeader>
          Total de <TextHeaderBold>{total} casos.</TextHeaderBold>
        </TextHeader>
      </Header>

      <Title>Bem-vindo!</Title>
      <Description>Escolha um dos casos abaixo e salve o dia</Description>

      <IncidentList
        data={incidents}
        keyExtractor={(incident) => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <IncidentsDetails>
            <IncidentProperty>ONG:</IncidentProperty>
            <IncidentValue>{incident.name}</IncidentValue>

            <IncidentProperty>CASO:</IncidentProperty>
            <IncidentValue>{incident.title}</IncidentValue>

            <IncidentProperty>VALOR:</IncidentProperty>
            <IncidentValue>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(incident.value)}
            </IncidentValue>

            <ButtonDetials onPress={() => navigateToDetail(incident)}>
              <ButtonTextDetails>Ver mais detalhes</ButtonTextDetails>
              <Feather name="arrow-right" size={16} color="#E02041" />
            </ButtonDetials>
          </IncidentsDetails>
        )}
      />
    </Container>
  );
}
