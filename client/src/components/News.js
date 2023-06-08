import React ,{Component}from 'react'
import NewsItems from './NewsItems'

export class News extends Component{
 
  constructor()
    {
        super();
        console.log("Hello constructor");
        this.state={
          articles: [],
          loading: false,
          page:1
        }
    }
    async componentDidMount(){
      let url="https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=cce2a3b1811f46e396b6970cb5867c67&page=1&pageSize=12"
      let data =await fetch(url);
      let parsedData= await data.json()
      console.log(parsedData);
      this.setState({articles:parsedData.articles,totalArticles : parsedData.totalResult})
    }
    handlePrevClick= async ()=>{
      let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=cce2a3b1811f46e396b6970cb5867c67&page=${this.state.page + 1}&pageSize=12`
      let data =await fetch(url);
      let parsedData= await data.json()
      console.log(parsedData);
         this.setState({
             page: this.state.page - 1,
             articles:parsedData.articles
         })


  
    }
    handleNextClick= async ()=>{
      if (Math.ceil(this.state.totalResults/12))
      {

      }
      else{
         
      let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=cce2a3b1811f46e396b6970cb5867c67&page=${this.state.page + 1}&pageSize=12`
      let data =await fetch(url);
      let parsedData= await data.json()
      console.log(parsedData);
         this.setState({
             page: this.state.page + 1,
             articles:parsedData.articles
         })
    }
  }
  render(){
  return (
    <div className='container my-3'>
      <h2>Express News - Top Headlines</h2>
      <div className='row'>
      {this.state.articles.map((element)=>{ return <div className='col-md-4' key ={element.url}>
      <NewsItems title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
      </div>
      })}
      </div>
      <div className='container d-flex justify-content-between'>
      <div className="contact_form_button">
    <button disabled={this.state.page<=1} type="submit" className="button contact_submit_button" onClick={this.handlePrevClick} >&larr; Previous</button>
       </div>
       <div className="contact_form_button">
    <button type="submit" className="button contact_submit_button" onClick={this.handleNextClick} >Next &rarr;</button>
       </div>

      </div>
    </div>
  )
}
}

export default News
