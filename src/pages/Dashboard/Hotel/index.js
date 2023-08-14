import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import HotelCard from '../../../components/HotelCard';
import React, { useState, useEffect } from 'react';
import useToken from '../../../hooks/useToken';
import { getHotelRooms, getHotelsList } from '../../../services/hotelsApi';
import { toast } from 'react-toastify';
import RequirementPage from '../../../components/RequirementPage';
import { getTickets } from '../../../services/ticketsApi';
import * as bookingApi from '../../../services/bookingApi';
import RoomCard from '../../../components/RoomCard';

export default function Hotel() {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [allHotels, setAllHotels] = useState([]);
  const [hotelRooms, setHotelRooms] = useState(null);
  const [isRemote, setIsRemote] = useState(true);
  const [payment, setPayment] = useState(false);
  const [hasBooking, setHasBooking] = useState(false);
  const [booking, setBooking] = useState(undefined);
  const token = useToken();

  useEffect(() => {
    checkPayment();
  }, []);

  async function getHotels() {
    try {
      const data = await getHotelsList(token);
      setAllHotels(data);
    } catch (err) {
      toast('Não foi possível obter a lista de hoteis!');
    }
  }

  async function checkPayment() {
    try {
      const data = await getTickets(token);
      if (data.status === 'PAID') {
        setPayment(true);
      } else {
        toast('Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem');
      }
      if (data.TicketType.isRemote === false) {
        setIsRemote(false);
        getHotels();
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

  async function getBooking() {
    try {
      const data = await bookingApi.getBooking(token);
      const people = data.Room.Booking.length - 1;
      const selectedHotel = { ...allHotels.find((hotel) => hotel.id === data.Room.hotelId) };
      const peopleOnRoom = data.Room.Booking.length === 1 ? 'Somente você' : `Você e mais ${people} ${people > 1 ? 'pessoas' : 'pessoa'}`;
      data.Room.type = data.Room.capacity === 1 ? 'Single' : data.Room.capacity === 2 ? 'Double' : 'Triple'; 

      setBooking({ ...data, hotel: selectedHotel, peopleOnRoom: peopleOnRoom });
      setHasBooking(true);
    } catch (err) {
      setBooking(undefined);
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
  
  async function handleSubmit(roomId) {
    try {
      if (booking) {
        await bookingApi.updateBooking({ roomId }, booking.id, token);
      } else {
        await bookingApi.bookingRoom({ roomId }, token);
      }
      getBooking();
    } catch (error) {
      return toast('Erro ao escolher o quarto');
    }
  }

  function handleChangeRoom() {
    setHasBooking(false);
  }

  useEffect(() => {
    if (allHotels.length > 0) {
      getBooking();
    }
  }, [allHotels]);

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {!hasBooking ? (
        <>
          {payment === false ? (
            <RequirementPage message="Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem." />
          ) : isRemote === true ? (
            <RequirementPage message="Sua modalidade de ingresso não inclui hospedagem. Prossiga para a escolha de atividades." />
          ) : (
            <StyledTypography variant="h6" color="textSecondary">
              Primeiro, escolha seu hotel
            </StyledTypography>
          )}
          {payment === true && isRemote === false && (
            <>
              <InputContainer>
                {allHotels.map((hotel) => (
                  <div key={hotel.id}>
                    <HotelCard
                      type={selectedHotel !== hotel.id ? 'primary' : 'secondary'}
                      width="196px"
                      height="264px"
                      image={hotel.image}
                      title={hotel.name}
                      firstSubtitle="Tipos de Acomodação:"
                      firstValue="Single and Double"
                      secondSubtitle="Vagas disponíveis:"
                      secondValue={hotel.capacity._sum.capacity}
                      isClickable
                      handleClick={() => handleHotelID(hotel.id)}
                    />
                  </div>
                ))}
              </InputContainer>

              {payment === true && isRemote === false && hotelRooms !== null && (
                <>
                  <StyledTypography variant="h6" color="textSecondary">
                    Ótima pedida! Agora escolha seu quarto
                  </StyledTypography>
                  <InputContainer2>
                    {hotelRooms.Rooms.map((room) => (
                      <div key={room.id}>
                        {room.booking}
                        <RoomCard
                          type={selectedRoom !== room.id ? 'primary' : 'secondary'}
                          width="190px"
                          height="45px"
                          room={room}
                          booking={room.Booking}
                          handleClick={() => handleRoomID(room.id)}
                        />
                      </div>
                    ))}
                  </InputContainer2>
                  <SubmitContainer>
                    <Button onClick={() => handleSubmit(selectedRoom)}>
                      RESERVAR QUARTO
                    </Button>
                  </SubmitContainer>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <StyledTypography variant="h6" color="textSecondary">
          Você já escolheu seu quarto:
          </StyledTypography>

          <InputContainer>
            <div >
              <HotelCard
                type='secondary'
                width="196px"
                height="264px"
                image={booking.hotel.image}
                title={booking.hotel.name}
                firstSubtitle="Quarto reservado"
                firstValue={`${booking.Room.name} (${booking.Room.type})`}
                secondSubtitle="Pessoas no seu quarto"
                secondValue={booking.peopleOnRoom}
                isClickable={false}
              />
            </div>

          </InputContainer>
          <SubmitContainer>
            <Button type="submit" onClick={handleChangeRoom}>
              TROCAR QUARTO
            </Button>
          </SubmitContainer>
        </>
      )}
    </>
  );
}

// no back contar todos os bookings e todos as capacities
const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 34px !important;
`;

const InputContainer2 = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 34px !important;
  flex-wrap: wrap;
`;

const SubmitContainer = styled.div`
  width: 100% !important;

  > button {
    margin-top: 0 !important;
  }
`;

const Button = styled.button`
  width: 182px;
  height: 37px;
  margin-top: 0 !important;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  border: none;
`;
