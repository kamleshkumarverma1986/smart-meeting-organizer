const reducer = (state={}, action) => {
	var newState = {...state};
	switch(action.type) {
		case "SET_INITIAL_STATE":
			newState = action.payload;
			break;
		case "ADD_NEW_MEETING":

			action.payload.id = (new Date()).getTime() /* generate the unquie id using secconds*/

			/* First adding meeting id into corresponding meeting room */
			newState.meetingRooms = newState.meetingRooms.map((room)=>{
				return {...room};
			});
			var meetingRoom =  newState.meetingRooms.find(x => x.id === action.payload.meetingRoom);
			meetingRoom.meetings.push(action.payload.id);

			/* Now adding meeting object */
			newState.meetings = newState.meetings.map((meeting)=>{
				return {...meeting};
			});
			newState.meetings.push(action.payload);
			break;
		default:
			return newState;
	}
	return newState;
}

export default reducer;