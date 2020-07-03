import React from "react";
import Login from "../Login/Login.jsx";
import "./Home.css";
class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  loginForm() {
    $("#homediv").css("filter", "blur(8px)");
    $("#homediv").css("-webkit-filter", "blur(8px)");
    $("#aa1").css("display", "block");
    var span = $(".close")[0];
    span.onclick = () => {
      $("#aa1").css("display", "none");
      $("#homediv").css("filter", "");
      $("#homediv").css("-webkit-filter", "");
      $("#errorMessage").text("");
      $("#examplePassword").val("");
      $("#exampleEmail").val("");
    };
  }
  render() {
    return (
      <div id="homecontainer">
        <div id="homediv">
          <div
            id="parallax-1"
            className="parallax-window"
            data-parallax="scroll"
            data-image-src="rrr2.png"
          >
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="tm-logo">
                    <i className="fas fa-industry fa-5x mr-5"></i>
                    <span className="text-uppercase tm-logo-text">
                      RBK Platform
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tm-nav-container-outer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <nav className="navbar navbar-expand-lg" id="tm-main-nav">
                    <button
                      className="navbar-toggler toggler-example"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbar-nav"
                      aria-controls="navbar-nav"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="dark-blue-text">
                        <i className="fas fa-bars"></i>
                      </span>
                    </button>
                    <div
                      className="collapse navbar-collapse tm-nav"
                      id="navbar-nav"
                    >
                      <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                          <p className="nav-link tm-nav-link">
                            Home <span className="sr-only">(current)</span>
                          </p>
                        </li>
                        <li className="nav-item">
                          <p
                            className="nav-link tm-nav-link"
                            onClick={this.loginForm.bind(this)}
                          >
                            Log In
                          </p>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid mt-7">
            <div className="row mb-6">
              <section className="col-lg-6 mb-lg-0 mb-5">
                <div className="tm-intro">
                  <h3 className="tm-title-gray mb-4">
                    From Zero to Hero in 4 months
                  </h3>
                  <hr className="mb-5 tm-hr" />
                  <p className="mb-5">
                    ReBootKamp is the coding bootcamp of the Middle East. Based
                    on the Hack Reactor curriculum, due to its innovative
                    education technology is able to deliver to industry in 4
                    months, market ready software engineers experienced in the
                    world’s favourite internet programming languages.
                  </p>
                  <img
                    src="img/biz-oriented-1.jpg"
                    alt="Company Background Image"
                    className="img-fluid tm-mb-3"
                  />
                </div>
              </section>
              <section className="col-lg-6">
                <h3 className="tm-title-gray mb-4">
                  THE ALL IN ONE SOLUTION FOR A BETTER FUTURE !
                </h3>
                <hr className="mb-5 tm-hr" />
                <div className="tm-strategy-box mb-5">
                  <img
                    id="datastructures"
                    src="data.png"
                    alt="Image"
                    className="img-fluid tm-strategy-img"
                  />
                  <div>
                    <h4 className="tm-text-primary">Data Structures</h4>
                    <p className="tm-strategy-text">
                      Learn and understand the data structures
                    </p>
                  </div>
                </div>
                <div className="tm-strategy-box mb-5">
                  <img
                    id="frontend"
                    src="front.png"
                    alt="Image"
                    className="img-fluid tm-strategy-img"
                  />
                  <div>
                    <h4 className="tm-text-primary">Front End</h4>
                    <p className="tm-strategy-text">
                      HTML, CSS, JQuery, Ajax Request, API’s…
                    </p>
                  </div>
                </div>
                <div className="tm-strategy-box mb-5">
                  <img
                    id="frontendfram"
                    src="fram.png"
                    alt="Image"
                    className="img-fluid tm-strategy-img"
                  />
                  <div>
                    <h4 className="tm-text-primary">Front end frameworks</h4>
                    <p className="tm-strategy-text">
                      React, Angular, BackBone…
                    </p>
                  </div>
                </div>
                <div className="tm-strategy-box mb-5">
                  <img
                    id="backend"
                    src="back.png"
                    alt="Image"
                    className="img-fluid tm-strategy-img"
                  />
                  <div>
                    <h4 className="tm-text-primary">Back End</h4>
                    <p className="tm-strategy-text">
                      Servers and Node, Databases, Authentication, Deployment…
                    </p>
                  </div>
                </div>
              </section>
            </div>
            <div className="row mb-7">
              <div className="col-lg-4 col-md-6">
                <div className="tm-bg-gray tm-box">
                  <div className="text-center mb-3">
                    {/* <i className="fas fa-cloud-sun fa-5x p-5"></i> */}
                    <img
                      id="hugh"
                      src="https://k4q5g9i9.rocketcdn.me/wp-content/uploads/2019/11/Bosely-Hugh-e1470759180540.jpg"
                    ></img>
                  </div>
                  <h4 className="tm-text-primary tm-h3 mb-5">Job Placement</h4>
                  <p>
                    During your Immersive phase, you will be taught how to
                    develop your online presence and sharpen your interview
                    skills with our experienced coaches. As your graduation
                    nears, RBK will organize a career fair whereby companies
                    will gather to introduce themselves to you and explain their
                    technology and culture so you can have an idea of where
                    you’d like to apply.
                    <br /> Hugh Bosley
                    <br /> Founder, ReBootKamp
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="tm-bg-gray tm-box">
                  <div className="text-center mb-3">
                    {/* <i className="fas fa-spa fa-5x p-5"></i> */}
                    <img
                      id="daragi"
                      src="https://k4q5g9i9.rocketcdn.me/wp-content/uploads/2019/11/Lotfi-Darragi-ReBootKamp-RBK.jpg"
                    ></img>
                  </div>
                  <h4 className="tm-text-primary tm-h3 mb-5">
                    The world’s Most Advanced Coding Bootcamp, Now@Tunis
                  </h4>
                  <p>
                    By joining us, you have direct access to all the resources
                    our founding partners, Hack Reactor and Galvanize, use to
                    train software engineers in the USA, you also have exactly
                    the same diploma as an engineer trained in San Fransisco or
                    Austin. This allows you to be employable immediately , all
                    over the world, at the end of your course at RBK
                    <br />
                    Lotfi DARRAGI
                    <br />
                    CEO , ReBootKamp Tunisia
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="tm-bg-gray tm-box">
                  <div className="text-center mb-3">
                    {/* <i className="fas fa-spa fa-5x p-5"></i> */}
                    <img
                      id="curriculum"
                      src="https://k4q5g9i9.rocketcdn.me/wp-content/uploads/2020/05/laptop-graph-left3-1.png.webp"
                    ></img>
                  </div>
                  <h4 className="tm-text-primary tm-h3 mb-5">Curriculum</h4>
                  <p>
                    By Hack Reactor @ Galvanize
                    <br />
                    The main course of the Program is structured around the
                    world famous Hack Reactor curriculum which is the top coding
                    camp in the United States.at RBK, we will also work on your
                    communication, teamwork, leadership, critical thinking and
                    creativity skills. Just as importantly, we will enhance your
                    stress levels by pushing you to your maximum limit. A Sample
                    of the Principles You’ll Learn : Data structures,
                    Algorithms, jQuery, HTML/CSS, Ajax, Backbone, APIs, React,
                    NodeJS, Databases, Deployment, MEAN stack development,
                    Angular and more. Much more.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            id="parallax-2"
            className="parallax-window parallax-window-2"
            data-parallax="scroll"
            data-image-src="coder.png"
          >
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="tm-overlay tm-bg-white">
                    <h4 className="tm-text-primary mb-5">Contact Us:</h4>
                    <p className="mb-5">
                      If you want to ask about anything, to get more details
                      about the cursus, inscription and everything, you can
                      easily contact us on our e-mail.
                    </p>
                    <a className="btn btn-primary">Contact Us</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Part3 */}
          {/* Part3 */}
          <footer className="container-fluid">
            <div className="row">
              <p className="col-lg-9 col-md-8 mb-5 mb-md-0">
                Copyright &copy; 2020
                <span className="tm-text-primary">RBK Platform</span> - designed
                by
                <a rel="nofollow" target="_parent" className="tm-link-primary">
                  Warriors Team
                </a>
              </p>
              <div className="col-lg-3 col-md-4 text-right">
                <a
                  rel="nofollow"
                  target="_blank"
                  href="https://www.facebook.com/RBKTunisia/"
                  className="tm-social-link"
                >
                  <i className="fab fa-facebook fa-2x tm-social-icon"></i>
                </a>
                <a
                  href="https://twitter.com/ReBootKAMP"
                  className="tm-social-link"
                >
                  <i className="fab fa-twitter fa-2x tm-social-icon"></i>
                </a>
                {/* <a href="https://linkedin.com" className="tm-social-link">
                <i className="fab fa-linkedin fa-2x tm-social-icon"></i>
              </a> */}
              </div>
            </div>
          </footer>
        </div>
        <div id="extra">
          <div id="aa1" className="aa2">
            <div className="aa3">
              <span className="close">&times;</span>
              <Login />
            </div>
          </div>
        </div>
        ;
      </div>
    );
  }
}
export default Home;
