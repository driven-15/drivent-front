import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Button from './Form/Button';
import React, { useState } from 'react';
import Card from './Card';

export default function Ticket({ setCurrentStage }) {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);

  function handleTicketType(ticket) {
    setSelectedTicket(ticket);
  }

  function handleHotelType(hotel) {
    setSelectedHotel(hotel);
  }

  function handleSubmit() {
    setCurrentStage(2);
  }

  return (
    <>
      <StyledTypography variant="h6" color="textSecondary">Primeiro escolha sua modalidade de ingresso</StyledTypography>
      <InputContainer>
        <Card 
          type={selectedTicket === 'presencial' ? 'primary' : 'secondary'}
          width='145px'
          height='145px'
          title='Presencial'
          subtitle='R$ 250'
          isClickable
          handleClick={() => handleTicketType('presencial')}
        />
        <Card 
          type={selectedTicket === 'online' ? 'primary' : 'secondary'}
          width='145px'
          height='145px'
          title='Online'
          subtitle='R$ 100'
          isClickable
          handleClick={() => handleTicketType('online')}
        />
      </InputContainer>
      <StyledTypography variant="h6" color="textSecondary">Ótimo! Agora escolha sua modalidade de hospedagem</StyledTypography>
      <InputContainer>
        <Card 
          type={selectedHotel === 'withoutHotel' ? 'primary' : 'secondary'}
          width='145px'
          height='145px'
          title='Sem Hotel'
          subtitle='+ R$ 0'
          isClickable
          handleClick={() => handleHotelType('withoutHotel')}
        />
        <Card 
          type={selectedHotel === 'withHotel' ? 'primary' : 'secondary'}
          width='145px'
          height='145px'
          title='Com Hotel'
          subtitle='+ R$ 350'
          isClickable
          handleClick={() => handleHotelType('withHotel')}
        />
      </InputContainer>
      <StyledTypography variant="h6" color="textSecondary">Fechado! O total ficou em <Bold>R$ 100</Bold>. Agora é só confirmar:</StyledTypography>
      <SubmitContainer>
        <Button type="submit" onClick={handleSubmit}>
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
