import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import HotelCard from '../../../components/HotelCard';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useToken from '../../../hooks/useToken';

export default function Hotel() {
  // enviar req pro banco e ver se a pessoa pode receber a lista de hoteis
  // se nao puder exibo "Você precisa ter confirmado pagamento antes de fazer escolha da hospedagem"
  // se o ingresso nao incluir hoteis exibo
  // Sua modalidade de ingresso não inclui hospedagem, prossiga para a escolha de ativiades
  // se estiver tudo ok exibo a lista de hoteis
  // pegar os dados recebidos dos hoteis e exibir na tela

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const token = useToken();

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    //setCarregando(true);
    /* const promise = axios.get(`${process.env.REACT_APP_API_URL}/hotels`, headers);
    promise.then(resposta => {
      setCarregando(false);
    });
    promise.catch(erro => {
      alert(erro.response.data);
    }); */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleHotelID(hotel) {
    selectedHotel === null ? setSelectedHotel(hotel) : setSelectedHotel(null);
  }

  return (
    <>
      <StyledTypography variant="h4">
        Escolha de hotel e quarto
      </StyledTypography>
      <StyledTypography variant="h6" color="textSecondary">Primeiro, escolha seu hotel</StyledTypography>
      <InputContainer>
        {carregando === true ?
          <Text>Carregando informações...</Text>
          :
          <HotelCard
            type={selectedHotel !== 'hotelID' ? 'primary' : 'secondary'}
            width='196px'
            height='264px'
            image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFRXI9g6dkIkzK_zh9H9MS2CpsPrjypfOa6PjMexOGDHM3qjvsFJyFN3yOe1XPPQubUfA&usqp=CAU"
            title='Driven Resort'
            types='Single and double'
            places='103 vagas'
            isClickable
            handleClick={() => handleHotelID('hotelID')}
          />
        }
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

const Text = styled.div`
  margin: auto;
  margin-top: 25%;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: center;
  color:  #8E8E8E;
`;
