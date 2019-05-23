import React from "react";

export default function MeetingRoomDetail(props) {
	return (
		<div className="box">
			<h3> Rooms </h3>
			<small> Totals: {props.data.length} </small>
		</div>
	)
}