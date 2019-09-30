import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadUser} from '../../actions/loginActions';


const About = ({login: {isAuthenticated, user}, loadUser}) => {
  useEffect(() => {
    if(localStorage.token && !user) {
      loadUser();
    }
    //eslint-disable-next-line
  }, []);
  
  return (
    <div className="about">
      <div className="about__main">

        <div className="about__main--project">
          <h1>About</h1>
          <h2>Tech</h2>
          <p><strong>NOBLE-<span style={{color: "red"}}>LEADERS</span></strong> is a minimalistic <strong>fullstack</strong> project with subtle design and mechanics. It's also mobile friendly.</p>
          <p>How to start? You can create an account and that's it! Without making one, you won't be able to see the full potential of the page.</p>
          <p>If you for some reason don't want to create an account, you can use a test one: Login: testacc Pwd: testacc</p>
          <p>There are plenty of games available to play which give score points letting you climb on top of the leaderboard.</p>
        </div>

        <div className="about__main--expression">
          <h2>Content?</h2>
          <p>This is an awesome lightweight, pixel perfect project which you have to explore. You should know that I've put a lot of effort and time into hand-craft every corner of this page. Nevertheless in the same time I've had tons of fun - mostly with solving programming riddles and learning new stuff. At the end, I'm happy to show you my coding journey.</p>
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
          <p>version 1.1</p> 
          <p>Copyright: Michal Klauza</p>
          <p>Image attributions - links on github</p>
        </div>

      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  login: state.login
})
export default connect(mapStateToProps, {loadUser})(About)
