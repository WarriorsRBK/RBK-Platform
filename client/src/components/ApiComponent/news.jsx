import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBTooltip,
} from "mdbreact";
import "./ApiComponent.css";

const Article = (props) => {
  return (
    <div className="cardContainerfor">
      <MDBCol id="aaaaaa" lg="4" md="12" className="mb-lg-0 mb-4">
        <MDBCard wide ecommerce>
          <MDBCardImage
            cascade
            src={props.article.urlToImage}
            top
            alt="sample photo"
          />
          <MDBCardBody cascade className="text-center">
            <a className="text-muted">
              <h5>{props.article.title}</h5>
            </a>
            <MDBCardTitle>
              <strong>
                <a>{props.article.author}</a>
              </strong>
            </MDBCardTitle>
            <MDBCardText>{props.article.content}</MDBCardText>
            <MDBCardFooter className="px-1">
              <span className="float-left font-weight-bold">
                <a href={props.article.url}>Read More!!</a>
              </span>
              <span className="float-right"></span>
            </MDBCardFooter>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </div>
  );
};
export default Article;
