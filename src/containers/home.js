import React from "react";
import { connect } from "react-redux";
import LoadingHOC from "../HOC/loading";
import { Link } from "react-router-dom";

import BuildingDetail from "../components/buildingDetail";
import MeetingDetail from "../components/meetingDetail";
import MeetingRoomDetail from "../components/meetingRoomDetail";

class Home extends React.Component {

	render() {
		return (
				<div>
					<div className="component-container">
						<BuildingDetail data={this.props.data.buildings}> </BuildingDetail>
						<MeetingDetail data={this.props.data.meetings}> </MeetingDetail>
						<MeetingRoomDetail data={this.props.data.meetingRooms}> </MeetingRoomDetail>
					</div>
					<div className="add-meeting-button-container">
						<Link to="/add-meeting"><button className="btn btn-primary btn-lg"> Add Meeting </button></Link>
					</div>
				</div>
			)
		
	}
}

const mapStateToProps = (state) => {
	return {
		data: state
	}
}

export default connect(mapStateToProps, null)(LoadingHOC("data")(Home));