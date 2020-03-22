import './PageBuilderTabs.style';
import PageBuilderWidget from '../PageBuilderWidget';

class PageBuilderTabs extends PageBuilderWidget {
    constructor(props) {
        super(props);

        this.state = {
            tabIndex: 0
        };

        this.classTabActive = 'ui-state-active';
        this.tabs = this.props;
        this.tabList = this.props.children[0].props;
        this.tabsContent = this.props.children[1].props;
        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(e, index) {
        e.preventDefault();
        this.setState({ tabIndex: index })
    }

    renderTabMenu() {
        return this.tabList.children.map((element, i) => {
            let className = element.props.className;

            if (i == this.state.tabIndex) {
                className += ' '.concat(this.classTabActive);
            }

            return (
                <li
                  { ...this.noChildren(element.props) }
                  className={ className }
                  key={ i }
                  onClick={ (e) => this.handleTabClick(e, i) }
                >
                    <a
                      { ...element.props.children.props }
                      key={ i }
                    />
                </li>
            );
        });
    }

    renderTabItems() {
        return this.tabsContent.children.map((element, i) => {
            let display = 'none';

            if (i == this.state.tabIndex) {
                display = 'block';
            }

            return (
                <div
                  { ...element.props }
                  key={ i }
                  style={{ ...element.props.style, display }}
                />
            );
        });
    }

    render() {
        return (
            <div { ...this.noChildren(this.tabs) } >
                <ul { ...this.noChildren(this.tabList) } >
                    { this.renderTabMenu() }
                </ul>
                <div { ...this.noChildren(this.tabsContent) } >
                    { this.renderTabItems() }
                </div>
            </div>
        );
    }
}

export default PageBuilderTabs;
