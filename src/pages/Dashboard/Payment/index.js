import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import SelectPayment from '../../../components/SelectPayment';
import Ticket from '../../../components/Ticket';
import useEnrollment from '../../../hooks/api/useEnrollment';
import RequirementPage from '../../../components/RequirementPage';

export default function Payment() {
  const [currentStage, setCurrentStage] = useState(1);
  const { enrollment } = useEnrollment();
  const message = 'Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso';
  const stages = [
    {
      value: 1,
      component: <p>Carregando informações...</p>,
    },
    {
      value: 2,
      component: <Ticket setCurrentStage={setCurrentStage} />,
    },
    {
      value: 3,
      component: <SelectPayment setCurrentStage={setCurrentStage} />,
    },
    {
      value: 4,
      component: <RequirementPage message={message} />,
    },
  ];

  const selectedStage = stages.find((item) => item.value === currentStage);

  useEffect(() => {
    if (enrollment) {
      setCurrentStage(2);
    } else {
      setCurrentStage(4);
    }
  }, [selectedStage]);

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
