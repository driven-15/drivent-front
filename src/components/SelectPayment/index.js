import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import FormCreditCard from './FormCreditCard';
import Success from './Success';
import Card from '../Card';

export default function SelectPayment() {
  const [isPaid, setIsPaid] = useState(false);

  return (
    <div>
      <StyledTypography variant="h6" color="textSecondary">
        Ingresso escolhido
      </StyledTypography>
      <Card
        type={'primary'}
        width='290px'
        height='108px'
        title='Presencial + Com Hotel'
        subtitle='R$ 600'
      />

      <WrapperCreditCard>
        <StyledTypography variant="h6" color="textSecondary">
        Pagamento
        </StyledTypography>
        {isPaid ? <Success /> : <FormCreditCard setIsPaid={setIsPaid}/>}
      </WrapperCreditCard>
    </div>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const WrapperCreditCard = styled.div`
  margin-top: 30px;
`;
