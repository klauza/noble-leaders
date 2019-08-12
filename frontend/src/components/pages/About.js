import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/loginActions';


const About = ({login: {isAuthenticated}, loadUser}) => {
  useEffect(() => {
    if(localStorage.token) {
      loadUser();
    }
    //eslint-disable-next-line
  }, []);
  
  return (
    <div className="about">
      <div className="about__main">

        <div className="about__main--project">
          <h1>Hey, amazing stranger, thanks for coming to see my work</h1>
          <p><strong>NOBLE-LEADERS</strong> is a minimalistic <strong>fullstack</strong> project, also mobile friendly, with subtle design and mechanics.</p>
          <p>How to start? You can create an account with safe password hashing - please do so, without it, you won't be able to see a lot.</p>
          <p>There are plenty of games available to play - they give score points letting you climb on top of leaderboard.</p>
        </div>

        <div className="about__main--expression">
          <p>This project is being constantly developed and maintained since idea creation on 31/07/2019. You must know that I've put a lot of effort and time into hand-craft every piece of this page. Nevertheless in the same time I've had tons of fun (drinking million cups of coffee) while solving programming riddles and learning new stuff. At the end, I'm happy to show you my coding journey.</p>
          <p>I'm hoping for constructive criticism from your side.</p>
          <p>Thank you!</p>
          <p>I wish you a great day!</p>
          <p style={{"fontSize": "0.8rem", "color": "grey"}}> <i className="fa fa-thumbs-up"></i> Michal Klauza </p>
        </div>
      
        <div className="about__main--links">
          <div className="git-container">
            <a href="https://github.com/klauza/noble-leaders">
              <i className="fa fa-github-square"></i>
            </a>
          </div>

          <div className="linked-container">
            <a href="https://www.linkedin.com/in/michal-klauza-b22318186/">
              <i className="fa fa-linkedin-square"></i>
            </a>
          </div>
        </div>
     
        <div className="about__main--footer">
          <p>version 1.0</p> 
          <p>Copyright: Michal Klauza</p>
          <p>Image attributions links - see on github</p>
        </div>

      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  login: state.login
})
export default connect(mapStateToProps, {loadUser})(About)
