import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faVideo, faStar} from '@fortawesome/free-solid-svg-icons';
import { Col,Badge, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText,} from "reactstrap";
import React, {useState} from 'react';


function Movie(props){  
  
// INIT MOVIE STATES
const [watchMovie, setWatchMovie] = useState(false);
const [countWatchMovie, setCountWatchMovie] = useState(0);
const [myRatingMovie, setMyRatingMovie] = useState(0);

  //GLOBAL RATE
    var globalRating;
    var heartColor;
    var cameraColor;

// ------------------------------------------------------------------------------------------------

// CLICK_HEART
    var clickHeart = () => {
      if (props.liked == false){
        props.clickAddMovieParent(props.title, props.img)
      };
      if (props.liked == true){ 
        props.clickDeleteMovieParent(props.title);
      }
    };
// CHANGE HEARTCOLOR
    if(props.liked == true){heartColor={ cursor : 'pointer', color: 'e52929'};}
    else { heartColor = {cursor  : 'pointer'}};
// CLICK_CAMERA
var clickCamera = () => {
  setWatchMovie(true);
  setCountWatchMovie(countWatchMovie+1);
}
// CHANGE CAMERACOLOR
if(watchMovie == true){cameraColor={cursor  : 'pointer',color: 'f1c40f'};
} else {cameraColor={cursor  : 'pointer'}};

// ------------------------------------------------------------------------------------------------
//CLICK +1-1
var clickPlusMinus = (rating) => {
  if(rating < 0){
    rating = 0
  };  
  if (rating > 10){ 
    rating = 10;} 
    setMyRatingMovie(rating);
}

// DYNAMIC STARS FOR PERSONNAL RATING 
var tabRating =[]
for (var i= 0; i<10; i++){
  var color={};
  if(i<myRatingMovie){
      color = {color:'f1c40f', cursor  : 'pointer'}
    } else {color = {cursor : 'pointer'}}
    let count = i+1
    tabRating.push(<FontAwesomeIcon onClick={()=> clickPlusMinus(count)} style={color} icon={faStar}/>)
};
var isRated = 0
if(myRatingMovie >0){
  isRated +=1
}
var newVotes = props.votes + isRated

// ------------------------------------------------------------------------------------------------

//DYNAMIC STARS FOR GLOBAL RATING 
  //Average rating calculation
    var res = props.note * props.votes;
    res = res + myRatingMovie;
    res = res / (props.votes+1)
    globalRating = Math.round(res);

// GLOBAL RATING STARS
var stars = []
for (var i = 0; i<10; i++){
  if(i<globalRating){

   stars.push(<FontAwesomeIcon style={{color:'f1c40f'}} icon={faStar}/>)
  } else {stars.push(<FontAwesomeIcon style={{color:'black'}} icon={faStar}/>)
  console.log(myRatingMovie)

}};

// ------------------------------------------------------------------------------------------------

// MOVIE RETURN
      return(
        <Col xs="12" lg='6' xl='4'>
  <Card className="mb-3 mt-2">
    <CardImg
      alt="Card image cap"
      src={props.img}
      top
      width="100%"
    />
    <CardBody>
      <CardTitle tag="h5">
        {props.title}
      </CardTitle>
      <CardText>
      <p> {props.synopsis.substring(0, 100)+'...'}</p>
      </CardText>

      <CardText className="mb-2">
      <p>Like <FontAwesomeIcon onClick={() => clickHeart()} style={heartColor} icon={faHeart} /> </p>
      <p>Nombre de vue <FontAwesomeIcon onClick={() => clickCamera()} style={cameraColor} icon={faVideo} /> <Badge>{countWatchMovie}</Badge></p>
      <p>Mon avis {tabRating}
        <span><Badge style={{cursor : 'pointer'}} onClick={()=> clickPlusMinus(myRatingMovie-1)}>-</Badge></span>
        <span><Badge style={{cursor : 'pointer'}} onClick={()=> clickPlusMinus(myRatingMovie+1)}>+</Badge></span>
        </p>
      <p>Moyenne {stars}
      ({newVotes}) </p>  
      </CardText>
    </CardBody>
  </Card>
  </Col>
      );
}

// ------------------------------------------------------------------------------------------------

export {Movie}