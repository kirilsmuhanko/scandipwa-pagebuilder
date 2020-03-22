# ScandiPWA Page Builder extension

## What do we support?

List of supported widgets:

### Layout

The Layout section of the Page Builder panel is used to add rows, columns, or tabs to the stage. Read [Magento user guide](https://docs.magento.com/m2/ee/user_guide/cms/page-builder-layout.html).

- [x] Row
- [x] Column
- [x] Tabs

### Add Content

Use the Content section of the Page Builder panel to add existing content to the stage. Read [Magento user guide](https://docs.magento.com/m2/ee/user_guide/cms/page-builder-add-content.html).

- [x] Block
- [ ] ~~Dynamic Block~~
- [ ] ~~Products~~

### Media

Use the Media section of the Page Builder panel to add images, video, banners, sliders, and Google Maps to any layout container on the stage. Read [Magento user guide](https://docs.magento.com/m2/ee/user_guide/cms/page-builder-media.html).

- [x] Image
- [x] Video
- [x] Banner
- [x] Slider
- [x] ~~Map~~

### Elements

Use the Elements section of the Page Builder panel to add text, headings, buttons, dividers, and HTML code to any layout container on the stage. Read [Magento user guide](https://docs.magento.com/m2/ee/user_guide/cms/page-builder-elements.html).

- [x] Text
- [x] Heading
- [x] ~~Quote~~ (Magento 2.3.4)
- [x] Buttons
- [x] Divider
- [x] HTML code

## Third party dependencies:

* Slider widget depends on [react-slick](https://www.npmjs.com/package/react-slick).
* Html pwa core component depends on [html-react-parser](https://www.npmjs.com/package/html-react-parser).

## Page Builder Integration Framework: The Details

### The basic idea

1. Handle html code from graphql query;
2. Generate react elements using "html-react-parser".

* Parser works recursively;
* After every interation executed callback function;
* React elements can be replaced and modified.

### The components that provide these services

* **Html** - handle html, generate react elements, replace them;
* **PageBuilderFactory** - return a widget component;
* **PageBuilderWidget** - default html rendering without modifications;
* all other components are widgets, that extends PageBuilderWidget.

### "html-react-parser" input and output example

**input (html code):**

```html
<div data-content-type="column">
    <div data-content-type="text">
        <p>message</p>
    </div>
</div>
```

**output (react elements):**

```js
React.createElement(
    'div',
    { 'data-content-type': 'column' },
    React.createElement(
        'div',
        { 'data-content-type': 'text' },
        React.createElement(
            'p',
            { },
            'message'
        )
    )
);
```

### Widget replacement example

**Parser callback function:**

```js
parserOptions = {
    replace: (node) => {
        const { attribs, children } = node;

        const dataContentType = attribs['data-content-type'];

        if (dataContentType) {
            if (dataContentType = 'text') {
                return (
                    <MyComponent { ...attributesToProps(attribs) } >
                        { domToReact(children, this.parserOptions) }
                    </MyComponent>
                );
            }
        }
    }
};
```

* attributesToProps - makes attributes compatible with React props;
* domToReact - converts DOM nodes to React elements.

### Widget customization example

* Parser html code input:

```html
<div data-content-type="widget-wrapper">
    <div class="widget-images">
        <img src=".."/>
        <img src=".."/>
    </div>
    <div class="widget-button">
        <button>Click Me!</button>
    </div>
</div>
```

* "widget-wrapper" was replaced with `<MyComponent>`
* Component input = custom DOM node;
* In `<MyComponent>` we need to handle button click event;
* We **don't need** to modify content inside "widget-images".

`<MyComponent>` "widget-wrapper" render example:

```js
render() {
    return (
        <div { ...this.noChildren(this.widgetWrapper) } >
            <div { ...this.widgetImages } >
            <div { ...this.noChildren(this.widgetButtons) } >
                <button onClick={ handleClick } >
                    Custom Text
                </button>
            </div>
        </div>
    );
}
```

* noChildren - removes child array from node.
