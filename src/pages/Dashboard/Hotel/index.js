import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import HotelCard from '../../../components/HotelCard';
import React, { useState } from 'react';

export default function Hotel() {
  // enviar req pro banco e ver se a pessoa pode receber a lista de hoteis
  // se nao puder exibo "Você precisa ter confirmado pagamento antes de fazer escolha da hospedagem"
  // se o ingresso nao incluir hoteis exibo
  // Sua modalidade de ingresso não inclui hospedagem, prossiga para a escolha de ativiades
  // se estiver tudo ok exibo a lista de hoteis
  // pegar os dados recebidos dos hoteis e exibir na tela

  const [selectedHotel, setSelectedHotel] = useState(null);

  function handleHotelType(hotel) {
    setSelectedHotel(hotel);
  }

  return (
    <>
      <p>'Hotel: Em breve!'</p>
      <StyledTypography variant="h6" color="textSecondary">Primeiro escolha seu hotel</StyledTypography>
      <InputContainer>
        hotel 1
        <HotelCard
          width='145px'
          height='145px'
          image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFRXI9g6dkIkzK_zh9H9MS2CpsPrjypfOa6PjMexOGDHM3qjvsFJyFN3yOe1XPPQubUfA&usqp=CAU"
          title='Hotel 1'
          types='single'
          place='103 vagas'
          isClickable
          handleClick={() => handleHotelType('hotelID')}
        />
      </InputContainer>
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
