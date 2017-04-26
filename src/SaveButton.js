import React, {Component} from 'react';

export default class SaveButton extends Component {
    render() {
        return (
            <img
                // onClick={
                //     () => domtoimage.toPng(document.getElementById('my-node')).then(function (dataUrl) {
                //         let link = document.createElement('a');
                //         link.download = 'my-image-name.jpeg';
                //         link.href = dataUrl;
                //         link.click();
                //     });
                // }
                style={{
                    position: 'absolute',
                    top: '80%',
                    left: window.innerWidth / 2 - 15,
                    opacity: '.5',
                    width: '30px',
                    height: 'auto',
                    cursor: 'pointer'
                }}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAkCAMAAAD4m0k4AAABKVBMVEVmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZma5L0ceAAAAY3RSTlMAAQQGCAoLERITFBUWHR8gISIkJSYnKC4vMDc4P0VGR0hJS01OUFJWV1hZWlxgYWJkZmdoamtvcXN0goOFhoeMkJGSk5SWnqGipamrrq+xsrW2t7i5uru8vr/Bw8TGyMnKy8zMP+JUAAABcUlEQVR4AY3VeVfTQBQF8IvVJBSKCxUV9yXigkJrxH1RcEGJNctUrRbI/f4fwhzoad/MJJ3+/r/n3b/uQ632o/d7eb73YWMFs1h6ybHXy3C61afw5y4c7tPwGDUaq2tRdP0BLSGqeE++F6x2cA62K99Y7y0sdzjN4XkYLnO6Tei8hNPtQPeUDvFJSKd6nCj6iVJJv6D0uwlplYJqefPzXktR+nEC0hqFtIFSI6WUtiA9pKCaKDUVNdlNTLQ/UlABSoGi4R5GzrwhZwnwBo5c+8UZA3+XULpKU3YcyGh5BeD0P5qGCygtDGk5WAa2Kezv9lQ+iI8vxINc9Xb3KW3gAqViC36w6M+hNOcvBj62CkrbeE7dOjTr1MX4QkMHQocGhYSmCGMR7YCipYuRLi0xEto6eh9pB19ZIdL7CJt4wSpd0Uc6bOMiK4Vh7dh8ops2Z2eHdNMG8zbd9EkOB3TTRn/lHd30t3Lp2eefWVIjlY/rP0DNvprP230pAAAAAElFTkSuQmCC"
            />
        );
    }
}
