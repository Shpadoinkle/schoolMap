import React, { Component } from "react";
import { X, XCircle } from "react-feather";
import { withTheme } from "styled-components";
import Styles from "./styles";

class Zelect extends Component {
  constructor(props) {
    super(props);
    this.zelect = React.createRef();
    this.clear = React.createRef();
    this.multi = React.createRef();
    this.dropdown = React.createRef();
    this.state = {
      // inputValue: props.value || '',
      showOptions: false,
      selection: [],
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutsideDropdown);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutsideDropdown);
  }

  handleChange = (event) => {
    const { onChange } = this.props;
    onChange && onChange(event);
  };

  // handleCloseDropdown = () => {
  //   this.setState({showOptions: false})
  // }

  handleOpenDropdown = () => {
    const { disabled } = this.props;
    if (disabled) {
      // Maybe add tooltip or something?
      return;
    }
    this.setState({ showOptions: true });
  };

  handleClickOutsideDropdown = (evt) => {
    const { onBlur } = this.props;
    onBlur && onBlur();

    if (this.multi && this.multi.current.contains(evt.target)) return;
    if (this.clear && this.clear.current.contains(evt.target)) return;
    if (this.dropdown && this.dropdown.current.contains(evt.target)) return;
    if (!this.zelect.current.contains(evt.target)) {
      this.setState({ showOptions: false });
    }
  };

  handleSelectValue = (item, multiselect) => {
    const { onSelect } = this.props;
    const { selection } = this.state;

    if (multiselect) {
      this.setState({ selection: [...selection, item] });
      return;
    }

    this.setState({ showOptions: false });

    onSelect && onSelect(item);
  };

  handleClearInput = () => {
    const { onClear } = this.props;
    // this.setState({inputValue: '', selection: [], showOptions: true})
    this.setState({ showOptions: true });
    onClear && onClear();
  };

  // clear() {
  //   this.handleClearInput()
  // }

  handleClearSelect = (s) => {
    const { selection } = this.state;
    this.setState({
      selection: selection.filter(({ value }) => value !== s.value),
    });
  };

  render() {
    const {
      searchable = false,
      placeholder,
      clearable = false,
      multiselect = false,
      disabled = false,
      primary = false,
      icon = null,
      noFilter = false,
      value = "",
      noIcon,
    } = this.props;

    // const {inputValue, showOptions, selection} = this.state
    const { showOptions, selection } = this.state;

    let data = this.props.data || [];

    //SEARCHABLE
    if (searchable && !noFilter) {
      data = data.filter(({ label }) => {
        // label.toLowerCase().includes(inputValue.toLowerCase())
        return label.toLowerCase().includes(value.toLowerCase());
      });
    }

    // MULTISELECT
    if (multiselect) {
      data = data.filter(
        (data) => !selection.some((s) => s.value === data.value)
      );
    }

    // const showCross =
    //   (clearable && inputValue.length) || (multiselect && selection.length)

    const showCross =
      (clearable && value.length) || (multiselect && selection.length);

    return (
      <Styles {...this.props}>
        <div
          className={`zelect${disabled ? " disabled" : ""}${
            primary ? " primary" : ""
          }`}
        >
          <div
            className="zelect-container"
            onClick={this.handleOpenDropdown}
            ref={this.zelect}
          >
            <div
              className={`zelect-input-container${disabled ? " disabled" : ""}`}
              ref={this.multi}
            >
              {icon ? <div className="zelect-input-icon">{icon}</div> : null}
              {multiselect && selection && selection.length ? (
                <div className="multiselect-container">
                  {selection.map((s, i) => (
                    <div key={`${s.label}_${i}`} className="selection">
                      <div
                        className="selection-icon-container"
                        onClick={this.handleClearSelect.bind(this, s)}
                      >
                        <XCircle className="selection-icon" />
                      </div>
                      <div className="selection-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              ) : null}
              {multiselect && !searchable && selection.length ? null : (
                <input
                  type="text"
                  disabled={!searchable}
                  placeholder={placeholder}
                  className={`zelect-input ${
                    icon ? "zelect-input-with-icon" : ""
                  } ${searchable ? "" : "zelect-input-disabled"}`}
                  // value={inputValue}
                  value={value || ""}
                  onChange={this.handleChange}
                />
              )}
              {/* ACTIONS */}
              <div
                className={`zelect-cross ${
                  (clearable && value.length) ||
                  (multiselect && selection.length)
                    ? "zelect-cross-active"
                    : ""
                }`}
                onClick={this.handleClearInput}
                ref={this.clear}
              >
                <X
                  style={{
                    color: primary ? "#fff" : "#000",
                    width: 20,
                  }}
                ></X>
              </div>

              {!noIcon && (
                <div
                  className={`zelect-arrows ${
                    showOptions ? "zelect-arrow-active" : ""
                  }`}
                >
                  <div className="zelect-arrow-up"></div>
                  <div style={{ height: 2.5 }} />
                  <div className="zelect-arrow-down"></div>
                </div>
              )}
              {/* END ACTIONS */}
            </div>
          </div>
          <div
            className={`zelect-dropdown ${
              showOptions ? "zelect-dropdown-active" : ""
            }`}
            ref={this.dropdown}
            style={{
              top:
                this.zelect && this.zelect.current
                  ? this.zelect.current.clientHeight + 4
                  : 43,
            }}
          >
            {/* the options */}
            {data.length ? (
              data.map(({ label, ...rest }, i) => (
                <div
                  key={`${label}_${i}`}
                  onClick={this.handleSelectValue.bind(
                    this,
                    { label, ...rest },
                    multiselect
                  )}
                  className="zelect-option"
                >
                  {label}
                </div>
              ))
            ) : (
              <div className="zelect-option zelect-option-no-hover">
                No results
              </div>
            )}
          </div>
        </div>
      </Styles>
    );
  }
}

export default withTheme(Zelect);
