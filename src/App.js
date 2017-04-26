import React, {Component} from 'react';

import Artwork from './Artwork';
import AlbumTitle from './AlbumTitle';
import ArtistName from './ArtistName';
import FormattedAttribute from './FormattedAttribute';

const styles = {
    container: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        WebkitTransform: 'translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)',
    },
    infoContainer: {
        display: 'inline-block',
        textAlign: 'left',
        verticalAlign: 'middle',
        marginLeft: '2em',
        position: 'relative',
        top: '-20px',
    },
    aligner: {
        fontFamily: 'Helvetica Neue, sans-serif',
        fontWeight: '200',
        color: 'transparent',
        width: '150px',
        fontSize: '10pt',
        marginTop: '.5em',
        textDecoration: 'none',
    }
}

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            length: this.getRandomTwoDigit(35, 90) + ":" + this.getRandomTwoDigit(0, 59),
        };
    }

    getRandomTwoDigit(min, max) {
        let str = (Math.floor(Math.random() * (max - min + 1)) + min).toString();
        if (str.length > 1) {
            return str;
        }
        return "0" + str;
    }

    isLoading() {
        return false;
    }

    render() {
        if (this.isLoading()) {
            return (
                <div style={styles.container}>
                    Loading...
                </div>
            );
        }

        return (
            <div style={styles.container}>
                <Artwork />
                <div style={styles.infoContainer}>
                    <a style={styles.aligner}>aligner</a>
                    <ArtistName />
                    <br/>
                    <AlbumTitle />
                    <br/>
                    <FormattedAttribute
                        label="Length: "
                        text={this.state.length}
                    />
                </div>
            </div>
        );
    }
}
