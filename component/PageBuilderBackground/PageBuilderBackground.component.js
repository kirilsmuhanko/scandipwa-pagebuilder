import { PureComponent } from 'react';

class PageBuilderBackground extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            backgroundImage: undefined
        };

        const {
            'data-background-images': json
        } = this.props;

        this.mobileBreakpoint = 768;
        this.images = this.jsonToImages(json);
    }

    componentDidMount() {
        if (!this.images.desktop && !this.images.mobile) {
            return;
        }

        this.updateBackgroundImage();

        window.addEventListener('resize', () => {
            this.updateBackgroundImage();
        });
    }

    updateBackgroundImage() {
        const images = this.images;
        const isMobileView = (window.innerWidth <= this.mobileBreakpoint);

        let backgroundImage = isMobileView ? images.mobile : images.desktop;

        if (!backgroundImage) {
            backgroundImage = images.desktop ? images.desktop : images.mobile;
        }

        this.setState({ backgroundImage });
    }

    jsonToImages = (json) => {
        const images = JSON.parse(json.replace(/\\"/g, '"'));
        const urlToStyleValue = (url) => { return url ? `url("${ url }")` : null }

        return {
            desktop: urlToStyleValue(images.desktop_image),
            mobile: urlToStyleValue(images.mobile_image)
        }
    }

    render() {
        return (
            <div
                { ...this.props }
                style={{
                    ...this.props.style,
                    backgroundImage: this.state.backgroundImage
                }}
            />
        );
    }
}

export default PageBuilderBackground;
