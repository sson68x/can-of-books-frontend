import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Carousel, Button } from 'react-bootstrap';
import BookFormModal from './BookFormModal';
import UpdateFormModal from './UpdateFormModal';
import { withAuth0 } from '@auth0/auth0-react';


let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showAddModal: false,
      bookToUpdate: null
    }
  }

  getBooks = async () => {
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        console.log(jwt);
        const config = {
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/books',
          headers: { Authorization: `Bearer ${jwt}` }
        }
        const booksResults = await axios(config);
        this.setState({
          books: booksResults.data
        })
      }
      // let booksUrl = `${SERVER}/books`;
      // let booksResults = await axios.get(booksUrl);
      // console.log(booksResults.data);
      // this.setState({
      //   books: booksResults.data
      // })

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
      console.log(`We have an error:`, error.response.data);
    }
  }

  updateBook = async (bookToUpdate) => {
    try {
      let booksUrl = `${SERVER}/books/${bookToUpdate._id}`;
      let updatedBook = await axios.put(booksUrl, bookToUpdate);
      let updatedBookArr = this.state.books.map(existingBook => {
        return existingBook._id === bookToUpdate._id
          ? updatedBook.data
          : existingBook;
      });
      this.setState({
        books: updatedBookArr
      });
    } catch (error) {
      console.log('We have an error: ', error.response.data);
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
    this.hideModal();
  }

  componentDidMount() {
    this.getBooks();
  }

  hideModal = () => {
    this.setState({
      showAddModal: false,
      showUpdateModal: false
    })
  }

  showAddModal = () => {
    this.setState({
      showAddModal: true
    })
  }

  showUpdateModal = (book) => {
    this.setState({
      showUpdateModal: true,
      bookToUpdate: book
    })
  }

  render() {

    console.log(this.state.bookToUpdate);

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
                      src="./img/canofbooks.jpg"
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
                          margin: '5px'
                        }}
                        onClick={() => this.deleteBook(book._id)}
                        variant="secondary">Delete Book
                      </Button>

                      <Button
                        style={{
                          margin: '5px'
                        }}
                        onClick={() => this.showUpdateModal(book)}
                      > Update Book
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

          <div
            className="text-center">
            <Button
              style={{ margin: '10px' }}
              onClick={this.showAddModal}
              variant="primary">
              Add Book
            </Button>
          </div>

          <BookFormModal
            showAddModal={this.state.showAddModal}
            hideModal={this.hideModal}
            handleBookSubmit={this.handleBookSubmit}
          />

          {this.state.bookToUpdate &&
            <UpdateFormModal
              showUpdateModal={this.state.showUpdateModal}
              hideModal={this.hideModal}
              handleUpdateSubmit={this.updateBook}
              bookToUpdate={this.state.bookToUpdate}
            />}
        </main>
      </>
    )
  }
}

export default withAuth0(BestBooks);