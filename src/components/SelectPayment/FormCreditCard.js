import { useState } from 'react';
import styled, { css } from 'styled-components';
import { GoCheckCircleFill, GoXCircleFill } from 'react-icons/go';
import Cards from 'react-credit-cards-2';

import { clearNumber, formatCreditCardNumber, formatCVC, formatExpirationDate } from './utils';
import Button from '../Form/Button';

import 'react-credit-cards-2/dist/es/styles-compiled.css';

export default function FormCreditCard({ setIsPaid }) {
  const [formData, setFormData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
  });
  const [validity, setValidity] = useState({
    number: null,
    name: null,
    expiry: null,
    cvc: null,
  });

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid && issuer !== formData.issuer) {
      setFormData((prev) => ({ ...prev, issuer }));
    }
  };

  const checkExpirationDate = (date) => {
    const month = Number(date.slice(0, 2));
    const year = Number(date.slice(3, 5));

    const currentDate = new Date();
    const getCurrentYear = currentDate.getFullYear();

    const currentYear = Number(getCurrentYear.toString().slice(-2));
    const currentMonth = Number(currentDate.getMonth() + 1);

    const validMonth = month > 0 && month <= 12;
    const validYear = year >= currentYear;

    if (currentYear === year) {
      const isValid = currentMonth <= month;
      return isValid;
    }

    return validMonth && validYear;
  };

  const checkName = (fullName) => {
    const names = fullName.split(' ');

    const hadMoreThanOneName = names.length > 1;
    const allButLastNameIsValid = names.slice(0, -1).every((name) => name.length >= 1);
    const lastNameIsValid = names[names.length - 1].length >= 3;

    return hadMoreThanOneName && allButLastNameIsValid && lastNameIsValid;
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    let finalValue = value;

    if (name === 'number') {
      finalValue = formatCreditCardNumber(value);

      if (clearNumber(finalValue).length === 16) {
        setValidity((prev) => ({ ...prev, number: true }));
      }
    } else if (name === 'expiry') {
      finalValue = formatExpirationDate(value);

      if (finalValue.length === 5) {
        const isValid = checkExpirationDate(finalValue);
        setValidity((prev) => ({ ...prev, expiry: isValid }));
      }
    } else if (name === 'cvc') {
      finalValue = formatCVC(value);
      if (finalValue.length === 3) {
        setValidity((prev) => ({ ...prev, cvc: true }));
      }
    } else if (name === 'name') {
      const isValid = checkName(finalValue);
      setValidity((prev) => ({ ...prev, name: isValid }));
    }

    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleInputFocus = (evt) => {
    setFormData((prev) => ({ ...prev, focused: evt.target.name }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPaid(true);
  };

  return (
    <Wrapper>
      <WrapperForm>
        <Cards
          number={formData.number}
          expiry={formData.expiry}
          cvc={formData.cvc}
          name={formData.name}
          focused={formData.focused}
          callback={handleCallback}
        />
        <Form onSubmit={handleSubmit}>
          <Row type="column">
            <WrapperInput>
              <Input
                type="tel"
                name="number"
                placeholder="Card Number"
                pattern="[\d| ]{16}"
                required
                value={formData.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              {validity.number && <ValidIcon />}
            </WrapperInput>
            <Small>E.g.: 49..., 51..., 36..., 37...</Small>
          </Row>
          <Row>
            <WrapperInput>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                required
                value={formData.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              {validity.name !== null && (
                validity.name ? <ValidIcon /> : <InvalidIcon />
              )}
            </WrapperInput>
          </Row>
          <Row>
            <WrapperInput>
              <Input
                type="tel"
                name="expiry"
                placeholder="Valid Thru"
                pattern="\d\d/\d\d"
                required
                value={formData.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              {validity.expiry !== null && (
                validity.expiry ? <ValidIcon /> : <InvalidIcon />
              )}
            </WrapperInput>
            <WrapperInput>
              <Input
                type="tel"
                name="cvc"
                placeholder="CVC"
                pattern="\d{3,4}"
                required
                value={formData.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              {validity.cvc && <ValidIcon />}
            </WrapperInput>
          </Row>
          <input type="hidden" name="issuer" value={formData.issuer} />
        </Form>
      </WrapperForm>

      <SubmitContainer>
        <Button
          type="submit"
          onClick={handleSubmit}
          // disabled={dynamicInputIsLoading || saveEnrollmentLoading}
        >
            Finalizar pagamento
        </Button>
      </SubmitContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 700px;
`;

const WrapperForm = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;

  width: 100%;
`;

const WrapperInput = styled.div`
  width: 100%;

  position: relative;
`;

const InvalidIcon = styled(GoXCircleFill)`
  position: absolute;
  right: 5px;
  top: calc(50% - 0.5em);
  height: 1em;

  fill: red;
`;

const ValidIcon = styled(GoCheckCircleFill)`
  position: absolute;
  right: 5px;
  top: calc(50% - 0.5em);
  height: 1em;

  fill: green;
`;

const Small = styled.small`
  font-size: 80%;
  font-weight: 400;
  color: #495057;
`;

const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Row = styled.div`
  display: flex;

  ${({ type }) =>
    type === 'column'
      ? css`
          flex-direction: column;
          gap: 0.5rem;
        `
      : css`
          gap: 1rem;
        `}
`;

const Input = styled.input`
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #000;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

const SubmitContainer = styled.div`
  margin-top: 40px;
  width: 100%;

  > button {
    margin-top: 0 ;
  }
`;
