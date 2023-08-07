import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Button from './Form/Button';
import React, { useState } from 'react';
import Card from './Card';
import { getPersonalInformations } from '../services/enrollmentApi';
import { toast } from 'react-toastify';
import { getTicketTypes, submitTicketReservation } from '../services/ticketsApi';
import { useEffect } from 'react';
import useToken from '../hooks/useToken';

export default function Ticket({ setCurrentStage, setTicket }) {
  const [enrollment, setEnrollment] = useState(null);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState({ id: null, name: '' });
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [ticketPrice, setTicketPrice] = useState(0);
  const [hotelPrice, setHotelPrice] = useState(0);
  const token = useToken();
  const types = [];

  useEffect(() => {
    getEnrollment();
    listTicketTypes();
  }, []);

  async function getEnrollment() {
    try {
      const data = await getPersonalInformations(token);
      setEnrollment(data);
    } catch (err) {
      toast('Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso');
    }
  }

  async function listTicketTypes() {
    try {
      const data = await getTicketTypes(token);
      setTicketTypes(data);
    } catch (err) {
      console.log(err);
    }
  }

  function handleTicketType(id, name, price) {
    if (name === 'Online') {
      setHotelPrice(0);
      setSelectedHotel(null);
    }
    setSelectedTicket({ id, name });
    setTicketPrice(price);
  }

  function handleHotelType(hotel) {
    if (hotel === 'withHotel' && selectedTicket.name === 'Presencial') {
      const typeWithHotel = ticketTypes.find((type) => type.includesHotel === true);
      setSelectedTicket({ id: typeWithHotel.id, name: 'Presencial' });
      setHotelPrice(350);
    } else {
      setHotelPrice(0);
    }
    setSelectedHotel(hotel);
  }

  async function handleSubmit(ticketTypeId) {
    try {
      const response = await submitTicketReservation(token, ticketTypeId);
      setTicket(response);
      toast('Ingresso reservado!');
      setCurrentStage(3);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <StyledTypography variant="h6" color="textSecondary">
        Primeiro escolha sua modalidade de ingresso
      </StyledTypography>
      <InputContainer>
        {ticketTypes.map((ticket) => {
          if (types.includes(ticket.name)) return null;
          types.push(ticket.name);
          return (
            <Card
              key={ticket.id}
              type={selectedTicket.name === ticket.name ? 'primary' : 'secondary'}
              width="145px"
              height="145px"
              title={ticket.name}
              subtitle={`R$ ${parseInt(ticket.price)}`}
              isClickable
              handleClick={() => handleTicketType(ticket.id, ticket.name, ticket.price)}
            />
          );
        })}
      </InputContainer>
      {selectedTicket.name === 'Presencial' ? (
        <>
          <StyledTypography variant="h6" color="textSecondary">
            Ótimo! Agora escolha sua modalidade de hospedagem
          </StyledTypography>
          <InputContainer>
            <Card
              type={selectedHotel === 'withoutHotel' ? 'primary' : 'secondary'}
              width="145px"
              height="145px"
              title="Sem Hotel"
              subtitle="+ R$ 0"
              isClickable
              handleClick={() => handleHotelType('withoutHotel')}
            />
            <Card
              type={selectedHotel === 'withHotel' ? 'primary' : 'secondary'}
              width="145px"
              height="145px"
              title="Com Hotel"
              subtitle="+ R$ 350"
              isClickable
              handleClick={() => handleHotelType('withHotel')}
            />
          </InputContainer>
        </>
      ) : (
        <></>
      )}
      {selectedTicket.name === 'Online' || (selectedTicket.name === 'Presencial' && selectedHotel) ? (
        <>
          <StyledTypography variant="h6" color="textSecondary">
            Fechado! O total ficou em <Bold>R$ {ticketPrice + hotelPrice}</Bold>. Agora é só confirmar:
          </StyledTypography>
          <SubmitContainer>
            <Button type="submit" onClick={() => handleSubmit(selectedTicket.id)}>
              RESERVAR INGRESSO
            </Button>
          </SubmitContainer>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 34px !important;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const SubmitContainer = styled.div`
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;
