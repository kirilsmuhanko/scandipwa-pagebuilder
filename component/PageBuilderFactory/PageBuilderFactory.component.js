import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ChildrenType } from 'Type/Common';
import PageBuilderBanner from '../PageBuilderBanner'
import PageBuilderBlock from '../PageBuilderBlock'
import PageBuilderButtonItem from '../PageBuilderButtonItem'
import PageBuilderButtons from '../PageBuilderButtons'
import PageBuilderColumn from '../PageBuilderColumn'
import PageBuilderColumnGroup from '../PageBuilderColumnGroup'
import PageBuilderDivider from '../PageBuilderDivider'
import PageBuilderHeading from '../PageBuilderHeading'
import PageBuilderHtml from '../PageBuilderHtml'
import PageBuilderImage from '../PageBuilderImage'
import PageBuilderRow from '../PageBuilderRow'
import PageBuilderSlide from '../PageBuilderSlide'
import PageBuilderSlider from '../PageBuilderSlider'
import PageBuilderTabItem from '../PageBuilderTabItem'
import PageBuilderTabs from '../PageBuilderTabs'
import PageBuilderText from '../PageBuilderText'
import PageBuilderVideo from '../PageBuilderVideo'
import PageBuilderWidget from '../PageBuilderWidget'

class PageBuilderFactory extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        'data-content-type': PropTypes.string.isRequired,
        children: ChildrenType.isRequired
    };

    renderMap = {
        ['banner']: {
            widget: PageBuilderBanner
        },
        ['block']: {
            widget: PageBuilderBlock
        },
        ['button-item']: {
            widget: PageBuilderButtonItem
        },
        ['buttons']: {
            widget: PageBuilderButtons
        },
        ['column']: {
            widget: PageBuilderColumn
        },
        ['column-group']: {
            widget: PageBuilderColumnGroup
        },
        ['divider']: {
            widget: PageBuilderDivider
        },
        ['heading']: {
            widget: PageBuilderHeading
        },
        ['html']: {
            widget: PageBuilderHtml
        },
        ['image']: {
            widget: PageBuilderImage
        },
        ['row']: {
            widget: PageBuilderRow
        },
        ['slide']: {
            widget: PageBuilderSlide
        },
        ['slider']: {
            widget: PageBuilderSlider
        },
        ['tab-item']: {
            widget: PageBuilderTabItem
        },
        ['tabs']: {
            widget: PageBuilderTabs
        },
        ['text']: {
            widget: PageBuilderText
        },
        ['video']: {
            widget: PageBuilderVideo
        }
    };

    renderDefault() {
        return (<PageBuilderWidget { ...this.props } />);
    }

    render() {
        const {
            'data-content-type': type
        } = this.props;

        if (!this.renderMap[type])
            return this.renderDefault();

        const { widget: Widget } = this.renderMap[type];

        if (!Widget) {
            return this.renderDefault();
        }

        return (<Widget { ...this.props } />);
    }
}

export default PageBuilderFactory;
