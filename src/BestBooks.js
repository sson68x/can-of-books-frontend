import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Carousel, Button } from 'react-bootstrap';
import BookFormModal from './BookFormModal';

let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false
    }
  }

  getBooks = async () => {
    try {
      let booksUrl = `${SERVER}/books`;
      let booksResults = await axios.get(booksUrl);
      console.log(booksResults.data);
      this.setState({
        books: booksResults.data
      })
    } catch (error) {
      console.log('Unable to get books');
    }
  }

  postBook = async (book) => {
    try {
      let booksUrl = `${SERVER}/books`;
      let addedBook = await axios.post(booksUrl, book);
      console.log(addedBook.data);
      this.setState({
        books: [...this.state.books, addedBook.data]
      });
    } catch (error) {
      console.log('We have an error: ', error.response.data);
    }
  }

  deleteBook = async (id) => {
    try {
      let booksUrl = `${SERVER}/books/${id}`;
      await axios.delete(booksUrl);
      let updatedBooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: updatedBooks
      })
    } catch (error) {
      console.log(`We have an error:`)
    }
  }

  handleBookSubmit = (e) => {
    e.preventDefault();
    let book = {
      title: e.target.title.value,
      description: e.target.description.value,
      author: e.target.author.value,
      status: e.target.status.value
    }
    this.postBook(book);
  }

  componentDidMount() {
    this.getBooks();
  }

  hideModal = () => {
    this.setState({
      showAddModal: false
    })
  }

  showAddModal = () => {
    this.setState({
      showAddModal: true,
    })
  }

  render() {

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <main>
          <Carousel>
            {this.state.books.length > 0 ? (
              this.state.books.map((book) => {
                return (
                  <Carousel.Item key={book._id}>
                    <img
                      className="d-block w-100"
                      src="https://place-hold.it/800x400/000"
                      alt="Best Books"
                    />
                    <Carousel.Caption>
                      <h3 style={{
                        backgroundColor: 'lightblue',
                        borderRadius: '5px',
                        width: 'max-content',
                        margin: 'auto'
                      }}>
                        {book.title} by {book.author}
                      </h3>
                      <Button
                      style={{
                        margin: '10px'
                      }}
                        onClick={this.showAddModal}
                        type="submit" variant="primary">Add Book
                      </Button>
                      <Button onClick={() => this.deleteBook(book._id)}
                        type="submit" variant="secondary">Delete Book
                      </Button>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })
            )
              : (
                <h3>No Books Found</h3>
              )}
          </Carousel>

          <BookFormModal
            showAddModal={this.state.showAddModal}
            // showDeleteModal={this.state.showDeleteModal}
            hideModal={this.hideModal}
            handleBookSubmit={this.handleBookSubmit}
          />
        </main>
      </>
    )
  }
}

export default BestBooks;