import React from "react";
import { connect } from "react-redux";
import LoadingHOC from "../HOC/loading";

class AddMeeting extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			step: 1,
			id: "",
			title: "",
			date: "",
			startTime: "",
			endTime: "",
			meetingRoomId: "",
			buildingId: this.props.data.buildings[0].id
		}
	}

	componentDidMount() {
		this.disabledPrevDate();
	}

	disabledPrevDate() {
		var dtToday = new Date();
	    var month = dtToday.getMonth() + 1;
	    var day = dtToday.getDate();
	    var year = dtToday.getFullYear();
	    if(month < 10)
	        month = '0' + month.toString();
	    if(day < 10)
	        day = '0' + day.toString();
	    
	    var maxDate = year + '-' + month + '-' + day;
	    document.getElementById("date").setAttribute('min', maxDate);
	}

	handleChange = (event) => {
		var key = event.target["id"];
		this.setState({[key]: event.target.value});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		if(this.convertTimeToSecond(this.state.startTime) < this.convertTimeToSecond(this.state.endTime)) {
			var newMeetingInfo = {...this.state};
			this.checkRoomAvailability(newMeetingInfo);
		} else {
			alert("End time should be greater than start time.");
		}
		
	}

	checkRoomAvailability = (newMeetingInfo) => {
		this.availableRoom = [];
		var building = this.props.data.buildings.find(x => x.id === newMeetingInfo.buildingId);
		building.meetingRooms.forEach((roomId) => {
			var meetingRoom = this.props.data.meetingRooms.find(x => x.id === roomId);
			if(this.isRoomAvailabe(meetingRoom, newMeetingInfo)) {
				this.availableRoom.push(meetingRoom);
			}
		});
		this.setState({step: 2});
	}

	isRoomAvailabe = (meetingRoom, newMeetingInfo) => {
		if(!meetingRoom.meetings.length) {
			return true;
		}
		var isFound = true;
		meetingRoom.meetings.forEach((meetingId)=> {
			var meeting = this.props.data.meetings.find(x => x.id === meetingId);

			var meetingStartTimeInSecond = this.getDateAndTimeInSecond(meeting.date, meeting.startTime);
			var newMeetingStartTimeInSecond = this.getDateAndTimeInSecond(newMeetingInfo.date, newMeetingInfo.startTime);

			var meetingEndTimeInSecond = this.getDateAndTimeInSecond(meeting.date, meeting.endTime);
			var newMeetingEndTimeInSecond = this.getDateAndTimeInSecond(newMeetingInfo.date, newMeetingInfo.endTime);

			if(!(newMeetingEndTimeInSecond < meetingStartTimeInSecond || meetingEndTimeInSecond < newMeetingStartTimeInSecond)) {
				isFound = false;
			}
		});
		return isFound;
	}

	getDateAndTimeInSecond = (date, time) => {
		var meetingDate = new Date(date);
		return (meetingDate.getTime()/1000) + this.convertTimeToSecond(time);
	}

	convertTimeToSecond = (hms) => {
		var a = hms.split(':');
		return (+a[0]) * 60 * 60 + (+a[1]) * 60;
	}

	addMeetingFinal = (room) => {
		var meetingData = {...this.state};
		delete meetingData.step;
		delete meetingData.buildingId;
		meetingData.meetingRoom = room.id;
		this.props.addMeeting(meetingData);
		this.props.history.push("/home");
	}

	goBackHandler = () => {
		this.setState({step: 1});
	}

	render() {
		if(this.state.step === 1) {
			return (
				<div className="add-meeting-form">
					<form onSubmit={this.handleSubmit}>
					  <div className="form-row">
					    <div className="form-group col-md-6">
					      <label htmlFor="title">Title of the Meeting</label>
					      <input required type="text" className="form-control" id="title" placeholder="Enter Title" onChange={this.handleChange} />
					    </div>
					    <div className="form-group col-md-6">
					      <label htmlFor="date">Meeting Date</label>
					      <input required type="date" className="form-control" id="date" placeholder="Enter the date" onChange={this.handleChange}/>
					    </div>
					  </div>

					  <div className="form-row">
					    <div className="form-group col-md-6">
					      <label htmlFor="startTime"> Start Time</label>
					      <input required type="time" className="form-control" id="startTime" placeholder="Enter the start time" onChange={this.handleChange} />
					    </div>
					    <div className="form-group col-md-6">
					      <label htmlFor="endTime"> End Time </label>
					      <input required type="time" className="form-control" id="endTime" placeholder="Enter the end time" onChange={this.handleChange}/>
					    </div>
					  </div>
					  
					  <div className="form-row">
					    <div className="form-group col-md-6">
					      <label htmlFor="inputState">State</label>
					      <select defaultValue={this.props.data.buildings[0].id} id="buildingId" className="form-control" onChange={this.handleChange}>
					      	{
					      		this.props.data.buildings.map((building)=>{
					      			return (<option value={building.id} key={building.id}> {building.name} </option>)
					      		})
					      	}
					      </select>
					    </div>
					    <div className="form-group col-md-6">
					      	<label> Click for Next</label>
					     	<div className="form-group col-md-6">
						      <button type="submit" className="btn btn-primary">Next</button>
						    </div>
					    </div>
					  </div>
					</form>
				</div>
			)
		} else if(this.state.step === 2) {
			if(this.availableRoom.length) {
				return (
					<div className="available-room-container">
						<div>
							<h1> All Available Rooms </h1>
							<div className="available-room">
								{
									this.availableRoom.map((room)=> {
										return (
											<div key={room.id} className="room" onClick={(e) => this.addMeetingFinal(room, e)}>
												<div><h3> Building: {room.building} </h3></div>
												<div><h3> Room: {room.name} </h3></div>
												<div><h3> Floor {room.floor} </h3></div>
												<hr></hr>
											</div>
										)
									})
								}
							</div>
						</div>
					</div>
				)
			} else {
				return (
				<div className="available-room-container">
					<div>
						<h1> No Available Rooms </h1>
						<button className="btn btn-primary" onClick={this.goBackHandler}>Go Back</button>
					</div>
				</div>
			)
			}
			
		}
		
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addMeeting: (data) => {
			dispatch({type: "ADD_NEW_MEETING", payload: data});
		}
	}
}


const mapStateToProps = (state) => {
	return {
		data: state
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingHOC("data")(AddMeeting));