import styled from 'styled-components'

const Styles = styled.div`
  ${({mr}) =>
    mr
      ? typeof mr === 'boolean'
        ? 'margin-right: 10px;'
        : 'margin-right:' + Number(mr) + 'px;'
      : ''}

  width: ${({width}) => width || '100%'};

  .zelect {
    width: ${({width}) => width || '100%'};
    cursor: pointer;
    position: relative;

    height: 41px;

    & .zelect-container {
      height: 100%;
    }

    &.primary {
      .zelect-input-container {
        background-color: ${({theme}) => theme.primary};

        .zelect-input {
          background-color: ${({theme}) => theme.primary};
          color: white;

          &::placeholder {
            color: white;
          }
        }

        .zelect-arrow-down {
          border-top: 5px solid white;
        }

        .zelect-arrow-up {
          border-bottom: 5px solid white;
        }

        .zelect-cross {
          color: white;
        }
      }
    }

    &.disabled,
    &.disabled * {
      cursor: not-allowed !important;
    }

    .zelect-input-container {
      ${({noBorder}) => (noBorder ? '' : 'border: solid 1px #d9d9d9;')}
      width: 100%;
      border-radius: 6px;
      overflow: visible;
      position: relative;
      height: 100%;
    }

    .zelect-input-container.disabled {
      pointer-events: none;
      border: solid 1px #e6e6e6;
      
      & .zelect-input {
        background-color: #e6e6e6;
      }
    }
    
    .zelect-input-icon {
      position: absolute;
      left: 10px;
      // width: 20px;
      top: 50%;
      transform: translateY(-42%);
    }
    
    .zelect-input {
      border: none;
      padding: 8px 8px;
      border-radius: 6px;
      width: 100%;
      padding-right: 40px;
      color: #000;
      height: 100%;
      background-color: white;
      cursor: pointer;

      &.zelect-input-with-icon {
        padding-left: 35px;
      }

      &.zelect-input-disabled {
        pointer-events: none;
      }
    }

    .multiselect-container {
      display: flex;
      flex-direction: row;
      padding: 3px;
      flex-wrap: wrap;

      .selection {
        display: flex;
        align-items: center;
        background-color: #f2f2f2;
        margin-right: 4px;
        margin-bottom: 0px;
        border-radius: 4px;
        padding: 0.5px 8px;
        transition: 0.2s;

        .selection-icon-container {
          margin-right: 5px;

          .selection-icon {
            color: #828282;
            width: 15px;
            position: relative;
            top: 2.5px;
            transition: 0.2s;

            &:hover {
              transform: scale(1.1) rotate(90deg);
              color: #000;
            }
          }
        }
        .selection-label {
          font-size: 0.8em;
        }
      }

      .selection:hover {
        background-color: #e2e2e2;
      }
    }

    .zelect-arrows {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      transition: 0.2s;

      &.zelect-arrow-active {
        transform: translateY(-50%) rotateZ(180deg);
      }
    }

    .zelect-arrow-down {
      width: 0;
      height: 0;
      border-left: 4.5px solid transparent;
      border-right: 4.5px solid transparent;
      border-top: 5px solid #828282;
    }

    .zelect-arrow-up {
      width: 0;
      height: 0;
      border-left: 4.5px solid transparent;
      border-right: 4.5px solid transparent;
      border-bottom: 5px solid #828282;
    }

    .zelect-cross {
      position: absolute;
      right: 30px;
      top: 50%;
      transition: 0.2s;
      transform: translateY(-42%);
      display: none;
      opacity: 0.5;
      transition: 0.2s ease-in-out;

      &.zelect-cross-active {
        display: block;

        &:hover {
          opacity: 1;
          transform: translateY(-57%) rotateZ(180deg);
        }

        &:active {
          opacity: 1;
          transform: translateY(-57%) rotateZ(180deg) scale(0.8);
          transition: 0.1s;
        }
      }
    }

    .zelect-dropdown {
      z-index: 99;
      border-radius: 5px;
      transform: scaleY(0);
      transform-origin: top left;
      position: absolute;
      min-width: 100%;
      max-height: 400px;
      overflow: hidden;
      overflow-y: auto;
      top: 43px;
      border: 1px solid #f2f2f2;
      background-color: white;
      box-shadow: 0px 3px 8px -2px rgba(0, 0, 0, 0.1);
      transition: 0.1s ease-in-out;
      // overflow: hidden;
      // padding: 3px 5px;

      &.zelect-dropdown-active {
        transform: scaleY(1);
        transition: 0.2s;
      }

      .zelect-option {
        padding: 5px 8px;
        transition: 0.2s;
        background-color: white;
      }

      .zelect-option:hover {
        background-color: #e73e3faa;
        color: white;
      }

      .zelect-option.zelect-option-no-hover:hover {
        background-color: white;
        color: inherit;
      }

      .zelect-option:active {
        background-color: #e73e3fff;
        color: white;
        transition: 0s;
      }
    }
  }
`

export default Styles
