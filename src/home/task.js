import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { BASE_API_ROUTE } from "../utils/constant";
export default class Task extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false,
      tasks: []
    };
  }

  componentDidMount() {
    this.getTask();
  }
  getTask = async () => {
    const result = await fetch(`${BASE_API_ROUTE}/getTask`);
    const resultJson = await result.json();
    console.log(resultJson);
    this.setState({ tasks: resultJson });
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
  addTask = async () => {
    const data = {
      taskname: this.state.taskName,
      taskdescription: this.state.taskDescription
    };

    const result = await fetch(`${BASE_API_ROUTE}/createtask`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    const resultJson = await result.json();
    this.getTask();
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
  renderAddTaskModal = () => {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Task name</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Task title"
                onChange={e => this.onChange({ taskName: e.target.value })}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Task Description"
                onChange={e =>
                  this.onChange({ taskDescription: e.target.value })
                }
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
  renderTasks = () => {
    return this.state.tasks.map((task, id) => {
      return (
        <Card style={{ width: "100%" }} className="mt-3">
          <Card.Body
            style={task.status ? { backgroundColor: "lightgreen" } : {}}
          >
            <Card.Title>{task.taskname}</Card.Title>
            <Card.Text>{task.taskdescription}</Card.Text>
            <Button
              variant="link"
              onClick={() => this.completeTask(task._id)}
              disabled={task.status}
            >
              Mark as done
            </Button>
          </Card.Body>
        </Card>
      );
    });
  };
  render() {
    return (
      <Container>
        <Button variant="primary" onClick={this.handleShow}>
          Add Task
        </Button>
        <Container>{this.renderTasks()}</Container>
        {this.renderAddTaskModal()}
      </Container>
    );
  }
}
