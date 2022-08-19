import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  constructor() {
    super();
    console.log("this is a constructor from News component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=79e419c368bb473cbb82ac60b493c590&page=1&pagesize=${this.props.pageSize}`;
    this.setState({loading:true})

    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalAritiles: parseData.totalResults,
      loading:false
    });
   
  }
  prevClick = async () => {
    console.log("this is a prev click");
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=79e419c368bb473cbb82ac60b493c590&page=${this.state.page - 1
      }&pagesize=${this.props.pageSize}`;
      this.setState({loading:true})

    let data = await fetch(url);
    let parseData = await data.json();
    
    this.setState({
      page: this.state.page - 1,
      articles: parseData.articles,
      loading:false
    });
  };

  nextClick = async () => {
    console.log("this is a next click");
    if (!(this.state.page + 1 >Math.ceil(this.state.totalAritiles / this.props.pageSize)))
    {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=79e419c368bb473cbb82ac60b493c590&page=${this.state.page + 1
        }&pagesize=${this.props.pageSize}`;
        this.setState({loading:true})

      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parseData.articles,
        loading:false
      });
    }
  };

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Top News</h1>

        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading &&this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  discription={
                    element.description ? element.description.slice(0, 58) : ""
                  }
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="button d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-light"
            onClick={this.prevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalAritiles / this.props.pageSize)
            }
            type="button"
            className="btn btn-light"
            onClick={this.nextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
