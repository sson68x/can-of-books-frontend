import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

class BookFormModal extends React.Component {
  render() {
    return (
      <>
        <Modal show={this.props.showAddModal} onHide={this.props.hideModal}>
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Add Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.props.handleBookSubmit}>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group controlId="author">
                  <Form.Label>Author</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group controlId="status">
                  <Form.Label>Status</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Modal.Footer>
                  <Button onClick={this.props.hideModal} type="submit" variant="primary">Add Book</Button>
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
export default BookFormModal;