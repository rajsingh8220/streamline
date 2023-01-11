import React from "react";
class OtpInput extends React.Component {
  constructor(props) {
    super(props);
    let otpArray = new Array(this.props.numInputs).fill("");
    this.state = {
      otp: otpArray,
    };
    this.otp0 = React.createRef();
  }
  componentDidMount() {
    this.refs.otp0.focus();
  }
  handelChange(event, index) {
    let fieldValue = /^[0-9]{1,1}$/.test(+event.target.value)
      ? event.target.value
      : "";
    let field = event.target;
    let otpFields = this.state.otp;
    otpFields[index] = fieldValue;
    console.log(otpFields);
    this.setState({ otp: otpFields });
    console.log(this.props, "this.props");
    this.props.handleChange(this.state.otp.join(""));
    if (fieldValue != "") {
      event.preventDefault();
      let next = this.refs[field.name].nextSibling;
      if (next && next.tagName === "INPUT") {
        this.refs[field.name].nextSibling.focus();
      }
    }
  }
  handleKeyDown(event, index) {
    if (event.keyCode === 8 && event.target.value.length === 0) {
      event.preventDefault();
      let previous = this.refs[event.target.name].previousSibling;
      console.log(previous);
      if (previous && previous.tagName === "INPUT") {
        this.refs[event.target.name].previousSibling.focus();
      }
    }
  }

  render() {
    return (
      <div>
        {[...Array(this.props.numInputs)].map((otp, index) => {
          return (
            <input
              pattern="\d{1}"
              type="text"
              key={index}
              name={"otp" + index}
              maxLength="1"
              ref={"otp" + index}
              placeholder="0"
              inputMode="numeric"
              //   autoComplete="one-time-code"
              onKeyDown={(event) => this.handleKeyDown(event, index)}
              onChange={(event) => this.handelChange(event, index)}
              value={this.state.otp[index]}
              className="otp-input ring-0 focus:ring-0 focus:outline-0 focus:border-0 w-10 h-[58px] outline-none text-2xl text-black text-center border-0"
            />
          );
        })}
      </div>
    );
  }
}
export default OtpInput;
