import styled from 'styled-components';

const Card = styled.div`
  box-sizing: border-box;
  max-width: 410px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputS = styled.input`
  padding: 1rem;
  border: 1px solid #999;
  margin-top: 1rem;
  font-size: 0.8rem;
  width: 90%;
`;

const Select = styled.select`
  padding: 1rem;
  border: 1px solid #999;
  margin-top: 1rem;
  font-size: 0.8rem;
  width: 90%;
`;

const Button = styled.button`
  background: ${props => props.color == "primary" ? "linear-gradient(to bottom, #6371c7, #5563c1)" : "grey"};
  color: ${props => props.color == "primary" ? "white" : "palevioletred"};
  border-color: #3f4eae;
  border-radius: 3px;
  padding: 0.3rem 0.5rem;
  color: white;
  width: 150px;
  white-space: nowrap;
  margin-right: 0.1rem;
  vertical-align:middle
`;

const Logo = styled.img`
  width: 50%;
  margin-bottom: 1rem;
`;

const Error = styled.div`
  color: red;
  margin-top: 2px;
  font-size: 0.8rem;
`;

const Option = styled.option`
  font-size: 1rem;
`;

function SelectS({ register, options, name, ...rest }) {
  return (
    <Select {...register(name)} {...rest}>
      {options.map((value) => (
        <Option value={value}>{value}</Option>
      ))}
    </Select>
  );
}


export { Form, InputS, SelectS, Button, Logo, Card, Error };