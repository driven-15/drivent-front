import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import FormCreditCard from './FormCreditCard';
import Success from './Success';
import Card from '../Card';

export default function SelectPayment({ ticket }) {
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    if (ticket.status === 'PAID') {
      setIsPaid(true);
    } else {
      setIsPaid(false);
    }
  }, [ticket]);

  const messageHotelTitle = ticket.TicketType.includesHotel ? 'Com Hotel' : 'Sem Hotel';

  return (
    <div>
      <StyledTypography variant="h6" color="textSecondary">
        Ingresso escolhido
      </StyledTypography>
      <Card
        type={'primary'}
        width='290px'
        height='108px'
        title={ticket.TicketType.isRemote ? 'Online' : ` Presencial + ${messageHotelTitle}`}
        subtitle={`R$ ${ticket.TicketType.price}`}
      />

      <WrapperCreditCard>
        <StyledTypography variant="h6" color="textSecondary">
        Pagamento
        </StyledTypography>
        {isPaid ? <Success /> : <FormCreditCard setIsPaid={setIsPaid} ticketId={ticket.id} />}
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
