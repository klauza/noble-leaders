import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
import forumData from './ForumContentThreadData'; // data
import Loader from '../layout/Loader';

const ForumThread = (props) => {
  const [article, setArticle] = useState(null);
  const articleName = props.match.params.thread;

  useEffect(()=>{ 
    setArticle( forumData.filter(article => article.link === articleName)[0] )   // fetch given article

  // eslint-disable-next-line
  }, [])



  if(article !== null){
    return (
      <div className="forum-content-wrapper">

      <button className="general-back-button" onClick={()=>history.goBack()}>Back</button>

        <div className="forum-content-thread">

          <div className="content-article-main">{article.content}</div>

          <div className="content-article-author">Added by <Link to={`/user/${article.slugAuthor}`}>{article.author}</Link></div>
        </div>

        <div className="forum-content-comment">
          <span>Add a comment</span>
          <textarea rows="5" placeholder="Write something..."> 
            
          </textarea>
          <button className="comment-submit">Send</button>
        </div>

      </div>
    )

  } else {
    return(
      <Loader />
    )
  }

}

export default ForumThread
