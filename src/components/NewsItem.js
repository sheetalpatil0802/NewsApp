import React from 'react'

export const NewsItem =(props)=> {


  
    let { title, description, imgUrl, newsUrl, author, date, source } = props;
    return (
      <div className='my-3'>
        <div className="card">
          <div className="card-body">

            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              position: 'absolute',
              right:0
            }}>
              <span className="badge rounded-pill bg-primary">
                {source}</span>
            </div>

            <img src={!imgUrl ? "https://st2.depositphotos.com/1129865/6551/i/600/depositphotos_65515651-stock-photo-news.jpg" : imgUrl} className="card-img-top" alt='...' />


            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More..</a>
          </div>
        </div>

      </div>
    )
  
}
