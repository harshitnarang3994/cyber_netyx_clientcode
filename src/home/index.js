import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
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
                <Card>
                  <Card.Header>Schedule Task</Card.Header>
                  <Card.Body>
                    <Task />
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Header>Reminder</Card.Header>
                  <Card.Body>
                    <Reminder />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
