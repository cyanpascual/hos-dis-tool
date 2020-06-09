import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";
import HospitalList from './userValidator';
import Personnel from './Personnel';


function Dashboard(props) {
  const { user } = props.auth
  console.log(user)
  if (user.type === 'Validator'){
    return(
      <HospitalList />
    )
  } else if (user.type === 'Hospital'){
    return(
      <Personnel />
    )
  }
  return (
    <div>Hala ka</div>
    
  )
}


Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);