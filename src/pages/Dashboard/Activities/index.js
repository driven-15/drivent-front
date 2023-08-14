import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import useToken from '../../../hooks/useToken';
import { toast } from 'react-toastify';
import { getTickets } from '../../../services/ticketsApi';
import Typography from '@material-ui/core/Typography';
import RequirementPage from '../../../components/RequirementPage';
import { getBooking } from '../../../services/bookingApi';
import { getActivities } from '../../../services/activitiesApi';
import DayCard from '../../../components/DayCard';
import ActivitiesCard from '../../../components/ActivitiesCard';

export default function Activities() {
  const [selectedAct, setSelectedAct] = useState();
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayActivities, setDayActivities] = useState([]);
  const [payment, setPayment] = useState(false);
  const [isRemote, setIsRemote] = useState(true);
  const [booking, setBooking] = useState(false);
  const [all, setAll] = useState({});
  const token = useToken();

  useEffect(() => {
    checkPayment();
  }, []);

  async function checkPayment() {
    try {
      const data = await getTickets(token);
      if(data.status === 'PAID') {
        setPayment(true);
      } else {
        toast('Você precisa ter confirmado pagamento antes de fazer a escolha de atividades');
      }
      if(data.TicketType.isRemote === false) {
        setIsRemote(false);
        checkBooking();
      }
    } catch (err) {
      toast('Não foi possível confirmar seu pagamento!');
    }
  }

  async function checkBooking() {
    try{
      const data = await getBooking(token);
      if(data.id) {
        setBooking(true);
        getActivitiesList();
      }
    } catch (err) {
      toast('Não foi possível confirmar sua reserva de hotel!');
    }    
  }

  async function getActivitiesList() {
    try {
      const data = await getActivities(token);
      setAll(data);
    } catch (err) {
      toast('Não foi possível obter a lista de atividades!');
    }
  }

  function handleDay(day) {
    if (selectedDay === day) {
      setSelectedDay(null);
      setSelectedAct(null);
      setDayActivities([]);
    } else {
      setSelectedDay(day);
      setDayActivities(all[day]);
    }
  }
  
  function handleActivity(id) {
    if (selectedAct === id) {
      setSelectedAct(null);
    } else {
      setSelectedAct(id);
    }
  }

  return (
    <>
      <StyledTypography variant="h4">
        Escolha de atividades
      </StyledTypography>
      {payment === false ?  
        <RequirementPage message="Você precisa ter confirmado pagamento antes de fazer a escolha de atividades." />
        : isRemote === true ?  
          <RequirementPage message="Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades." />
          : booking === false ?
            <RequirementPage message="Você precisa ter escolhido um quarto antes de fazer a escolha de atividades." />
            : <StyledTypography variant="h6" color="textSecondary">Primeiro, filtre pelo dia do evento: </StyledTypography>
      }
      {payment === true && isRemote === false && booking === true && (
        <>
          <InputContainer>
            {Object.keys(all).map((key) => (
              <div key={key}>
                <DayCard
                  type={selectedDay !== key ? 'primary' : 'secondary'}
                  width="131px"
                  height="37px"
                  title={key}
                  isClickable
                  handleClick={() => handleDay(key)}
                />
              </div>
            ))}
          </InputContainer>
          <InputContainer>
            { selectedDay !== null && (
              <>
                <ContainerSalas>
                  <TituloSalas>
                        Auditorio Principal
                  </TituloSalas>
                  <ContainerAtividades>
                    {dayActivities.map((activ) => (
                      activ.title.slice(0, 8) !== 'Palestra' && activ.title.slice(0, 8) !== 'Workshop' &&   (
                        <div key={activ.id}>
                          <ActivitiesCard
                            type={selectedAct !== activ.id ? 'primary' : 'secondary'}
                            id={activ.id}
                            width='265px'
                            title={activ.title}
                            capacity={activ.capacity}
                            start={activ.startsAt}
                            end={activ.endsAt}
                            isClickable
                            handleClick={() => handleActivity(activ.id)}
                          />
                        </div>
                      )
                    ))}
                  </ContainerAtividades>
                </ContainerSalas>
                <ContainerSalas>
                  <TituloSalas>
                  Auditório Lateral
                  </TituloSalas>
                  <ContainerAtividades>
                    {dayActivities.map((activ) => (
                      activ.title.slice(0, 8) === 'Palestra' &&   (
                        <div key={activ.id}>
                          <ActivitiesCard
                            type={selectedAct !== activ.id ? 'primary' : 'secondary'}
                            id={activ.id}
                            width='265px'
                            title={activ.title}
                            capacity={activ.capacity}
                            start={activ.startsAt}
                            end={activ.endsAt}
                            isClickable
                            handleClick={() => handleActivity(activ.id)}
                          />
                        </div>
                      )
                    ))}
                  </ContainerAtividades>
                </ContainerSalas>
                <ContainerSalas>
                  <TituloSalas>
                    Sala de Workshop
                  </TituloSalas>
                  <ContainerAtividades>
                    {dayActivities.map((activ) => (
                      activ.title.slice(0, 8) === 'Workshop' &&   (
                        <div key={activ.id}>
                          <ActivitiesCard
                            type={selectedAct !== activ.id ? 'primary' : 'secondary'}
                            id={activ.id}
                            width='265px'
                            title={activ.title}
                            capacity={activ.capacity}
                            start={activ.startsAt}
                            end={activ.endsAt}
                            isClickable
                            handleClick={() => handleActivity(activ.id)}
                          />
                        </div>
                      )
                    ))}
                  </ContainerAtividades>
                </ContainerSalas>
              </>
            )}
          </InputContainer>
        </>
      )}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 34px !important;
`;

const ContainerSalas = styled.div`
  width: 300px;
`;

const ContainerAtividades = styled.div`
  border: 1px solid #D7D7D7;
  height: 392px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const TituloSalas = styled.div`
  font-size: 17px;
  font-weight: 400;
  text-align: center;
  color: #7B7B7B;
  margin: 5px 0 15px 0;
`;
