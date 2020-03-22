import SourceHtml from 'SourceComponent/Html/Html.component';
import domToReact from 'html-react-parser/lib/dom-to-react';
import attributesToProps from 'html-react-parser/lib/attributes-to-props';
import PageBuilderFactory from '../PageBuilderFactory';
import PageBuilderWidget from '../PageBuilderWidget';
import PageBuilderBackground from '../PageBuilderBackground';

const DATA_CONTENT_TYPE = 'data-content-type';
const DATA_BACKGROUND_IMAGES = 'data-background-images';

export class Html extends SourceHtml {
    rules = {
        ['a']: {
            replace: this.replaceLinks
        },
        ['widget']: {
            replace: this.replacePageBuilderWidget
        }
    }

    parserOptions = {
        replace: (node) => {
            const { name } = node;
            const rule = this.rules[name];

            if (rule) {
                return rule.replace.call(this, node);
            } else {
                return this.replacePageBuilderContent(node);
            }
        }
    };

    replacePageBuilderWidget({ attribs, children }) {
        return (
            <PageBuilderWidget { ...attributesToProps(attribs) } >
                { domToReact(children, this.parserOptions) }
            </PageBuilderWidget>
        );
    }

    replacePageBuilderFactory(node) {
        const {
            name,
            attribs,
            children
        } = node;

        return (
            <PageBuilderFactory
              {  ...attributesToProps(attribs) }
              { ...{ name } }
            >
                { domToReact(children, this.parserOptions) }
            </PageBuilderFactory>
        );
    }

    replacePageBuilderBackground({ attribs, children }) {
        return (
            <PageBuilderBackground { ...attributesToProps(attribs) } >
                { domToReact(children, this.parserOptions) }
            </PageBuilderBackground>
        );
    }

    replacePageBuilderContent(node) {
        const { attribs } = node;

        if (attribs) {
            const attributeValueType = attribs[DATA_CONTENT_TYPE];
            const attributeValueJson = attribs[DATA_BACKGROUND_IMAGES];

            if (attributeValueType) {
                return this.replacePageBuilderFactory(node);
            }

            if (attributeValueJson) {
                if (attributeValueJson.length > 2) {
                    return this.replacePageBuilderBackground(node);
                }
            }
        }
    }
}

export default Html;
