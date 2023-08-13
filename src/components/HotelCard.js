import styled from 'styled-components';

export default function HotelCard({ width, height, handleClick, isClickable, image, title, firstSubtitle, firstValue, secondSubtitle, secondValue, type }) {
  return (
    <Wrapper
      type={type}
      width={width}
      height={height}
      onClick={isClickable ? handleClick : undefined}
    >
      <Image src={image} alt="foto hotel"/>
      <Title>{title}</Title>
      <Subtitle>{firstSubtitle}</Subtitle>
      <Description>{firstValue}</Description>
      <Subtitle>{secondSubtitle}</Subtitle>
      <Description>{secondValue}</Description>
    </Wrapper>
  );
}

const Wrapper = styled.button`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${({ type }) => (type === 'primary' ? '#EBEBEB' : '#FFEED2')};
  border: none;
  padding: 9px;
`;

const Image = styled.img`
  width: 168px;
  height: 109px;
  border-radius: 5px;
  margin: 5px;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 400;
  text-align: left;
  color: #343434;
  margin: 5px;
`;

const Subtitle = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: #3C3C3C;
  text-align: left;
  margin: 12px 5px 3px 5px;
`;

const Description = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #3C3C3C;
  text-align: left;
  margin: 3px 5px;
`;
