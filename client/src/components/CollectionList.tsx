import React, {FC} from "react";
import styled from "styled-components";
import {CollectionListProps} from "../types/IProps";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CollectionListBlock = styled.div`
  margin-bottom: 35px;
`;
const Heading = styled.h3`
  color: ${(props) => props.theme.text};
  font-size: 26px;
`;
const List = styled.div`
  margin-bottom: 35px;
`;
const Slider = styled(Swiper)`
   .swiper-wrapper {
     margin-bottom: 60px;
   }
  .swiper-pagination-bullet {
    background-color: ${(props) => props.theme.secondary};
  }
   .swiper-button-prev, .swiper-button-next {
     top: 40%;
     color: ${(props) => props.theme.secondary};
   }
`;
const NoBooksText = styled.p`
  font-size: 18px;
  color: ${(props) => props.theme.text};
`;

const CollectionList: FC<CollectionListProps> = ({children, collectionName}) => {
    return (
        <CollectionListBlock>
            <Heading>{collectionName}</Heading>
            <List>
                {children!.length > 0
                    ?
                    <Slider
                        modules={[Navigation, Pagination, A11y]}
                        pagination={{clickable: true}}
                        navigation
                        breakpoints={{
                            1080: {
                                slidesPerView: 2.5,
                                spaceBetween: 15,
                            },
                            880: {
                                slidesPerView: 2,
                                spaceBetween: 15,
                            },
                            575: {
                                spaceBetween: 15,
                                slidesPerView: 1.5
                            },
                            320: {
                                spaceBetween: 10,
                                slidesPerView: 1.5
                            },
                            1: {
                                slidesPerView: 1
                            },
                        }}
                    >
                    {Array.isArray(children) && children.map((item, id) => <SwiperSlide key={id}>{item}</SwiperSlide>)}
                    </Slider>
                    : <NoBooksText>No books you're currently reading.</NoBooksText>
                }
            </List>
        </CollectionListBlock>
    );
};

export default CollectionList;
