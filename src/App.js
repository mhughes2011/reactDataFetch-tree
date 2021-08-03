import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import SearchForm from './Components/SearchForm';
import GifList from './Components/GifList';


class App extends Component {
  
  constructor() {
    super();

    this.state = {
      gifs: [],
      loading: true
    };
  }

  // This is called immediately after the page is loaded (using FetchAPI)
  // componentDidMount() {
  //   fetch('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
  //     .then(res => res.json())
  //     .then(resData => {
  //       this.setState({gifs: resData.data});
  //     })
  //     .catch(err => {
  //       console.log('Error fetching and parsing data', err);
  //     });
  // }

  // This is how to get data via Axios
  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query = 'hell yes') => {
    axios.get(`http://api.giphy.com/v1/gifs/search?q=${query}&limit=24&api_key=dc6zaTOxFJmzC`)
      .then(res => {
        this.setState({
          gifs: res.data.data,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', err);
      });
  }

  render() { 
    console.log(this.state.gifs);
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm onSearch={this.performSearch} />      
          </div>   
        </div>    
        <div className="main-content">
          {
            (this.state.loading)
            ? <p>Loading...</p>
            : <GifList data={this.state.gifs} />
          }
        </div>
      </div>
    );
  }
}

export default App;