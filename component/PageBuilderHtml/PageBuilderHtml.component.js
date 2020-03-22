import PageBuilderWidget from '../PageBuilderWidget';

class PageBuilderHtml extends PageBuilderWidget {
    render() {
        const {
            children: HTML
        } = this.props

        return (
            <div { ...this.props } >
                <div
                  className="inner-html"
                  dangerouslySetInnerHTML={{ __html: HTML }}
                />
            </div>
        );
    }
}

export default PageBuilderHtml;
