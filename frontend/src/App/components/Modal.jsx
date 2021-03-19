// frontend/src/components/Modal.js

import React, { Component } from "react"
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap"

export default class CustomModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // This is where the modal component inherits the activeItem state from App.jsx
      activeItem: this.props.activeItem,
    }
  }


  // Function to handle change based on event 
  handleChange = (e) => {
    let { name, value } = e.target
    // if the event is a checkbox, then let value equal checked
    if (e.target.type === "checkbox") {
      value = e.target.checked
    }

    /* 
    activeItem is inheriting the activeItem state from our local state,
    in which our local state is inherited from the App.jsx component 
     */
    
    const activeItem = { ...this.state.activeItem, [name]: value }
    
    

    /*
    This is done with this syntax because activeItem is passed with our spread operator 
    which changes a singular attribute of an object within a state
     */ 
    this.setState({ activeItem })
  }


  render() {

    // toggle is the this.toggle function from App.jsx 
    // onSave prop is the.handleSubmit function from App.jsx 
    const { toggle, onSave } = this.props

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Todo Item </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Enter Todo Title"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text" 
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter Todo description"
              />
            </FormGroup>
            <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}
