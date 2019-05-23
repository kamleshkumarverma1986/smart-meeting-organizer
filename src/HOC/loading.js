import React from "react";

const isEmpty = (data) => {
	return data === null || 
			data === undefined ||
				(data.hasOwnProperty("length") && data.length === 0) ||
					(data.constructor === Object && Object.keys(data).length ===0);

}

const LoadingHOC = (loadingDataName) => (WrappedComponent) => {

	return class HOC extends React.Component {

		render() {
			if(isEmpty(this.props[loadingDataName])) {
				return <div className="loading"> Loading... </div>
			} else {
				return (
					<WrappedComponent {...this.props}/>
				)
			}
		}
	}

}

export default LoadingHOC;