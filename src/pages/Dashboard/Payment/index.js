import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import SelectPayment from '../../../components/SelectPayment';
import Ticket from '../../../components/Ticket';
import useEnrollment from '../../../hooks/api/useEnrollment';
import RequirementPage from '../../../components/RequirementPage';
import * as ticketsApi from '../../../services/ticketsApi';
import useToken from '../../../hooks/useToken';

export default function Payment() {
  const [currentStage, setCurrentStage] = useState(1);
  const [ticket, setTicket] = useState(null);
  const { enrollment } = useEnrollment();
  const token = useToken();

  const message = 'Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso';
  const stages = [
    {
      value: 1,
      component: <p>Carregando informações...</p>,
    },
    {
      value: 2,
      component: <Ticket setCurrentStage={setCurrentStage} setTicket={setTicket}/>,
    },
    {
      value: 3,
      component: <SelectPayment ticket={ticket}/>,
    },
    {
      value: 4,
      component: <RequirementPage message={message} />,
    },
  ];

  const selectedStage = stages.find((item) => item.value === currentStage);

  useEffect(async() => {
    const response = await ticketsApi.getTickets(token);
    if (response) {
      setTicket(response);
    }
  }, []);

  useEffect(() => {
    if (enrollment && !ticket) {
      setCurrentStage(2);
    } else if (enrollment && ticket) {
      setCurrentStage(3);
    } else {
      setCurrentStage(4);
    }
  }, [enrollment, ticket]);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>

      {selectedStage.component}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
