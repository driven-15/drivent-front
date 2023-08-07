import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import React from 'react';

export default function RequirementPage({ message }) {
  return (
    <MessageContainer>
      <StyledTypography variant="h6" color="textSecondary">
        {message}
      </StyledTypography>
    </MessageContainer>
  );
}

const StyledTypography = styled(Typography)`
  width: 500px;
  margin-bottom: 20px !important;
  text-align: center;
`;

const MessageContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;
