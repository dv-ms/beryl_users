import React, { Component } from "react";
import { Row, Button } from "react-bootstrap";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_page_index: 0,
    };
  }
  componentDidMount() {}
  componentDidUpdate() {}

  setPage = (index) => {
    this.setState({
      current_page_index: index,
    });
    this.props.changePage(index);
  };
  render() {
    console.log("Sidebar rendered");
    return (
      <div id={"sidebar"}>
        {this.props.pages.map((page, index) => (
          <Row className="sidebar_row" key={index}>
            <div style={{ margin: "0 auto", padding: "15px" }}>
              <Button
                onClick={(e) => this.setPage(index)}
                variant={
                  this.state.current_page_index === index
                    ? "success"
                    : "primary"
                }
              >
                {page.name}
              </Button>
            </div>
          </Row>
        ))}
      </div>
    );
  }
  componentWillUnmount() {}
}
