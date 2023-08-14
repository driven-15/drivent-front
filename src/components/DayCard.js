import styled from 'styled-components';

export default function DayCard({ width, height, handleClick, isClickable, title, type }) {
  const dataObj = new Date(title);
  const diasDaSemana = [
    'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
  ];
  const meses = [
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
  ];
  const day = diasDaSemana[dataObj.getDay()] + ' ' + dataObj.getDate() + '/' + meses[dataObj.getMonth()];

  return (
    <Wrapper
      type={type}
      width={width}
      height={height}
      onClick={isClickable ? handleClick : undefined}
    >
      <Title>{day}</Title>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: ${({ type }) => (type === 'primary' ? '#E0E0E0' : '#FFD37D')};
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
  border: none;
  padding: 9px;
  margin-right: 24px;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  color: #000000;
`;
