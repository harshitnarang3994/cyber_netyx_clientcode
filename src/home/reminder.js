import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BASE_API_ROUTE } from "../utils/constant";
import DateTimePicker from "react-datetime-picker";

export default class Reminder extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      reminders: [],
      reminderDate: new Date(),
      showNotification: false
    };
  }

  componentDidMount() {
    this.getReminders();
  }
  getReminders = async () => {
    const result = await fetch(`${BASE_API_ROUTE}/getReminder`);
    const resultJson = await result.json();
    console.log(resultJson);
    this.setState({ reminders: resultJson });
  };
  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };
  onChange = val => {
    this.setState(val);
  };
  showNotification = () => {
    this.setState({ showNotification: true });
  };
  hideNotification = () => {
    this.setState({ showNotification: false });
  };
  addTask = async () => {
    const data = {
      remindername: this.state.reminderName,
      reminderTime: this.state.reminderDate
    };

    const result = await fetch(`${BASE_API_ROUTE}/createReminder`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    const resultJson = await result.json();
    this.getReminders();
    this.handleClose();
  };
  completeTask = async id => {
    const result = await fetch(`${BASE_API_ROUTE}/updateTask/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: true }),
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    const resultJson = await result.json();
    this.getTask();
  };
  renderAddReminderModal = () => {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Reminder name</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Task title"
                onChange={e => this.onChange({ reminderName: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Date Time</Form.Label>

              <DateTimePicker
                onChange={e => this.onChange({ reminderDate: e })}
                value={this.state.reminderDate}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.addTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  renderReminders = () => {
    return (
      this.state.reminders &&
      this.state.reminders.map((task, id) => {
        return (
          <Card className="mt-3">
            <Card.Header as="h5"> {task.remindername}</Card.Header>
            <Card.Body>
              <Card.Text>{task.reminderTime} </Card.Text>
            </Card.Body>
          </Card>
        );
      })
    );
  };
  renderNotificationModal = () => {
    const nitication =
      this.state.reminders &&
      this.state.reminders.filter(reminder => {
        const reminderDate = new Date(reminder.reminderTime);
        const todayDate = new Date();

        return reminderDate.getDate() === todayDate.getDate();
      });
    return (
      <Modal show={this.state.showNotification} onHide={this.hideNotification}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {nitication && nitication.length > 0
            ? nitication.map((reminder, id) => {
                return <Card.Text>{reminder.remindername}</Card.Text>;
              })
            : "No reminder"}
        </Modal.Body>
      </Modal>
    );
  };
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Button variant="primary" onClick={this.handleShow}>
              Add Reminder
            </Button>
          </Col>
          <Col>
            <Button variant="danger" onClick={this.showNotification}>
              {" "}
              Notification
            </Button>
          </Col>
        </Row>
        <Container>{this.renderReminders()}</Container>
        {this.renderAddReminderModal()}
        {this.renderNotificationModal()}
      </Container>
    );
  }
}
