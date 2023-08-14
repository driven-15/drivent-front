import styled from 'styled-components';
import available from '../assets/images/pepicons_enter.svg';
import noplaces from '../assets/images/ant-design_close-circle-outlined.svg';
import { postActivities } from '../services/activitiesApi';
import { toast } from 'react-toastify';
import useToken from '../hooks/useToken';

export default function ActivitiesCard({ type, id, width, title, capacity, start, end, isClickable, handleClick }) {
  const start2 = new Date(start);
  const end2 = new Date(end);
  const comeco = start2.getUTCHours();
  const fim = end2.getUTCHours();
  const tempo = fim - comeco;
  const altura = 80*tempo + 'px';
  const token = useToken();

  async function selectActivity() {
    try {
      const body = id;
      await postActivities(body, token);
    } catch (error) {
      return toast('Erro ao escolher o a atividade');
    }
  }

  return (
    <Wrapper
      type={type}
      width={width}
      height={altura}
      onClick={isClickable ? handleClick : undefined}
    >
      <Left>
        <Title>{title}</Title>
        <Time>{comeco}:00 - {fim}:00</Time>
      </Left>
      <Rigth>
        {capacity === 0 ?
          <>
            <Image src={noplaces} alt="foto hotel" />
            <Capacity capacity={capacity}>Esgotado</Capacity>
          </>
          : <>
            <Image src={available} alt="foto hotel" onClick={selectActivity()}/>
            <Capacity capacity={capacity}>{capacity} vagas </Capacity>
          </>
        }
      </Rigth>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: ${({ type }) => (type === 'primary' ? '#F1F1F1' : '#D0FFDB' )};
  border: none;
  padding: 9px;
`;

const Left = styled.div`
    width: 75%;
    height: 90%;
    border-right: 1px solid rgba(207, 207, 207, 1)
`;

const Rigth = styled.div`
    width: 25%;
`;

const Title = styled.p`
  font-size: 12px;
  font-weight: 700;
  text-align: left;
  color: #343434;
  margin-bottom: 5px;
`;

const Time = styled.p`
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  color: #343434;
`;

const Capacity = styled.p`
  font-size: 9px;
  font-weight: 400;
  text-align: center;
  color: ${({ capacity }) => (capacity === 0 ? '#CC6666' : '#078632' )};
`;

const Image = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 5px;
  margin: 2px;
`;
