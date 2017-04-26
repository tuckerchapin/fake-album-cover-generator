import React, {Component} from 'react';
import $ from 'jquery';
import Moment from 'moment';

const styles = {
    container: {
        textAlign: 'center',
        display: 'inline-block',
        verticalAlign: 'middle',
    },
    downloadLink: {
        fontFamily: 'Helvetica Neue, sans-serif',
        fontWeight: '200',
        color: '#808080',
        width: '150px',
        fontSize: '10pt',
        textAlign: 'center',
        marginTop: '.5em',
        textDecoration: 'none',
        display: 'block'
    },
    image: {
        cursor: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAYCAQAAABZqbWHAAABV0lEQVQoz+XRu0sVABzF8XMTvVJUENlaRgQ9pMDAQTIiIZNLchVzCGoIiqAhBIMWoYZeEAjRnVqClsIkkB5QCEW0VBjUqg1CQdDWw8L6NHiv2tQfEGf7ne/vwO93IgtqdsgFVxyzTcQGfVIzlxuZdttZQ254R8Xx90Y5MW93fTWiYUnYsNd22sGbiE3fHBSxQoe9tmisYn2MRuG3QRG9Jswx8UVrFSgzFq2vFEQ393XaOKVf8S9g+JxYZ5KS2P1M2YAWdaLEeNzpFx08FVH/0y+zPply1z16YqwsOnlcza23TFGTXXr1SFwdFOvNsHnhyoLKS9N+0BD7nog4TUWziKJL18VKj9gfdXO6RQz5yC03Z12zSqz1lu0RpQ+2imhx2BHtIlZ7wflaF6dmDCx5dLSZ5KIslrXnu+fOKDngpIc+c3TeWVxq1O6ycQ9UdFlTm8c/9J8AfwDNSstCQiAQiQAAAABJRU5ErkJggg==), pointer",
    }
}

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: "",
            imageUrlSquare: "",
            imageDims: "[?x?]",
        };

        this.img = new Image();
    }

    componentDidMount() {
        this.getFlickrArtwork();
    }

    getRandomDate() {
        let today = Moment();
        let oneMonthAgo = Moment().subtract(2, 'years');
        return Moment(new Date(oneMonthAgo + Math.random() * (today - oneMonthAgo))).format('YYYY-MM-DD');
    }

    getFlickrArtwork() {
        if (this.state.isLoading) {
            return;
        }

        this.setState({isLoading: true});

        let url = "https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=88d0928a8bfc1a485d479f4f120b28cf&date=" + this.getRandomDate() + "&extras=url_l,url_q,url_o&per_page=10&format=json&nojsoncallback=1";
        $.getJSON(
            url,
            (data, err) => {
                if (data.photos) {
                    let photo = data.photos.photo[Math.round(Math.random() * 10)];
                    if (photo && "url_l" in photo && "url_q" in photo) {
                        this.setState({
                            imageUrl: photo.url_o || photo.url_l,
                            imageUrlSquare: photo.url_q,
                            imageDims: "[" + (photo.width_o || photo.width_l) + "x" + (photo.height_o || photo.height_l) + "]"
                        });
                        this.img.src = photo.url_o || photo.url_l;
                        this.img.onLoad = this.setState({isLoading: false});
                    } else {
                        this.getFlickrArtwork();
                    }
                } else {
                    this.getFlickrArtwork();
                }
            }
        );
    }

    render() {
        return (
            <div style={styles.container}>
                <img
                    style={styles.image}
                    height={150}
                    width={150}
                    src={this.state.isLoading ? "/placeholder-album-art.jpg" : this.state.imageUrlSquare}
                    alt=""
                    onClick={() => this.getFlickrArtwork()}
                />
                <a style={styles.downloadLink} href={this.state.imageUrl} download target="_blank">
                    download {this.state.isLoading ? "[?x?]" : this.state.imageDims}
                </a>
            </div>
        );
    }
}
