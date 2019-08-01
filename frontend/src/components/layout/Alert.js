import React, {useEffect} from 'react';
import {connect} from 'react-redux';


const Alert = (alert) => {
  
  useEffect(() => {

    console.log(alert);
    console.log(alert.alert.length);

  }, [alert])
  return (
    alert.alert.length > 0 && alert.alert.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <span>{alert.msg}</span>

      </div>
    ))
    
  )
}



const mapStateToProps = state => ({
  alert: state.alert
})
export default connect(mapStateToProps)(Alert)
