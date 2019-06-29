import React from "react";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Task from "./task";
import Reminder from "./reminder";

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <Container>
            <Row>
              <Col>
                <Task />
              </Col>
              <Col>
                <Reminder />
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
