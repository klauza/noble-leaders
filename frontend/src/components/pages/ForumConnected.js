import React, { useEffect, Fragment, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { setForumPage } from '../../actions/miscActions';
import { createTopic } from '../../actions/forumActions';
import { setAlert } from '../../actions/alertActions';
import ForumTopic from './ForumTopic';

const ForumConnected = ({user, setForumPage, misc: {forumPage}, topics, createTopic, setAlert}) => {

  const subjectInput = useRef();
  const textareaInput = useRef();
  const descriptionInput = useRef();
  // const [articles, setArticles] = useState(null);
  const [forumTab, setForumTab] = useState(forumPage);
  const [icon, setIcon] = useState("fa fa-star");

  useEffect(()=>{
   

  }, [topics])
  
  const buttons = [
    {
      name: "General",
      icon: "fa fa-bullhorn"
    },
    {
      name: "Games",
      icon: "fa fa-gamepad"
    },
    {
      name: "Other",
      icon: "fa fa-chain-broken"
    },
    {
      name: "Special",
      icon: "fa fa-chain-broken"
    }
  ]

  const changeTopic = (i) => {
    if(forumTab !== i){ setForumTab(i); setForumPage(i); }
  }

  const createTopicModal = () => {
    document.querySelector('.forum__topic-creator').style.display = "block";
    document.querySelector('.forum__topic-creator').classList.add('animated');
  }
  const closeModalCreator = () => {
    document.querySelector('.forum__topic-creator').style.display = "none";
  }

  const submitNewTopic = (e) => {
    e.preventDefault();
    let genre = buttons[forumTab].name;
    let subj = subjectInput.current.value;
    let textArea = textareaInput.current.value;
    let description = descriptionInput.current.value;
    

    // console.log("genre: ",genre, "icon: ", icon, "subject: ", subj, "text: ", textArea);
    // console.log('form to create new topic submitted');
    createTopic(
      {
        addedBy: user.name,
        slugAddedBy: user.nameSlug,
        genre: genre,
        link: subj.toLowerCase().replace(/\s+/g, "-"),
        subject: subj.trim(),
        description: description.trim(),
        icon: icon,
        content: textArea
      }
    );
    setAlert('New topic created', 'positive');
    closeModalCreator(); // close modal
    
  }
  if(topics){
  return (
    <Fragment>

      <div className="forum__topic-creator">
        <div className="forum__topic-creator-container">
          <button className="forum__topic-creator-container-exit" onClick={closeModalCreator}><i className="fa fa-times"></i></button>
          <form onSubmit={(e)=>submitNewTopic(e)}>

            <div>
              Topic genre: <label htmlFor={buttons[forumTab].name}>{buttons[forumTab].name}<input name="genre" id={buttons[forumTab].name} checked disabled hidden type="checkbox"/></label>
            </div>

            <input ref={subjectInput} placeholder="Title" autoComplete="off" required type="text"/> {/* Subject */}
            
            <div className="choose-icon">
              <p>Choose an icon</p>
              <label htmlFor="icon">
                <input onClick={()=> setIcon("fa fa-star")} defaultChecked type="radio" name="icon" id="icon-1" /> <i className="fa fa-star"></i>
                <input onClick={()=> setIcon("fa fa-headphones")} type="radio" name="icon" id="icon-2" /> <i className="fa fa-headphones"></i>
                <input onClick={()=> setIcon("fa fa-comments-o")} type="radio" name="icon" id="icon-3" /> <i className="fa fa-comments-o"></i>
              </label>
            </div>

            <input ref={descriptionInput} placeholder="Description" required autoComplete="off" type="text" />
            <textarea ref={textareaInput} cols="65" rows="10" required></textarea> {/* content */}
            <input type="submit" />
          </form>
        </div>
      </div>

      <div className="forum forum-container">


        <strong>Welcome to forum <i className="fa fa-comment"></i>, {user.name}</strong>

        <div className="forum__main">

          <div className="forum__main-topics">
            {buttons.map((btn, i) => {
              return <button className={`${i === forumTab && 'active'}`} key={i} onClick={()=>changeTopic(i)}>{btn.name} <i className={btn.icon}></i></button>
            })}
          </div>

          {forumTab !== 3 && <button className="forum__main-new_topic" onClick={createTopicModal}>Add new topic <i className="fa fa-plus"></i></button>}

          <ForumTopic buttons={buttons} forumTab={forumTab} topics={topics} />

          
          
        </div>
      </div>
    </Fragment>
  )
  }else{
    return(
      <div>loading topics</div>
    )
  }
}
const mapStateToProps = (state) => ({
  misc: state.misc
})
export default connect(mapStateToProps, {setForumPage, createTopic, setAlert})(ForumConnected)
