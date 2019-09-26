import React, {useEffect, useState} from 'react';
import forumData from './ForumContentThreadData'; // data
import Loader from '../layout/Loader';

const ForumThread = (props) => {
  const [article, setArticle] = useState(null);
  const articleName = props.match.params.thread;

  useEffect(()=>{ 
    // fetch certain article
    setArticle( forumData.filter((article, id) => article.title === articleName)[0] )
    
  }, [])

  console.log(article);
  // console.log(articleName);

  if(article !== null){
    return (
      <div className="forum-content-thread">
        {article.content}
      </div>
    )
    
  } else {
    return(
      <Loader />
    )
  }

}

export default ForumThread
