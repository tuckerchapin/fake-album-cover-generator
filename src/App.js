import React, {Component} from 'react';
import $ from 'jquery';
import Moment from 'moment'
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            artist: "",
            title: "",
            imageUrl: ""
        };

        this.getEverything();
    }

    randomDateInLastMonth() {
        let today = Moment();
        let oneMonthAgo = Moment().subtract(1, 'months');
        return Moment(new Date(oneMonthAgo + Math.random() * (today - oneMonthAgo))).format('YYYY-MM-DD');
    }

    // convertFlickrResponseToPhoto(photoObject) {
    //     return "https://farm" + photoObject.farm + ".staticflickr.com/" + photoObject.server + "/" + photoObject.id + "_" + photoObject.secret + ".jpg";
    // }

    getRandomArtist() {
        $.getJSON(
            "https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&format=json&origin=*",
            (data) => this.setState({
                artist: Object.values(data.query.pages)[0].title
            })
        );
    }

    getRandomTitle() {
        $.getJSON(
            "https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&format=json&origin=*",
            (data) => this.setState({
                title: Object.values(data.query.pages)[0].title
            })
        );
    }

    getRandomArtwork() {
        let url = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=9d125f270ce02fcb7b1ebf033e981ea9&date=" + this.randomDateInLastMonth() + "&extras=url_l&per_page=1&format=json&nojsoncallback=1";
        $.getJSON(
            url,
            (data) => this.setState({
                // imageUrl: this.convertFlickrResponseToPhoto(data.photos.photo[0])
                imageUrl: data.photos.photo[0].url_l
            })
        );
    }

    getEverything() {
        this.getRandomArtist();
        this.getRandomTitle();
        this.getRandomArtwork();
    }

    render() {
        return (
            <div className="App">
                Your artist:
                <br/> {this.state.artist}
                <br/>
                Your title:
                <br/> {this.state.title}
                <br/>
                Your artwork:
                <br/>
                <img src={this.state.imageUrl}/>
            </div>
        );
    }
}

export default App;
