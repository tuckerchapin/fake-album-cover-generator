import React, {Component} from 'react';

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
        let source = this.getQueryVariable("src");
        if (source == "imgur" || source == "flickr" || source == "random") {
            return;
        }
        this.setSourceQuery("random");
    }

    getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) == variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        return;
    }

    setSourceQuery(source) {
        window.location.search = "?src=" + source;
    }

    render() {
        return (
            <div style={styles.container}>
                <span style={styles.link} onClick={() => this.setSourceQuery('random')}>random </span>
                |
                <span style={styles.link} onClick={() => this.setSourceQuery('flickr')}> flickr </span>
                |
                <span style={styles.link} onClick={() => this.setSourceQuery('imgur')}> imgur</span>
            </div>
        );
    }
}
