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
        <h1>About</h1>
        <div className="about__main--project">
          <h2><i className="fa fa-question-circle"></i> General</h2>
          <p><strong>NOBLE-<span style={{color: "red"}}>LEADERS</span></strong> is a minimalistic, mobile friendly project with subtle design and features: auth system, forum, user dashboard, ranking system.</p>
          <p>This is a lightweight, pixel perfect project which you have to explore. You should know that I've put a lot of effort and time into hand-craft every corner of this page. Nevertheless in the same time I've had tons of fun - mostly with solving programming riddles and learning new stuff. At the end, I'm happy to show you my coding journey.</p>
        </div>

        <div className="about__main--content">
          <h2><i className="fa fa-laptop"></i> Content</h2>
          <p>How to start? You can create an account and that's it! Without making one, you won't be able to see the full potential of the page.</p>
          <p>There are plenty of games available to play which give score points letting you climb on top of the leaderboard.</p>
          <p>If for some reason you don't want to create an account, you can use a test one: <strong><u>login:</u> testacc@test.acc; <u>pwd:</u> testacc</strong></p>
        </div>
      
        <div className="about__main--author">
          <h2><i className="fa fa-coffee"></i> Author</h2>
          <p>Thank you for visiting my project.</p>
          <p>I wish you a great day!</p>
          <p style={{"fontSize": "0.8rem", "color": "grey"}}> <i className="fa fa-thumbs-up"></i> Michal Klauza </p>
          <div><a href="https://github.com/klauza/noble-leaders"> <i className="fa fa-github-square"></i> </a> Github </div>
          <div><a href="https://www.linkedin.com/in/michal-klauza-b22318186/"> <i className="fa fa-linkedin-square"></i> </a> LinkedIn </div>
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
