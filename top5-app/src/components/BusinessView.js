import { Component } from 'react';

class BusinessView extends Component {

    render() {
        return(
            <div>
                <h1>{this.props.business.name}</h1>
                <img src={this.props.business.imageSrc} alt={this.props.business.name} className="bus-img"></img>
                <address>{this.props.business.address}</address>
                <h4>Rating - {this.props.business.rating} &nbsp;&nbsp; No of Reviews - {this.props.business.reviewCount}</h4>
                <span>{this.props.business.reviewerComment}</span>
                <br/><span><i> -- by&nbsp;{this.props.business.reviewer}, &nbsp;Rating - {this.props.business.reviewerRating}</i></span>
            </div>
        )
    }
}

export default BusinessView;