import { Button, Alert } from "react-bootstrap";
import React, { Component } from "react";
const steps_json = require("../../steps.json");
export default class MultiStepForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        first_name: "",
        last_name: "",
        gender: "",
        address: "",
        company: "",
        experience: "",
        last_salary: "",
        degree: "",
        college: "",
        future_plan: "",
      },
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
      // submit form
      // this.submitAPI();

      // preparing and logging the fields
      let s = "";
      for (const key in this.state.fields) {
        s +=
          key.replaceAll("_", " ").toUpperCase() +
          ": " +
          this.state.fields[key] +
          "\n";
      }
      console.log(s);
      alert("Please check log");
    } else {
      // change step
      this.setState({
        progress_index: step_index,
      });
    }
  };

  setValueParent = (key, value) => {
    // setting form / field values
    this.setState({
      fields: {
        ...this.state.fields,
        [key]: value,
      },
    });
  };

  renderForm = () => {
    switch (this.state.progress_index) {
      case 0:
        return (
          <Step1
            // to change step on previous / next button click
            changeStep={this.changeStep}
            // to set field values
            setValueParent={this.setValueParent}
            // to pass field value to child
            fields={this.state.fields}
          />
        );

      case 1:
        return (
          <Step2
            changeStep={this.changeStep}
            setValueParent={this.setValueParent}
            fields={this.state.fields}
          />
        );

      case 2:
        return (
          <Step3
            changeStep={this.changeStep}
            setValueParent={this.setValueParent}
            fields={this.state.fields}
          />
        );
    }
  };
  render() {
    return (
      <div>
        <h2>Multi Step Form</h2>
        <br />
        <br />

        {/* Steps */}
        {this.state.steps.map((step, index) => (
          <span
            style={{
              padding: "20px",
              backgroundColor:
                this.state.progress_index === index ? "yellow" : "white",
            }}
          >
            {step.name}{" "}
          </span>
        ))}

        <br />
        <br />

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
      error: null,
      fields: {
        first_name: "",
        last_name: "",
        gender: "",
        address: "",
      },
    };
  }
  componentDidMount() {}
  componentDidUpdate() {}

  validate = () => {
    let fields = this.props.fields;
    for (let key in fields) {
      if (fields[key] === "" && this.state.fields[key] !== undefined) {
        this.setState({
          error: "Please enter " + key.replaceAll("_", " ").toUpperCase(),
        });
        return false;
      }
    }
    this.setState({
      error: null,
    });
    return true;
  };

  setValue = (key, value) => {
    this.props.setValueParent(key, value);
  };

  render() {
    return (
      <>
        <div>Personal Information</div>
        <br />

        {/* Error alert */}
        {this.state.error ? (
          <Alert variant="danger">{this.state.error}</Alert>
        ) : null}

        {/* Form */}
        <label>
          First Name:
          <input
            type="text"
            value={this.props.fields.first_name}
            onChange={(e) => {
              this.setValue("first_name", e.target.value);
            }}
          />
        </label>

        <br />
        <br />

        <label>
          Last Name:
          <input
            type="text"
            value={this.props.fields.last_name}
            onChange={(e) => {
              this.setValue("last_name", e.target.value);
            }}
          />
        </label>

        <br />
        <br />

        <label>
          Address:
          <input
            type="text"
            value={this.props.fields.address}
            onChange={(e) => {
              this.setValue("address", e.target.value);
            }}
          />
        </label>

        <br />
        <br />

        <label>
          Gender:
          <select onChange={(e) => this.setValue("gender", e.target.value)}>
            <option
              value=""
              selected={this.props.fields.gender === ""}
              disabled
            >
              Please select
            </option>
            <option value="male" selected={this.props.fields.gender === "male"}>
              Male
            </option>
            <option
              value="female"
              selected={this.props.fields.gender === "female"}
            >
              Female
            </option>
          </select>
        </label>

        <br />
        <br />

        <Button
          onClick={(e) => {
            // validation
            let all_fine = this.validate();
            if (all_fine) {
              // take to next step
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
      error: null,
      fields: {
        company: "",
        experience: "",
        last_salary: "",
      },
    };
  }
  componentDidMount() {}
  componentDidUpdate() {}

  validate = () => {
    let fields = this.props.fields;
    for (let key in fields) {
      if (fields[key] === "" && this.state.fields[key] !== undefined) {
        this.setState({
          error: "Please enter " + key.replaceAll("_", " ").toUpperCase(),
        });
        return false;
      }
    }
    this.setState({
      error: null,
    });
    return true;
  };

  setValue = (key, value) => {
    this.props.setValueParent(key, value);
  };

  render() {
    return (
      <>
        <div>Professional Information</div>
        <br />

        {/* Error alert */}
        {this.state.error ? (
          <Alert variant="danger">{this.state.error}</Alert>
        ) : null}

        {/* Form */}

        <label>
          Company:
          <input
            type="text"
            value={this.props.fields.company}
            onChange={(e) => {
              this.setValue("company", e.target.value);
            }}
          />
        </label>

        <br />
        <br />

        <label>
          Experience:
          <input
            type="number"
            value={this.props.fields.experience}
            onChange={(e) => {
              this.setValue("experience", e.target.value);
            }}
          />
        </label>

        <br />
        <br />

        <label>
          Last Salary:
          <input
            type="number"
            value={this.props.fields.last_salary}
            onChange={(e) => {
              this.setValue("last_salary", e.target.value);
            }}
          />
        </label>

        <br />
        <br />

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
      error: null,
      fields: {
        degree: "",
        college: "",
        future_plan: "",
      },
    };
  }
  componentDidMount() {}
  componentDidUpdate() {}

  validate = () => {
    let fields = this.props.fields;
    for (let key in fields) {
      if (fields[key] === "" && this.state.fields[key] !== undefined) {
        this.setState({
          error: "Please enter " + key.replaceAll("_", " ").toUpperCase(),
        });
        return false;
      }
    }
    this.setState({
      error: null,
    });
    return true;
  };

  setValue = (key, value) => {
    this.props.setValueParent(key, value);
  };

  render() {
    return (
      <>
        <div>Academic Information</div>
        <br />

        {/* Error alert */}
        {this.state.error ? (
          <Alert variant="danger">{this.state.error}</Alert>
        ) : null}

        {/* Form */}

        <label>
          Degree:
          <input
            type="text"
            value={this.props.fields.degree}
            onChange={(e) => {
              this.setValue("degree", e.target.value);
            }}
          />
        </label>

        <br />
        <br />

        <label>
          College:
          <input
            type="text"
            value={this.props.fields.college}
            onChange={(e) => {
              this.setValue("college", e.target.value);
            }}
          />
        </label>

        <br />
        <br />

        <label>
          Future Plan:
          <input
            type="text"
            value={this.props.fields.future_plan}
            onChange={(e) => {
              this.setValue("future_plan", e.target.value);
            }}
          />
        </label>

        <br />
        <br />

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
