import React, {Component} from 'react';
import $ from 'jquery';
import values from 'object.values';

import FormattedAttribute from './FormattedAttribute';

export default class AlbumTitle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
        };
    }

    componentDidMount() {
        this.getWikiquote();
    }

    getWikiquote() {
        $.getJSON("https://en.wikiquote.org/w/api.php?action=query&prop=extracts&generator=random&grnnamespace=0&format=json&origin=*", (data) => {
                let titleToSet = "";
                let parsedHTML = $.parseHTML(values(data.query.pages)[0].extract);
                let counter = 0;

                // get from html note representation
                while (counter < parsedHTML.length) {
                    if (parsedHTML[counter].nodeName === "UL") {
                        titleToSet = parsedHTML[counter].textContent.split(".")[0];
                        break;
                    }
                    counter++;
                }

                // pull out special chars and split on punctuation
                titleToSet = titleToSet.replace(/([.;?!*([])\s*/g, "|").split("|")[0].replace(/["]+/g, '');//.toLowerCase();
                let numWords = titleToSet.split(" ").length;

                if (titleToSet === "" || numWords < 1 || numWords > 12) {
                    this.getWikiquote();
                } else {
                    this.setState({title: titleToSet});
                }
            }
        );
    }

    render() {
        return (
            <FormattedAttribute
                label="Album: "
                text={this.state.title}
                onClick={() => this.getWikiquote()}
            />
        );
    }
}
