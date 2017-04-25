import React, {Component} from 'react';
import $ from 'jquery';
import Moment from 'moment';
import values from 'object.values';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            artist: "",
            title: "",
            imageUrl: "",
            imageUrlSquare: "",
            length: this.getRandomTwoDigit(35, 122) + ":" + this.getRandomTwoDigit(0, 59),
        };

        this.askingForArtwork = false;
    }

    componentDidMount() {
        this.getEverything();
    }

    getRandomDate() {
        let today = Moment();
        let oneMonthAgo = Moment().subtract(2, 'years');
        return Moment(new Date(oneMonthAgo + Math.random() * (today - oneMonthAgo))).format('YYYY-MM-DD');
    }

    getRandomTwoDigit(min, max) {
        let str = (Math.floor(Math.random() * (max - min + 1)) + min).toString();
        if (str.length === 3) {
            return str;
        }
        str = "0000" + str;
        return str.substr(str.length - 2);
    }

    getRandomArtist() {
        $.getJSON(
            "https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&format=json&origin=*",
            (data) => this.setState({
                artist: values(data.query.pages)[0].title.replace(/([([])\s*/g, "|").split("|")[0].split(",")[0]
            })
        );
    }

    getRandomTitle() {
        $.getJSON(
            "https://en.wikiquote.org/w/api.php?action=query&prop=extracts&generator=random&grnnamespace=0&format=json&origin=*",
            (data) => {
                let titleToSet = "";
                let parsedHTML = $.parseHTML(values(data.query.pages)[0].extract);
                let counter = 0;
                while (counter < parsedHTML.length) {
                    if (parsedHTML[counter].nodeName === "UL") {
                        titleToSet = parsedHTML[counter].textContent.split(".")[0];
                        break;
                    }
                    counter++;
                }

                titleToSet = titleToSet.replace(/([.;?!*([])\s*/g, "|").split("|")[0].replace(/["]+/g, '');//.toLowerCase();
                let numWords = titleToSet.split(" ").length;

                if (titleToSet === "" || numWords < 1 || numWords > 15) {
                    this.getRandomTitle();
                } else {
                    this.setState({title: titleToSet});
                }
            }
        );
    }

    getRandomArtwork() {
        if (this.askingForArtwork) {
            return;
        }
        this.askingForArtwork = true;

        let url = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=88d0928a8bfc1a485d479f4f120b28cf&date=" + this.getRandomDate() + "&extras=url_l,url_q&per_page=10&format=json&nojsoncallback=1";
        $.getJSON(
            url,
            (data, err) => {
                if (data.photos) {
                    let photo = data.photos.photo[Math.round(Math.random() * 10)];
                    if (photo && "url_l" in photo && "url_q" in photo) {
                        this.setState({
                            imageUrl: photo.url_l,
                            imageUrlSquare: photo.url_q,
                            imageDims: "[" + photo.width_l + "x" + photo.height_l + "]"
                        });
                    } else {
                        this.getRandomArtwork();
                    }
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
        this.setState({length: this.getRandomTwoDigit(35, 122) + ":" + this.getRandomTwoDigit(0, 59)});
    }

    isLoading() {
        if (this.state.artist !== ""
            && this.state.title !== ""
            && this.state.imageUrl !== ""
        ) {
            return false;
        }
        return true;
    }

    render() {
        if (this.isLoading()) {
            return (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        WebkitTransform: 'translate(-50%, -50%)',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                        Loading...
                </div>
            );
        }

        return (
            <div>
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        WebkitTransform: 'translate(-50%, -50%)',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <img
                        style={{
                            height: '150px',
                            width: '150px',
                            verticalAlign: 'middle',
                        }}
                        src={this.state.imageUrlSquare}
                        alt=""
                        onLoad={() => {this.askingForArtwork = false;}}
                    />
                    <div
                        style={{
                            display: 'inline-block',
                            textAlign: 'left',
                            verticalAlign: 'middle',
                            marginLeft: '2em',
                        }}
                    >
                        <div style={{maxWidth: '528px'}}>
                            <span className='label'>Artist: </span>
                            <span className='info-text'>{this.state.artist}</span>
                        </div>
                        <br/>
                        <div style={{maxWidth: '528px'}}>
                            <span className='label'>Album: </span>
                            <span className='info-text'>{this.state.title}</span>
                        </div>
                        <br/>
                        <div style={{maxWidth: '528px'}}>
                            <span className='label'>Length: </span>
                            <span className='info-text'>{this.state.length}</span>
                        </div>
                        <br/>
                        <div>
                            <span className='label reroll'>reroll:
                                <span className='info-text' onClick={() => this.getEverything()}> all </span>|
                                <span className='info-text' onClick={() => this.getRandomArtist()}> artist </span>|
                                <span className='info-text' onClick={() => this.getRandomTitle()}> album </span>|
                                <span className='info-text' onClick={() => this.getRandomArtwork()}> artwork </span>
                            </span>
                        </div>
                    </div>

                    <div className='download'>
                        <a className='download' href={this.state.imageUrl} download="proposed_file_name" target="_blank">download {this.state.imageDims}</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
