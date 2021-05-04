import { Component } from 'react';

class BusinessView extends Component {

    render() {
        return(
            <div>
                <h1>{this.props.business.name}</h1>
                <img src={this.props.business.imageSrc} alt={this.props.business.name} className="bus-img"></img>
                <address>{this.props.business.address}</address>
                <h2>Rating: {this.props.business.rating}</h2>
                <p>No of Reviews: {this.props.business.reviewCount}</p>
                <p>Reviewer: {this.props.business.reviewer}, <i>Rating: {this.props.business.reviewerRating}</i></p>
                <p>Review: {this.props.business.reviewComment}</p>
            </div>
        )
    }
}

export default BusinessView;