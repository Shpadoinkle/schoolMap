import React from "react";
import { Check, X } from "react-feather";
import Loader from "react-loader-spinner";
import styled, { withTheme } from "styled-components";
import themeStore from "../mobx/theme";
import Padder from "./Padder";
import { Heading2, Subtitle } from "./Text";

const InputComponent = ({
  id,
  title,
  subtitle,
  help,
  onSubmit = null,
  label = null,
  placeholder = "Placeholder",
  disabled = false,
  hasValidation = false,
  loading = false,
  isValid = true,
  ...props
}) => {
  function keyPress(e) {
    if (e.keyCode == 13 && onSubmit) {
      onSubmit();
    }
  }

  return (
    <InputContainer>
      {!!label && <Label>{label}</Label>}

      {!!title && <Heading2>{title}</Heading2>}
      {!!subtitle && <Subtitle>{subtitle}</Subtitle>}

      {!!title || (!!subtitle && <Padder />)}
      <div style={{ position: "relative" }}>
        {hasValidation && (
          <div
            style={{
              position: "absolute",
              right: 10,
              height: 43,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading ? (
              <Loader
                type="TailSpin"
                color={themeStore.warning}
                height={18}
                width={18}
                //   timeout={3000} //3 secs
              />
            ) : isValid ? (
              <Check size={18} color={themeStore.validation} />
            ) : (
              <X size={18} height={18} color={themeStore.warning} />
            )}
          </div>
        )}

        <Input
          id={id}
          disabled={disabled}
          autocomplete="off"
          placeholder={placeholder}
          {...props}
          onKeyDown={keyPress}
        />
        {!!help && (
          <div>
            <Padder />
            <Subtitle>{help}</Subtitle>
          </div>
        )}
      </div>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  width: 100%;
`;

const Label = styled.div`
  font-family: "Roboto";
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.grey_1};
  margin-bottom: 7px;
`;

const Input = styled.input`
  outline: none !important;
  width: 100%;
  height: ${({ lg = false }) => (lg ? 62 : 43)}px;
  text-indent: 17px;
  border: 1px solid ${({ theme }) => theme.grey_3};
  border-radius: 6px;

  font-family: "Roboto";
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.2px;
  color: ${({ theme }) => theme.black};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:focus {
    border-color: ${({ theme }) => theme.grey_1};
  }

  ::placeholder {
    color: ${({ theme }) => theme.grey_2};
  }
`;

export default withTheme(InputComponent);
