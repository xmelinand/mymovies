import React, {useState, useEffect} from 'react';
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import { 
  Container,Row, Button, 
  UncontrolledPopover, PopoverHeader,
  ListGroup, Nav, Navbar, NavItem,
  NavLink, NavbarBrand,
  NavbarToggler, Collapse,
  PopoverBody, ListGroupItem, } from "reactstrap";
import { Movie } from './components/movie';


function App() {

  // const [moviesCount, setMoviesCount] = useState(0);
  const [wishList, setWishList] = useState([]);
  const [apiMovieList, setApiMovieList] = useState([]);

// REQUEST BACKEND => API
useEffect(()=>{
  async function loadData(){
    var rawResponse = await fetch('/new_movies');
    var response = await rawResponse.json();
    console.log('ssokoi',response) 
    setApiMovieList(response)
  }
  loadData();

  async function loadWishList(){
    var rawResponse = await fetch('/wishlist_movie');
    var response = await rawResponse.json();
    console.log('je voui ?',response) 
    setWishList(response)
  }
  loadWishList();

  console.log('yolo');
}, [])

// ADD MOVIES (counter & add to wishlist)
var clickAddMovie = (movieName, moviePic) => {
  fetch('/wishlist_movie', {
    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `title=${movieName}&img=${moviePic}`,
    }
  )
  setWishList([...wishList, {title : movieName, img :moviePic}]);
  // setMoviesCount(moviesCount + 1);
  console.log('add', wishList);

    
  }

// DELETE MOVIES
var clickDeleteMovie = (movieName)=>{
  // setMoviesCount(moviesCount - 1);
  setWishList(wishList.filter((e)=>(e.title!=movieName)));

  fetch(`/wishlist_movie/${movieName}`, {
    method: 'DELETE',

    }
  )
};

// WISHLIST ADD ITEM 
var addWishItem;
if (wishList.length>0){
  addWishItem = wishList.map(function(wish, i){
          return (
      <ListGroupItem className='d-flex justify-content-between align-items-center p-0'>
          <img className='m-2' width="25%" height='100%' src={wish.img}/>
          <span className='text-center' style={{fontWeight: 'bold'}}>{wish.title}</span>
          <FontAwesomeIcon className='ms-2 me-2' style={{color:'f1c40f', cursor : 'pointer'}} onClick={()=> clickDeleteMovie(wish.title)} icon={faCircleXmark} />
        </ListGroupItem>
        )
      }
    )
  } else {
      addWishItem = <ListGroupItem style={{color: 'red', textAlign: 'center', fontWeight:'bold'}}>
        Wishlist is empty motherfucker ! 
        </ListGroupItem>
    };
var myWishList = apiMovieList.map(function(movie, i) {
  var liked = false;
  if (wishList.find(obj => obj.title === movie.title)){
    liked =true;
  }
    return <Movie 
    clickDeleteMovieParent={clickDeleteMovie}
    clickAddMovieParent={clickAddMovie} 
    key={i} title={movie.title} 
    synopsis={movie.synopsis} 
    liked={liked} 
    img={movie.img} 
    votes={movie.votes} 
    note={movie.note} 
    vues={movie.vues}></Movie>;
});


    var movieCount = wishList.length;
  return (
    <div style={{backgroundColor:'black'}}>
    <Container className='body'>
      {/* HEADER - NAVBAR */}
      
      <Row >
      <Navbar
      className='mt-2'
    color="dark"
    light
    expand="xs"

  >
    <NavbarBrand href="/">
      <img src="logo.png"/>
    </NavbarBrand>
    <NavbarToggler onClick={function noRefCheck(){}} />
    <Collapse navbar>
      <Nav
        className="me-auto"
        navbar
        
      >
        <NavItem>
          <NavLink href="#" className="text-light">
            Last releases
          </NavLink>
        </NavItem>
        <NavItem>
        <Button
    id="PopoverClick"
    type="button"
  >
    <badge>{movieCount}</badge> Film(s)
  </Button>
  <UncontrolledPopover
    placement="bottom"
    target="PopoverClick"
    trigger="click"
  >
    <PopoverHeader>
      Wishlist
    </PopoverHeader>
    <PopoverBody>
      <ListGroup>
        {addWishItem}
        </ListGroup>
        
        </PopoverBody>
  </UncontrolledPopover>

  </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
    </Row>


  {/* CARD GROUP */}
  <Row>
    {myWishList}
  </Row>
  </Container>
  </div>
  );
}

export default App;
