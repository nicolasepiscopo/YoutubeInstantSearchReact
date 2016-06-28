import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyArKMsYrAEtEpAMONSdmaeuz_kaMscb7FM';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      videos : [], 
      selectedVideo : null 
    };
    this.videoSearch('surfboards');  
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term}, (videos) => {
      let selectedVideo = videos[0];
      this.setState({ videos, selectedVideo });
    })
  }

  render() {
    const videoSearch = _.debounce((term) => this.videoSearch(term), 300);

    return (
      <div className='row container'>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList  
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));