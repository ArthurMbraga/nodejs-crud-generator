import styled from "styled-components";
import { Button, Form } from "react-bootstrap";

const StyledButton = styled(Button)`
  height: 36px;
  font-weight: 600;
`;

const StyledCheckbox = styled(Form.Check)`
  height: 36px;
  padding-top: 8px;
`;

export { StyledButton, StyledCheckbox };
