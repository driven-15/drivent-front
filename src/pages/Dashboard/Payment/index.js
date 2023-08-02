import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import SelectPayment from '../../../components/SelectPayment';
import Ticket from '../../../components/Ticket';

export default function Payment() {
  const [currentStage, setCurrentStage] = useState(1);
  const stages = [
    {
      value: 1,
      component: <Ticket setCurrentStage={setCurrentStage}/>,
    },
    {
      value: 2,
      component: <SelectPayment setCurrentStage={setCurrentStage} />,
    }
  ];

  const selectedStage = stages.find(item => item.value === currentStage);

  return (
    <>
      <StyledTypography variant="h4">
        Ingresso e pagamento
      </StyledTypography>

      {selectedStage.component}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
