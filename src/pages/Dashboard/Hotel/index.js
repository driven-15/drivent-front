import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import HotelCard from '../../../components/HotelCard';
import React, { useState, useEffect } from 'react';
import useToken from '../../../hooks/useToken';
import { getHotelRooms, getHotelsList } from '../../../services/hotelsApi';
import { toast } from 'react-toastify';
import RequirementPage from '../../../components/RequirementPage';
import { getTickets } from '../../../services/ticketsApi';
import RoomCard from '../../../components/RoomCard';

export default function Hotel() {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [allHotels, setAllHotels] = useState([]);
  const [capacities, setCapacities] = useState([]);
  const [hotelRooms, setHotelRooms] = useState(null);
  const [isRemote, setIsRemote] = useState(true);
  const [payment, setPayment] = useState(false);
  const token = useToken();

  useEffect(() => {
    checkPayment();
    getHotels();
  }, []);

  async function getHotels() {
    try {
      const data = await getHotelsList(token);
      setAllHotels(data);
    } catch (err) {
      toast('Não foi possível obter a lista de hoteis!');
    }
  }

  async function checkPayment(hotelId) {
    try {
      const data = await getTickets(token);
      if(data.status === 'PAID') {
        setPayment(true);
      } else {
        toast('Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem');
      }
      if(data.TicketType.isRemote === false) {
        setIsRemote(false);
      }
    } catch (err) {
      toast('Não foi possível confirmar seu pagamento!');
    }
  }

  async function getRooms(hotelId) {
    try {
      const data = await getHotelRooms(token, hotelId);
      setHotelRooms(data);
    } catch (err) {
      toast('Não foi possível obter a lista de quartos!');
    }
  }

  function handleHotelID(hotelId) {
    if (selectedHotel === hotelId) {
      setSelectedHotel(null);
      setHotelRooms(null);
    } else {
      setSelectedHotel(hotelId);
      getRooms(hotelId);
    }
  }

  function handleRoomID(roomId) {
    if (selectedRoom === roomId) {
      setSelectedRoom(null);
    } else {
      setSelectedRoom(roomId);
    }
  }

  console.log(hotelRooms);
  console.log(allHotels);

  return (
    <>
      <StyledTypography variant="h4">
        Escolha de hotel e quarto
      </StyledTypography>
      {payment === false ?  
        <RequirementPage message="Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem" />
        : isRemote === true ?  
          <RequirementPage message="Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades" />
          : <StyledTypography variant="h6" color="textSecondary">Primeiro, escolha seu hotel</StyledTypography>}
      { (payment === true && isRemote === false) && 
      <>
        <InputContainer>
          { allHotels.map( (hotel) => 
            <div key={hotel.id}>
              <HotelCard
                type ={selectedHotel !== hotel.id ? 'primary' : 'secondary'}
                width ='196px'
                height ='264px'
                image = {hotel.image}
                title = {hotel.name}
                types='Single and Double'
                places='103 vagas'
                isClickable
                handleClick={() => handleHotelID(hotel.id)}
              />
            </div>
          ) }
        </InputContainer>
        
        { (payment === true && isRemote === false && hotelRooms !== null) && 
        <>
          <StyledTypography variant="h6" color="textSecondary">Ótima pedida! Agora escolha seu quarto</StyledTypography>
          <InputContainer2>
            { hotelRooms.Rooms.map( (room) => 
              <div key={room.id}>
                <RoomCard
                  type ={selectedRoom !== room.id ? 'primary' : 'secondary'}
                  width ='190px'
                  height ='45px'
                  room = {room}
                  isClickable
                  handleClick={() => handleRoomID(room.id)}
                />
              </div>
            ) }
          </InputContainer2>
        </>
        }
      </>
      }
    </>
  );
}

// no back contar todos os bookings e todos as capacities
const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 34px!important;
`;

const InputContainer2 = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 34px!important;
  flex-wrap: wrap;
`;
