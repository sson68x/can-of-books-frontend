import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  
  getBooks = async () => {
    try {
      let booksUrl = `${SERVER}/books`;
      // let booksUrl = `http://localhost:3001`;
      let booksResults = await axios.get(booksUrl);
      console.log(booksResults.data);
      this.setState({
        books: booksResults.data
      })
    } catch (error) {
      console.log('Unable to get books');
    }
  }

  componentDidMount() {
    this.getBooks();
  }


  render() {

    /* TODO: render all the books in a Carousel */

    return (

      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

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
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })
          )
            : (
              <h3>No Books Found</h3>
            )}
        </Carousel>
      </>
    )
  }
}

export default BestBooks;
