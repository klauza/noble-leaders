import React, {useEffect} from 'react';
import {connect} from 'react-redux';


const Alert = (alert) => {
  
  useEffect(() => {

  }, [alert])
  return (
    alert.alert.length > 0 && alert.alert.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <span className="alert-icon">{(alert.type==="danger" || alert.type==="warning") ? (<i className="fa fa-times"></i>) : (<i className="fa fa-check"></i>)}</span>
        <span className="alert-msg">{alert.msg}</span>

      </div>
    ))
    
  )
}



const mapStateToProps = state => ({
  alert: state.alert
})
export default connect(mapStateToProps)(Alert)
