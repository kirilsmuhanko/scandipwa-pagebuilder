import './PageBuilderSlider.style';
import PageBuilderWidget from '../PageBuilderWidget';
import PageBuilderBackground from '../PageBuilderBackground';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';

class PageBuilderSlider extends PageBuilderWidget {
    settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    render(){
        let { props: slider } = this;
        let { children: slideArray } = slider;

        const slides = slideArray.map((slide, i) => {
            const { children: emptyLink } = slide.props;
            const { children: slideWrapper } = emptyLink.props;

            return (
                <div { ...this.noChildren(slide.props) } key={ i } >
                    <div { ...this.noChildren(emptyLink.props) } key={ i } >
                        <PageBuilderBackground { ...slideWrapper.props } key={ i } />
                    </div>
                </div>
            );
        });

        return (
           <Slider { ...this.settings }>
               { slides }
            </Slider>
        );
    }
}

export default PageBuilderSlider;
