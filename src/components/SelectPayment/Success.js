import styled, { css } from 'styled-components';
import { GoCheckCircleFill } from 'react-icons/go';
import Typography from '@material-ui/core/Typography';

export default function Success() {
  return (
    <Wrapper>
      <StyledCheckIcon />
      <div>
        <StyledTypography variant="subtitle1">
          <Bold>Pagamento confirmado!</Bold>
        </StyledTypography>
        <StyledTypography variant="subtitle1">
        Prossiga para escolha de hospedagem e atividades
        </StyledTypography>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledCheckIcon = styled(GoCheckCircleFill)`
  width: 44px;
  height: 44px;
  fill: #36B853;
`;

const StyledTypography = styled(Typography)`
  margin-bottom: 0 !important;
  line-height: 1.25 !important;
  color: #454545;
`;

const Bold = styled.span`
  font-weight: bold;
`;
