import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Button from '../../../components/Form/Button';
import React, { useState } from 'react';

export default function Payment() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);

  function handleTicketType(ticket) {
    setSelectedTicket(ticket);
  }

  function handleHotelType(hotel) {
    setSelectedHotel(hotel);
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>
      <StyledTypography variant="h6" color="textSecondary">Primeiro escolha sua modalidade de ingresso</StyledTypography>
      <InputContainer>
        <InputWrapper
          isSelected={selectedTicket === 'presencial'}
          onClick={() => handleTicketType('presencial')}>
          <Type>Presencial</Type>
          <Price>R$ 250</Price>
        </InputWrapper>
        <InputWrapper
          isSelected={selectedTicket === 'online'}
          onClick={() => handleTicketType('online')}>
          <Type>Online</Type>
          <Price>R$ 100</Price>
        </InputWrapper>
      </InputContainer>
      <StyledTypography variant="h6" color="textSecondary">Ótimo! Agora escolha sua modalidade de hospedagem</StyledTypography>
      <InputContainer>
        <InputWrapper
          isSelected={selectedHotel === 'withoutHotel'}
          onClick={() => handleHotelType('withoutHotel')}>
          <Type>Sem Hotel</Type>
          <Price>+ R$ 0</Price>
        </InputWrapper>
        <InputWrapper
          isSelected={selectedHotel === 'withHotel'}
          onClick={() => handleHotelType('withHotel')}>
          <Type>Com Hotel</Type>
          <Price>+ R$ 350</Price>
        </InputWrapper>
      </InputContainer>
      <StyledTypography variant="h6" color="textSecondary">Fechado! O total ficou em <Bold>R$ 100</Bold>. Agora é só confirmar:</StyledTypography>
      <SubmitContainer>
        <Button type="submit">
          RESERVAR INGRESSO
        </Button>
      </SubmitContainer>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 34px!important;
`;

const InputWrapper = styled.button`
  width:145px;
  height:145px;
  align-items: center;
  justify-content: center;
  border: ${({ isSelected }) => (isSelected ? 'none' : '1px solid rgba(206, 206, 206, 1)')};
  border-radius: 20px;
  background-color: ${({ isSelected }) => (isSelected ? 'rgba(255, 238, 210, 1)' : 'transparent')};
`;

const Type = styled.p`
  font-size: 16px;
  color: rgba(69, 69, 69, 1);
`;

const Price = styled.p`
  font-size: 14px;
  color: rgba(137, 137, 137, 1);
`;

const Bold = styled.span`
  font-weight: bold;
`;

const SubmitContainer = styled.div`
  width: 100%!important;

  > button {
    margin-top: 0 !important;
  }
`;

