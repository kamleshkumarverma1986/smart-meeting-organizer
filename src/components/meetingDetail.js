import React from "react";

export default function MeetingDetail(props) {
	return (
		<div className="box">
			<h3> Meetings </h3>
			<small> Totals: {props.data.length} </small>
		</div>
	)
}