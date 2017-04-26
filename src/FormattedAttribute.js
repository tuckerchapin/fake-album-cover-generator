import React, {Component} from 'react';

const styles = {
    container: {
        cursor: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAYCAQAAABZqbWHAAABV0lEQVQoz+XRu0sVABzF8XMTvVJUENlaRgQ9pMDAQTIiIZNLchVzCGoIiqAhBIMWoYZeEAjRnVqClsIkkB5QCEW0VBjUqg1CQdDWw8L6NHiv2tQfEGf7ne/vwO93IgtqdsgFVxyzTcQGfVIzlxuZdttZQ254R8Xx90Y5MW93fTWiYUnYsNd22sGbiE3fHBSxQoe9tmisYn2MRuG3QRG9Jswx8UVrFSgzFq2vFEQ393XaOKVf8S9g+JxYZ5KS2P1M2YAWdaLEeNzpFx08FVH/0y+zPply1z16YqwsOnlcza23TFGTXXr1SFwdFOvNsHnhyoLKS9N+0BD7nog4TUWziKJL18VKj9gfdXO6RQz5yC03Z12zSqz1lu0RpQ+2imhx2BHtIlZ7wflaF6dmDCx5dLSZ5KIslrXnu+fOKDngpIc+c3TeWVxq1O6ycQ9UdFlTm8c/9J8AfwDNSstCQiAQiQAAAABJRU5ErkJggg==), pointer",
        maxWidth: '528px',
    },
    label: {
        fontFamily: 'Helvetica Neue, sans-serif',
        fontWeight: '200',
        color: '#808080',
    },
    text: {
        fontFamily: 'Helvetica Neue, sans-serif',
        fontWeight: '500',
    }
}

export default class FormattedAttribute extends Component {
    render() {
        return (
            <div style={styles.container}>
                <span style={styles.label} {...this.props}>{this.props.label}</span>
                <span style={styles.text}>{this.props.text}</span>
            </div>
        );
    }
}
