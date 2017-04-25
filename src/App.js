import React, {Component} from 'react';
import $ from 'jquery';
import Moment from 'moment';

const styles = {
    label: {
        fontFamily: 'Helvetica Neue',
        fontWeight: '200',
        color: '#808080'
    },
    text: {
        fontFamily: 'Helvetica Neue',
        fontWeight: '600',
    }
}

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            artist: "",
            title: "",
            imageUrl: "",
            imageUrlSquare: "",
        };

        this.getEverything();
    }

    getRandomDateInLastMonth() {
        let today = Moment();
        let oneMonthAgo = Moment().subtract(1, 'months');
        return Moment(new Date(oneMonthAgo + Math.random() * (today - oneMonthAgo))).format('YYYY-MM-DD');
    }

    getRandomTwoDigit() {
        let s = "00" + Math.round(Math.random() * 100);
        return s.substr(2);
    }

    getRandomArtist() {
        $.getJSON(
            "https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&format=json&origin=*",
            (data) => this.setState({
                artist: Object.values(data.query.pages)[0].title.replace(/([([])\s*/g, "|").split("|")[0]
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

                titleToSet = titleToSet.replace(/([.;?!([])\s*/g, "|").split("|")[0].replace(/['"]+/g, '');
                let numWords = titleToSet.split(" ").length;

                if (titleToSet === "" || numWords < 1 || numWords > 15) {
                    this.getRandomTitle();
                } else {
                    this.setState({title: titleToSet.toLowerCase()});
                }
            }
        );
    }

    getRandomArtwork() {
        let url = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=9d125f270ce02fcb7b1ebf033e981ea9&date=" + this.getRandomDateInLastMonth() + "&extras=url_l,url_q&per_page=10&format=json&nojsoncallback=1";
        $.getJSON(
            url,
            (data) => {
                if (data.photos) {
                    let photo = data.photos.photo[Math.round(Math.random() * 10)];
                    if (photo && "url_l" in photo && "url_q" in photo) {
                        this.setState({
                            imageUrl: photo.url_l,
                            imageUrlSquare: photo.url_q,

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
                        webkitTransform: 'translate(-50%, -50%)',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                        Loading...
                </div>
            );
        }
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
                <img
                    style={{
                        verticalAlign: 'middle',
                    }}
                    src={this.state.imageUrlSquare}
                    alt=""
                />
                <div
                    style={{
                        display: 'inline-block',
                        textAlign: 'left',
                        verticalAlign: 'middle',
                        marginLeft: '2em',
                    }}
                >
                    <div>
                        <span style={styles.label}>Artist: </span>
                        <span style={styles.text}>{this.state.artist}</span>
                    </div>
                    <br/>
                    <div>
                        <span style={styles.label}>Album: </span>
                        <span style={styles.text}>{this.state.title}</span>
                    </div>
                    <br/>
                    <div>
                        <span style={styles.label}>Length: </span>
                        <span style={styles.text}>{this.getRandomTwoDigit()}:{this.getRandomTwoDigit()}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
