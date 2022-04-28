import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

class UpdateFormModal extends React.Component {

  handleUpdateSubmit = (e) => {
    e.preventDefault();
    let bookWithUpdate = {
      title: e.target.title.value || this.props.bookToUpdate.title,
      description: e.target.description.value || this.props.bookToUpdate.description,
      author: e.target.author.value || this.props.bookToUpdate.author,
      status: e.target.status.value || this.props.bookToUpdate.status,
      _id: this.props.bookToUpdate._id,
      __v: this.props.bookToUpdate.__v
    }
    console.log(bookWithUpdate);
    this.props.handleUpdateSubmit(bookWithUpdate);
  }


  render() {
    return (
      <>
        <Modal show={this.props.showUpdateModal} onHide={this.props.hideModal}>
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Update Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleUpdateSubmit}>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" defaultValue={this.props.bookToUpdate.title}/>
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" defaultValue={this.props.bookToUpdate.description}/>
                </Form.Group>
                <Form.Group controlId="author">
                  <Form.Label>Author</Form.Label>
                  <Form.Control type="text" defaultValue={this.props.bookToUpdate.author}/>
                </Form.Group>
                <Form.Group controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Control type="text" defaultValue={this.props.bookToUpdate.status}/>
                </Form.Group>
                <Modal.Footer>
                  <Button onClick={this.props.hideModal} type="submit" variant="primary">Update</Button>
                  <Button onClick={this.props.hideModal} variant="secondary">Close</Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal>
      </>
    )
  }
}

export default UpdateFormModal;