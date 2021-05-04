export default function BusinessView (props) {
  return(
    <div>
      <h1>{props.business.name}</h1>
      <img src={props.business.imageSrc} alt={props.business.name} className="bus-img"></img>
      <address>{props.business.address}</address>
      <h4>Rating - {props.business.rating} &nbsp;&nbsp; No of Reviews - {props.business.reviewCount}</h4>
      <span>{props.business.reviewerComment}</span><br/>
      <span><i> -- by&nbsp;{props.business.reviewer}, &nbsp;Rating - {props.business.reviewerRating}</i></span>
    </div>
  )
}
