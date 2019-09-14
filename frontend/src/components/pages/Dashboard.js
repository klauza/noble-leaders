import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/loginActions';
import { getUserGames } from '../../actions/gameActions';
import {Link} from 'react-router-dom';
import actorQuizCover from '../../media/games/actor-quiz-cover.jpg';
import snakeCover from '../../media/games/snake-cover.jpg';
import revealCardsCover from '../../media/games/reveal-cards-cover.jpg';
import buyGame from '../../media/games/buyGame.jpg';
import LoaderPlaceholder from '../layout/Loader';
// import {images} from '../../media/carrousel/DashCarrouselImages';
import {carrousel1, carrousel2, carrousel3} from '../../media/images';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Dashboard = ({login: {isAuthenticated}, loadUser, getUserGames}) => {

  const images = [carrousel1, carrousel2, carrousel3];

  const [img, setImg] = useState(true);

  useEffect(() => {
    if(localStorage.token) {
      loadUser();
      getUserGames(null);
    }

     

    function loadImageAsync(image1, image2, image3, image4){
      return Promise.all([
      new Promise((resolve, reject) => {
        const img1 = new Image();
        img1.addEventListener('load', event => resolve(img1));
        img1.addEventListener('erorr', reason => reject(new Error('error')));
        img1.src = image1
      }),
      new Promise((resolve, reject) => {
        const img2 = new Image();
        img2.addEventListener('load', event => resolve(img2));
        img2.addEventListener('erorr', reason => reject(new Error('error')));
        img2.src = image2
      }),
      new Promise((resolve, reject) => {
        const img3 = new Image();
        img3.addEventListener('load', event => resolve(img3));
        img3.addEventListener('erorr', reason => reject(new Error('error')));
        img3.src = image3
      }),
      new Promise((resolve, reject) => {
        const img4 = new Image();
        img4.addEventListener('load', event => resolve(img4));
        img4.addEventListener('erorr', reason => reject(new Error('error')));
        img4.src = image4
      })
      
      ])
    }
    loadImageAsync(actorQuizCover, snakeCover, revealCardsCover, buyGame)
      .then(() => setImg(false))
      .catch(reason => console.log(reason));

 


    //eslint-disable-next-line
  }, []);

  
  return (
    <div className="container dashboard">

      <div className="dashboard-carrousel">
        <Carousel style={{height: "30vh"}} showStatus={false} selectedItem={0} showThumbs={false} infiniteLoop={true} interval={3000} autoPlay={true}>
          {images.map((img, i) => {
            return(
            <div key={i}>
              <img src={img} alt="" />
            </div>)
          })}
        </Carousel>
      </div>
      

      
      <div className="grid">
        <div className={`grid-item ${!img && "dashboard-actor-game-cover"}`}> {img ? <LoaderPlaceholder /> : <Link to='/actor-game' className="grid-link"></Link> } </div>
        <div className={`grid-item ${!img && "dashboard-snake-cover"}`}> {img ? <LoaderPlaceholder /> : <Link to='/snake' className="grid-link"></Link> } </div>
        <div className={`grid-item ${!img && "dashboard-reveal-cards-cover"}`}> {img ? <LoaderPlaceholder /> : <Link to='/reveal-cards' className="grid-link"></Link> } </div>
        <div className={`grid-item ${!img && "dashboard-buy-game-cover"}`}> {img ? <LoaderPlaceholder /> : <Link to='/buy-game' className="grid-link"></Link> } </div>

        <div></div>
        <div></div>
        <div></div>
        <div></div>
 
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  login: state.login
})
export default connect(mapStateToProps, {loadUser, getUserGames})(Dashboard)
