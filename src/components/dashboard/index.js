import React, { Component } from "react";
import Body from "../body";
import Header from "../header";
import Sidebar from "../sidebar";

import { Row, Col } from "react-bootstrap";

const pages = require("../../pages.json");

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_page_index: 0,
    };

    this.changePage = this.changePage.bind(this);
  }

  changePage(current_page_index) {
    this.setState({
      current_page_index,
    });
  }

  componentDidMount() {}

  render() {
    console.log("Dashboard rendered");
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Header />
          </Col>
        </Row>

        <Row>
          <Col xs={2}>
            <Sidebar changePage={this.changePage} pages={pages.pages_list} />
          </Col>
          <Col xs={10}>
            <Body
              page={this.state.current_page_index}
              pages={pages.pages_list}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
