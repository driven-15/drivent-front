import styled from 'styled-components';

export default function HotelCard({ width, height, handleClick, isClickable, image, title, types, places }) {
  return (
    <Wrapper
      width={width}
      height={height}
      onClick={isClickable && handleClick}
    >
      <Image src={image} alt="foto hotel"/>
      <Title>{title}</Title>
      <Subtitle>Tipos de Acomodação:</Subtitle>
      <Description>{types}</Description>
      <Subtitle>Vagas disponíveis:</Subtitle>
      <Description>{places}</Description>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  align-items: center;
  justify-content: center;
  border: ${({ type }) => (type === 'primary' ? 'none' : '1px solid rgba(206, 206, 206, 1)')};
  border-radius: 20px;
  background-color: ${({ type }) => (type === 'primary' ? 'rgba(255, 238, 210, 1)' : 'transparent')};
`;

const Image = styled.img`
  width: ${({ width }) => width};
  border-radius: 15px;
`;

const Title = styled.p`
  font-size: 16px;
  color: rgba(69, 69, 69, 1);
`;

const Subtitle = styled.p`
  margin-top: 8px;
  font-size: 14px;
  font-weight: bold;
  color: rgba(137, 137, 137, 1);
`;

const Description = styled.p`
  margin-top: 8px;
  font-size: 12px;
  color: rgba(137, 137, 137, 1);
`;
