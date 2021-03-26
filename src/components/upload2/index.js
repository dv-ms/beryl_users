import React, { Component } from "react";

import axios from "axios";

export default class Upload2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      upload_progress: 0.0,
    };
  }
  componentDidMount() {}
  componentDidUpdate() {}
  HandleFileSelect = (file) => {
    this.setState({
      file,
    });
  };

  HandleUpload = () => {
    if (this.state.file === null || this.state.file === undefined) {
      alert("Please select file");
    } else {
      this.setState(
        {
          upload_progress: 0.0,
        },
        () => this.UploadUsingAPI()
      );
    }
  };

  UploadUsingAPI = () => {
    axios
      .request({
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Credentials": "true",
        },
        url: "https://605dcede9386d200171bb4b7.mockapi.io/image",
        data: {
          file: this.state.file,
        },
        onUploadProgress: (progress) => {
          this.setState({
            upload_progress: (progress.loaded / progress.total) * 100.0,
          });
        },
      })
      .then(
        (data) => {
          this.setState({
            upload_progress: 100.0,
          });
        },
        (error) => {
          alert(error.message);
        }
      );
  };
  render() {
    return (
      <div>
        <span>Please upload large file: </span>
        <input
          type="file"
          onChange={(e) => this.HandleFileSelect(e.target.files[0])}
        />
        <input
          type="submit"
          value="Upload"
          onClick={(e) => this.HandleUpload()}
        ></input>

        <br />

        {this.state.file ? (
          <span>Progress: {this.state.upload_progress} % uploaded</span>
        ) : null}
      </div>
    );
  }
  componentWillUnmount() {}
}
