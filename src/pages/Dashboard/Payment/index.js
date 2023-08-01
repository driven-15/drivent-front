import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export default function Payment() {
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledTypography variant="h6" color="textSecondary">Primeiro escolha sua modalidade de ingresso</StyledTypography>
      <TicketWrapper>
        <TicketInputWrapper>
          <TicketType>Presencial</TicketType>
          <TicketPrice>R$ 250</TicketPrice>
        </TicketInputWrapper>
        <TicketInputWrapper>
          <TicketType>Online</TicketType>
          <TicketPrice>R$ 100</TicketPrice>
        </TicketInputWrapper>
      </TicketWrapper>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const TicketWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

const TicketInputWrapper = styled.button`
  width:145px;
  height:145px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(206, 206, 206, 1);
  border-radius: 20px;
  background-color: transparent;
`;

const TicketType = styled.p`
  font-size: 16px;
  color: rgba(69, 69, 69, 1);
`;

const TicketPrice = styled.p`
  font-size: 14px;
  color: rgba(137, 137, 137, 1);
`;

