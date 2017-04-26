import React, {Component} from 'react';
import $ from 'jquery';
import values from 'object.values';

import FormattedAttribute from './FormattedAttribute';

export default class ArtistName extends Component {
    constructor(props) {
        super(props);

        this.state = {
            artist: "",
        };
    }

    componentDidMount() {
        this.getWikipediaTitle();
    }

    getWikipediaTitle() {
        $.getJSON(
            "https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&format=json&origin=*",
            (data) => this.setState({
                artist: values(data.query.pages)[0].title.replace(/([([])\s*/g, "|").split("|")[0].split(",")[0]
            })
        );
    }

    render() {
        return (
            <FormattedAttribute
                label="Artist: "
                text={this.state.artist}
                onClick={() => this.getWikipediaTitle()}
            />
        );
    }
}
