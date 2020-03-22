import { PureComponent } from 'react';

class PageBuilderWidget extends PureComponent {
    noChildren(props) {
        return {
            ...props,
            children: []
        }
    }

    render() {
       const { name } = this.props;

       return React.createElement(
           name,
           { ...this.props }
       );
    }
}

export default PageBuilderWidget;
