import React, { useState } from 'react'
import { NewsItem } from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect } from 'react';


export const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setResults] = useState(0)
    

    // const firstCapital=(string)=>{
    //     return string.charAt(0).toUpperCase.string.slice(1);
    // }



    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0b2db2d0bfb44f63a8cc83e4323c423a&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles)
        setResults(parsedData.totalResults)
        setLoading(false)

        props.setProgress(100);
    }

    useEffect(() => {
        document.title=`${(props.category)}-News`;
        updateNews();
    }, [])

    const fetchMoreData = async () => {
        
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=0b2db2d0bfb44f63a8cc83e4323c423a&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setResults(parsedData.totalResults)

    }



    return (

        <>

            <h1 className="text-center" style={{ marin: '40px 0px', marginTop:'70px' }}>News - Top {/* {firstCapital(props.category)}  */}Headlines</h1>

            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}

                hasMore={articles.length !== totalResults}
                loader={<Spinner />}

            >


                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className='col-md-4' key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 80) : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}

                    </div>
                </div>
            </InfiniteScroll>



        </>
    )

}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: "general"
}

News.defaultProps = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
