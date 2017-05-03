import React, {Component} from 'react';
import $ from 'jquery';

import getUrlParam from './getUrlParam';

const styles = {
    container: {
        position: 'absolute',
        top: '90%',
        left: window.innerWidth / 2 - 75,
        opacity: '.5',
        width: '150px',
        textAlign: 'center',
        height: 'auto',
        color: '#808080',
        fontFamily: 'Helvetica Neue, sans-serif',
        fontWeight: '200',
    },
    link: {
        cursor: 'pointer',
    }
}

export default class SourceSelector extends Component {
    componentDidMount() {
        let source = getUrlParam("src");
        if (source == "imgur" || source == "flickr" || source == "random") {
            return;
        }
        this.setSourceParam("random");
    }

    setSourceParam(source) {
        history.pushState("", source, "?src=" + source);
    }

    render() {
        return (
            <div style={styles.container}>
                <span style={styles.link} onClick={() => this.setSourceParam('random')}>random </span>
                |
                <span style={styles.link} onClick={() => this.setSourceParam('flickr')}> flickr </span>
                |
                <span style={styles.link} onClick={() => this.setSourceParam('imgur')}> imgur</span>
            </div>
        );
    }
}
