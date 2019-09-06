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
          <p><strong>NOBLE-LEADERS</strong> is a minimalistic <strong>fullstack</strong> project with subtle design and mechanics. It's also mobile friendly.</p>
          <p>How to start? You can create an account and that's it! Without making one, you won't be able to see the full potential of the page.</p>
          <p>There are plenty of games available to play which give score points letting you climb on top of the leaderboard.</p>
        </div>

        <div className="about__main--expression">
          <p>This is an awesome project you must explore. You should know that I've put a lot of effort and time into hand-craft every corner of this page. Nevertheless in the same time I've had tons of fun - mostly with solving programming riddles and learning new stuff. At the end, I'm happy to show you my coding journey.</p>
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
          <p>Images attributions - links on github</p>
        </div>

      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  login: state.login
})
export default connect(mapStateToProps, {loadUser})(About)
