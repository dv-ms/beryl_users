import { Button, Form } from "react-bootstrap";
import React, { Component } from "react";
const steps_json = require("../../steps.json");
export default class MultiStepForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [
        {
          name: "Personal Information",
          code: "personal_information",
        },
        {
          name: "Professional Information",
          code: "professional_information",
        },
        {
          name: "Acedamic Information",
          code: "academic_information",
        },
      ],
      progress_index: 0,
    };
  }
  componentDidMount() {}
  componentDidUpdate() {}

  changeStep = (step_index) => {
    if (step_index === -1) {
      this.submitAPI();
    } else {
      this.setState({
        progress_index: step_index,
      });
    }
  };

  renderForm = () => {
    switch (this.state.progress_index) {
      case 0:
        return <Step1 changeStep={this.changeStep} />;

      case 1:
        return <Step2 changeStep={this.changeStep} />;

      case 2:
        return <Step3 changeStep={this.changeStep} />;
    }
  };
  render() {
    return (
      <div>
        <h2>Multi Step Form</h2>
        {/* Steps */}
        {this.state.steps.map((step, index) => (
          <span
            style={{
              backgroundColor:
                this.state.progress_index === index ? "yellow" : "white",
            }}
          >
            {step.name}{" "}
          </span>
        ))}

        {/* Form */}
        {this.renderForm()}
      </div>
    );
  }
  componentWillUnmount() {}
}

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
    };
  }
  componentDidMount() {}
  componentDidUpdate() {}

  validate = () => {
    let fields = this.state.fields;
    for (let key in fields) {
      if (fields[key] === "") {
        this.setState({
          error:
            "Please enter " + fields[key].replaceAll("_", " ").toUpperCase(),
        });
        return false;
      }
    }
    return true;
  };

  render() {
    return (
      <>
        <div>Personal Information</div>
        <Button
          onClick={(e) => {
            let all_fine = this.validate();
            if (all_fine) {
              this.props.changeStep(1);
            }
          }}
        >
          Next
        </Button>
      </>
    );
  }
  componentWillUnmount() {}
}

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
    };
  }
  componentDidMount() {}
  componentDidUpdate() {}

  validate = () => {
    let fields = this.state.fields;
    for (let key in fields) {
      if (fields[key] === "") {
        this.setState({
          error:
            "Please enter " + fields[key].replaceAll("_", " ").toUpperCase(),
        });
        return false;
      }
    }
    return true;
  };
  render() {
    return (
      <>
        <div>Professional Information</div>
        <Button onClick={(e) => this.props.changeStep(0)}>Previous</Button>
        <Button
          onClick={(e) => {
            let all_fine = this.validate();
            if (all_fine) {
              this.props.changeStep(2);
            }
          }}
        >
          Next
        </Button>
      </>
    );
  }
  componentWillUnmount() {}
}

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
    };
  }
  componentDidMount() {}
  componentDidUpdate() {}

  validate = () => {
    let fields = this.state.fields;
    for (let key in fields) {
      if (fields[key] === "") {
        this.setState({
          error:
            "Please enter " + fields[key].replaceAll("_", " ").toUpperCase(),
        });
        return false;
      }
    }
    return true;
  };

  render() {
    return (
      <>
        <div>Academic Information</div>
        <Button onClick={(e) => this.props.changeStep(1)}>Previous</Button>
        <Button
          onClick={(e) => {
            let all_fine = this.validate();
            if (all_fine) {
              this.props.changeStep(-1);
            }
          }}
        >
          Submit
        </Button>
      </>
    );
  }
  componentWillUnmount() {}
}
