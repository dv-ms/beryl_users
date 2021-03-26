import React, { Component } from "react";

import Papa from "papaparse";
import { Alert, Table } from "react-bootstrap";
export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      data: null,
      errors: [],
    };
  }
  componentDidMount() {}
  componentDidUpdate() {}

  HandleUpload = (file) => {
    if (file !== null && file !== undefined) {
      // library to parse CSV to JSON
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: this.renderData,
      });
    }
  };

  renderData = (result) => {
    this.setState({ data: result.data, errors: result.errors });
    if (result.data[0] !== null && result.data[0] !== undefined) {
      this.setState({
        fields: Object.keys(result.data[0]),
      });
    }
  };

  render() {
    return (
      <div>
        {this.state.errors.length === 0
          ? null
          : this.state.errors.map((error, index) => (
              <Alert variant="danger" key={index}>
                {error.code + ": " + error.message}
              </Alert>
            ))}
        <input
          type="file"
          accept=".csv"
          onChange={(e) => this.HandleUpload(e.target.files[0])}
        />
        {this.state.data ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                {this.state.fields.map((field, index) => (
                  <th key={index}>{field}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((record, index) => (
                <tr key={index}>
                  {[...Array(Object.keys(record).length)].map((e, i) => (
                    <td>{record[Object.keys(record)[i]]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        ) : null}
      </div>
    );
  }
  componentWillUnmount() {}
}
