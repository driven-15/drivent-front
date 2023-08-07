import styled from 'styled-components';
import free from '../assets/images/free.svg';
import full from '../assets/images/full.svg';
import selected from '../assets/images/pink.svg';
import unavailable from '../assets/images/gray.svg';

export default function RoomCard({ width, height, handleClick, isClickable, room, booking, type }) {
  return (
    <>
      <Wrapper
        type={type}
        width={width}
        height={height}
        onClick={isClickable && handleClick}
      >
        <Title>{room.capacity}</Title>
        {room.capacity === 1 ?
          <div>
            { type === 'secondary' ?
              <Image src={selected} alt="foto hotel"/>
              : booking.length === 0 ? 
                <Image src={free} alt="foto hotel"/>
                : <Image src={unavailable} alt="foto hotel"/>
            }
          </div>
          :
          <div>
            { (type === 'secondary' && room.capacity-booking.length === 2) ?
              <>
                <Image src={free} alt="foto hotel"/>
                <Image src={selected} alt="foto hotel"/>
              </>
              : (type === 'secondary' && room.capacity-booking.length === 1) ?
                <>
                  <Image src={selected} alt="foto hotel"/>
                  <Image src={full} alt="foto hotel"/>
                </>
                : booking.length === 0 ? 
                  <>
                    <Image src={free} alt="foto hotel"/>
                    <Image src={free} alt="foto hotel"/>
                  </>
                  : (type === 'primary' && room.capacity-booking.length === 1) ?
                    <>
                      <Image src={free} alt="foto hotel"/>
                      <Image src={full} alt="foto hotel"/>
                    </>
                    :
                    <>
                      <Image src={unavailable} alt="foto hotel"/>
                      <Image src={unavailable} alt="foto hotel"/>
                    </>
            }
          </div> 
        }
      </Wrapper>
    </>
 
  );
}
//se quarto ta cheio coloco em cinza
//se algum ja com booking fica preto
//se for o que você selecionou fica rosa e laranja
const Wrapper = styled.button`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background-color: ${({ type }) => (type === 'primary' ? 'transparent' : '#FFEED2')};
  border: 1px solid #CECECE;
  padding: 9px 15px;
  display: flex;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
  text-align: left;
  line-height: 24px;
  color: #343434;
  margin: 5px;
`;

const Image = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 5px;
  margin: 2px;
`;
