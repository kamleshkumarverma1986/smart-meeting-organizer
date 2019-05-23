import React from "react";
import { connect } from "react-redux";

import buildingJSON from "../api/building.json";
import meetingRoomJSON from "../api/meeting-room.json";
import meetingJSON from "../api/meeting.json";
import { Link } from 'react-router-dom'

class Main extends React.Component {

	constructor(props) {
		super(props);
		setTimeout(()=>{
			const data = { 
				buildings: buildingJSON.buildings,
				meetingRooms: meetingRoomJSON.meetingRooms,
				meetings: meetingJSON.meetings
			}
			this.props.setInitialState(data);
		}, 1000);
	}

	render() {
		return (
			<div className="header">
				<Link to="home"><h2> Smart Meeting Organizer </h2></Link>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setInitialState: (data) => {
			dispatch({type: "SET_INITIAL_STATE", payload: data});
		}
	}
}

export default connect(null, mapDispatchToProps)(Main);