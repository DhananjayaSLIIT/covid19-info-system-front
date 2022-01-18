import React, {Component} from 'react';
import '../../css/cover_slide.css';
import insert1 from '../../image/image1.PNG';
import insert2 from '../../image/image2.PNG';
import insert3 from '../../image/image3.PNG';


export default class SlideShow extends Component {
    componentDidMount() {
        let slideIndex = 1;
        showSlides(slideIndex);

        function plusSlides(n) {
            showSlides(slideIndex += n)
        }

        function showSlides(n){
            let i;
            let slides = document.getElementsByClassName("cover-slides");
            if(n > slides.length){
                slideIndex = 1;
            }

            if(n < 1){
                slideIndex = slides.length
            }

            for( i = 0; i < slides.length; i++){
                slides[i].style.display = "none";
            }

            slideIndex++;
            try {
                if (slideIndex > slides.length) {slideIndex = 1}
                slides[slideIndex - 1].style.display = "block";
                setTimeout(showSlides, 10000);
            }catch (error){
                window.location.reload(false);
            }
        }
    }

    render() {
        return (
            <div>
                <div className="coverslide-container">
                    <div className="cover-slides">
                        <img className="cover-image" src={insert1} alt="Logo" />
                    </div>

                    <div className="cover-slides">
                        <img className="cover-image" src={insert2} alt="Logo" />
                    </div>

                    <div className="cover-slides">
                        <img className="cover-image" src={insert3} alt="Logo" />
                    </div>
                </div>
            </div>
        );
    }
}

