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
            imageUrl: "",
        };

        this.getEverything();
    }

    randomDateInLastMonth() {
        let today = Moment();
        let oneMonthAgo = Moment().subtract(1, 'months');
        return Moment(new Date(oneMonthAgo + Math.random() * (today - oneMonthAgo))).format('YYYY-MM-DD');
    }

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
            "https://en.wikiquote.org/w/api.php?action=query&prop=extracts&generator=random&grnnamespace=0&format=json&origin=*",
            (data) => {
                let titleToSet = "";
                let parsedHTML = $.parseHTML(Object.values(data.query.pages)[0].extract);
                let counter = 0;
                while (counter < parsedHTML.length) {
                    if (parsedHTML[counter].nodeName === "UL") {
                        titleToSet = parsedHTML[counter].textContent.split(".")[0];
                        break;
                    }
                    counter++;
                }

                if (titleToSet === "") {
                    this.getRandomTitle();
                } else {
                    this.setState({title: titleToSet});
                }
            }
        );
    }

    getRandomArtwork() {
        let url = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=9d125f270ce02fcb7b1ebf033e981ea9&date=" + this.randomDateInLastMonth() + "&extras=url_l&per_page=10&format=json&nojsoncallback=1";
        $.getJSON(
            url,
            (data) => {
                let photo = data.photos.photo[Math.round(Math.random() * 10)];
                if ("url_l" in photo) {
                    this.setState({
                        imageUrl: data.photos.photo[Math.round(Math.random() * 10)].url_l
                    });
                } else {
                    this.getRandomArtwork();
                }
            }
        );
    }

    getEverything() {
        this.getRandomArtist();
        this.getRandomTitle();
        this.getRandomArtwork();
    }

    isLoading() {
        if (this.state.artist !== "" && this.state.title !== "" && this.state.imageUrl !== "") {
            return false;
        }
        return true;
    }

    render() {
        if (this.isLoading()) {
            return (
                <div className="App">
                    <div>
                        Loading...
                    </div>
                </div>
            );
        }

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
                <img src={this.state.imageUrl} alt=""/>
            </div>
        );
    }
}

export default App;
