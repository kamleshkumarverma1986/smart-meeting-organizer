import React from "react";

export default function BuildingDetail(props) {
	return (
		<div className="box">
			<h3> Buildings </h3>
			<small> Totals: {props.data.length} </small>
		</div>
	)
}