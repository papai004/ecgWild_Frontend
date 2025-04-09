import React from "react";
import Styles from '../styles/customcard.module.css';


type Props = {
    Card1_Heading?: string,
    card1_Paragraph?: string,
    image1?: string,
    image2?: string,
    image3?: string,
    Card2_Heading?: string,
    Card2_Paragraph?: string,
    Card2_Heading1?: string,
    Card2_Paragraph1?: string,
    Card2_Heading2?: string,
    Card2_Paragraph2?: string,
    Card2_Heading3?: string,
    Card2_Paragraph3?: string,
    Card2_Heading4?: string,
    Card2_Paragraph4?: string,
    Card3_Heading?: string,
    Card3_Paragraph?: string,
    image4?: string, 
    Card4_Heading?: string,
    Card4_Paragraph?: string,
    showOrNot?: boolean,
}

const CustomCard: React.FC<Props> = ({
    Card1_Heading,
    card1_Paragraph,
    image1,
    image2, image3,
    Card2_Heading,
    Card2_Paragraph,
    Card2_Heading1,
    Card2_Paragraph1,
    Card2_Heading2,
    Card2_Paragraph2,
    Card2_Heading3,
    Card2_Paragraph3,
    Card2_Heading4,
    Card2_Paragraph4,
    Card3_Heading,
    Card3_Paragraph,
    image4, 
    Card4_Heading,
    Card4_Paragraph,
    showOrNot,}) => {
    return (
        <>
            <div className={Styles.card_content}>
                <div id="card_item1" className={Styles.card_item}>
                    <div className={Styles.card_item_text}>
                        <h3>{Card1_Heading}</h3>
                        <p>{card1_Paragraph}</p>
                    </div>
                    <div className={Styles.card_item_img}>
                        <img className={Styles.card_item_image} src={image1} alt="our vision" />
                    </div>
                </div>

                <div id="card_item2" className={Styles.card_item2}>
                    <div className={Styles.card_item_img}>
                        <img className={Styles.card_item_image} src={image2} alt="our mission" />
                    </div>
                    <div className={Styles.card_item_text2}>
                        <h3>{Card2_Heading}</h3>
                        <p>{Card2_Paragraph}</p>
                        <div className={showOrNot ? Styles.showOrNot : Styles.card_item_innertext2}>
                        <h4>{Card2_Heading1}</h4>
                        <p>{Card2_Paragraph1}</p>
                        <h4>{Card2_Heading2}</h4>
                        <p>{Card2_Paragraph2}</p>
                        <h4>{Card2_Heading3}</h4>
                        <p>{Card2_Paragraph3}</p>
                        <h4>{Card2_Heading4}</h4>
                        <p>{Card2_Paragraph4}</p>
                        </div>
                        </div>
                </div>

                <div id="card_item3" className={Styles.card_item}>
                    <div className={Styles.card_item_text}>
                        <h3>{Card3_Heading}</h3>
                        <p>{Card3_Paragraph}</p>
                    </div>
                    <div className={Styles.card_item_img}>
                        <img className={Styles.card_item_image} src={image3} alt="our story" />
                    </div>
                </div>

                <div id="card_item4" className={showOrNot ? Styles.card_item : Styles.showOrNot}>
                    <div className={Styles.card_item_img}>
                        <img className={Styles.card_item_image} src={image4} alt="our story" />
                    </div>
                    <div className={Styles.card_item_text}>
                        <h3>{Card4_Heading}</h3>
                        <p>{Card4_Paragraph}</p>
                    </div>
                </div>
            </div>
            <div className={Styles.card_content_mobile}>
                <div className={Styles.card_item_mobile}>
                    <h3>{Card1_Heading}</h3>
                    <p>{card1_Paragraph}</p>
                    <div className={Styles.card_img_mobile}>
                        <img className={Styles.card_item_image} src={image1} alt="our vision" />
                    </div>
                </div>
                <div className={Styles.card_item_mobile_border} />
                <div className={Styles.card_item_mobile}>
                    <h3>{Card2_Heading}</h3>
                    <p>{Card2_Paragraph}</p>
                    <div className={Styles.card_img_mobile}>
                        <img className={Styles.card_item_image} src={image2} alt="our mission" height={300} />
                    </div>
                    <div className={showOrNot ? Styles.showOrNot : Styles.card_item_innertext2}>
                        <h4>{Card2_Heading1}</h4>
                        <p>{Card2_Paragraph1}</p>
                        <h4>{Card2_Heading2}</h4>
                        <p>{Card2_Paragraph2}</p>
                        <h4>{Card2_Heading3}</h4>
                        <p>{Card2_Paragraph3}</p>
                        <h4>{Card2_Heading4}</h4>
                        <p>{Card2_Paragraph4}</p>
                        </div>
                </div>
                <div className={Styles.card_item_mobile_border} />
                <div className={Styles.card_item_mobile}>
                    <h3>{Card3_Heading}</h3>
                    <p>{Card3_Paragraph}</p>
                    <div className={Styles.card_img_mobile}>
                        <img className={Styles.card_item_image} src={image3} alt="our story" />
                    </div>
                </div>
                <div className={Styles.card_item_mobile_border} />
                <div id="card_item4" className={showOrNot ? Styles.card_item_mobile : Styles.showOrNot}>
                    <div className={Styles.card_item_mobile}>
                        <h3>{Card4_Heading}</h3>
                        <p>{Card4_Paragraph}</p>
                    </div>
                    <div className={Styles.card_img_mobile}>
                        <img className={Styles.card_item_image} src={image4} alt="our story" />
                    </div>
                </div>
                <div className={showOrNot ? Styles.card_item_mobile_border : Styles.showOrNot} />
            </div>
        </>
    )
}

export default CustomCard;