import styled from "styled-components";

const StyledSwitchContainer = styled.div`
  & {
    position: relative;
    width: 40px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  .onoffswitch-checkbox {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  .onoffswitch-label {
    display: block;
    overflow: hidden;
    cursor: pointer;
    height: 20px;
    padding: 0;
    line-height: 20px;
    border: 2px solid #e3e3e3;
    border-radius: 20px;
    background-color: #ffffff;
    transition: background-color 0.3s ease-in;
  }
  .onoffswitch-label:before {
    content: "";
    display: block;
    width: 20px;
    margin: 0px;
    background: #ffffff;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 18px;
    border: 2px solid #e3e3e3;
    border-radius: 20px;
    transition: all 0.3s ease-in 0s;
  }
  .onoffswitch-checkbox:checked + .onoffswitch-label {
    background-color: #49e845;
  }
  .onoffswitch-checkbox:checked + .onoffswitch-label,
  .onoffswitch-checkbox:checked + .onoffswitch-label:before {
    border-color: #49e845;
  }
  .onoffswitch-checkbox:checked + .onoffswitch-label:before {
    right: 0px;
  }
`;

export { StyledSwitchContainer };
