
import React, { Component } from 'react'

export class NewsItem extends Component {

 
  render() {
    let {title , discription ,imgUrl ,newsUrl} = this.props;
    return (
       <div className="card" style={{width: "18rem"}}>
          <img src={imgUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{discription ? discription +"..." : "" }</p>
            <a href={newsUrl} target = "_blank" rel="noreferrer" className="btn btn-sm btn-primary btn-light">Read more</a>
          </div>
        
      </div>
     
    )
  }
}

export default NewsItem
