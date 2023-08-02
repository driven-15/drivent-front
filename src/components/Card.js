import styled from 'styled-components';

export default function Card({ type, width, height, handleClick, isClickable, title, subtitle }) {
  return (
    <Wrapper
      type={type}
      width={width}
      height={height}
      onClick={isClickable && handleClick}
    >
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Wrapper>
  );
}

Card.defaultProps = {
  type: 'primary',
  handleClick: () => {},
  width: '100%',
  height: '145px',
  isClickable: false,
};

const Wrapper = styled.button`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  align-items: center;
  justify-content: center;
  border: ${({ type }) => (type === 'primary' ? 'none' : '1px solid rgba(206, 206, 206, 1)')};
  border-radius: 20px;
  background-color: ${({ type }) => (type === 'primary' ? 'rgba(255, 238, 210, 1)' : 'transparent')};
`;

const Title = styled.p`
  font-size: 16px;
  color: rgba(69, 69, 69, 1);
`;

const Subtitle = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: rgba(137, 137, 137, 1);
`;
