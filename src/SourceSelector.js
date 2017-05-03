import React, {Component} from 'react';
import $ from 'jquery';

import getUrlParam from './getUrlParam';

const styles = {
    container: {
        position: 'absolute',
        top: '90%',
        left: window.innerWidth / 2 - 150,
        opacity: '.5',
        width: '300px',
        textAlign: 'center',
        height: 'auto',
        color: '#808080',
        fontFamily: 'Helvetica Neue, sans-serif',
    },
    link: {
        cursor: 'pointer',
    }
}

export default class SourceSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        let source = getUrlParam("src");
        if (source == "imgur" || source == "flickr" || source == "random") {
            this.setState({source: source});
        } else {
            this.setSourceParam("random");
        }
    }

    setSourceParam(source) {
        history.pushState("", source, "?src=" + source);
        this.setState({source: source});
    }

    render() {
        return (
            <div style={styles.container}>
                <span
                    style={{
                        cursor: 'pointer',
                        fontWeight: (this.state.source == 'random' ? '400' : '200')
                    }}
                    onClick={() => this.setSourceParam('random')}
                >random </span>
                |
                <span
                    style={{
                        cursor: 'pointer',
                        fontWeight: (this.state.source == 'flickr' ? '400' : '200')
                    }}
                    onClick={() => this.setSourceParam('flickr')}
                > flickr </span>
                |
                <span
                    style={{
                        cursor: 'pointer',
                        fontWeight: (this.state.source == 'imgur' ? '400' : '200')
                    }}
                    onClick={() => this.setSourceParam('imgur')}
                > imgur</span>
            </div>
        );
    }
}
