import React from "react";
class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="homecontainer">
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
                        <a className="nav-link tm-nav-link" href="#">
                          Home <span className="sr-only">(current)</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link tm-nav-link"
                          href="services.html"
                        >
                          Log In
                        </a>
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
                  ReBootKamp is the coding bootcamp of the Middle East. Based on
                  the Hack Reactor curriculum, due to its innovative education
                  technology is able to deliver to industry in 4 months, market
                  ready software engineers experienced in the world’s favourite
                  internet programming languages.
                </p>
                <img
                  src="img/biz-oriented-1.jpg"
                  alt="Company Background Image"
                  className="img-fluid tm-mb-3"
                />
              </div>
            </section>
            <section className="col-lg-6">
              <h3 className="tm-title-gray mb-4">New Focused Strategies</h3>
              <hr className="mb-5 tm-hr" />
              <div className="tm-strategy-box mb-5">
                <img
                  src="img/strategy-1.jpg"
                  alt="Image"
                  className="img-fluid tm-strategy-img"
                />
                <div>
                  <h4 className="tm-text-primary">
                    Maecenas molestie varius ipsum
                  </h4>
                  <p className="tm-strategy-text">
                    Quisque consectetur ipsum justo, sed posuere massa pretium
                    nec. In scelerisque, odio et maximus feugiat, nisl libero
                    porta turpis, quis imperdiet odio.
                  </p>
                </div>
              </div>
              <div className="tm-strategy-box mb-5">
                <img
                  src="img/strategy-2.jpg"
                  alt="Image"
                  className="img-fluid tm-strategy-img"
                />
                <div>
                  <h4 className="tm-text-primary">
                    Etiam consequat placerat convallis
                  </h4>
                  <p className="tm-strategy-text">
                    Fusce non diam vel diam egestas accumsan quis aliquam metus.
                    Nulla porta ullamcorper mauris maximus feugiat. Donec ac
                    tincidunt dui.
                  </p>
                </div>
              </div>
              <div className="tm-strategy-box mb-5">
                <img
                  src="img/strategy-3.jpg"
                  alt="Image"
                  className="img-fluid tm-strategy-img"
                />
                <div>
                  <h4 className="tm-text-primary">
                    Aenean varius velit eu ligula
                  </h4>
                  <p className="tm-strategy-text">
                    Suspendisse gravida, ipsum a gravida euismod, metus enim
                    hendrerit ante, vel hendrerit sapien sem non nisl. Maecenas
                    tempus risus ipsum.
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className="row mb-7">
            <div className="col-lg-4 col-md-6">
              <div className="tm-bg-gray tm-box">
                <div className="text-center mb-3">
                  <i className="fas fa-cloud-sun fa-5x p-5"></i>
                </div>
                <h4 className="tm-text-primary tm-h3 mb-5">
                  Suspendisse at nunc leo
                </h4>
                <p>
                  Phasellus malesuada aliquam arcu, et ultricies metus
                  scelerisque id. Curabitur finibus ornare blandit. Donec a
                  luctus nulla. Vivamus ac felis sapien.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="tm-bg-gray tm-box">
                <div className="text-center mb-3">
                  <i className="fas fa-spa fa-5x p-5"></i>
                </div>
                <h4 className="tm-text-primary tm-h3 mb-5">
                  Etiam viverra elit vel efficitur
                </h4>
                <p>
                  Nunc ultrices imperdiet orci, a ultrices orci luctus vel.
                  Etiam consequat placerat convallis. Donec consequat
                  consectetur est, eget pretium nisl.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <img
                src="img/biz-oriented-2.jpg"
                alt="Image"
                className="img-fluid"
              />
              <div className="tm-box tm-box-s">
                <p className="tm-mb-5">
                  Suspendisse gravida, ipsum a gravida euismod, metus enim
                  hendrerit ante, vel hendrerit sapien sem non nisl. Maecenas
                  tempus risus ipsum.
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
                  <h4 className="tm-text-primary mb-5">
                    Parallax Background Section
                  </h4>
                  <p className="mb-5">
                    Suspendisse gravida, ipsum a gravida euismod, metus enim
                    hendrerit ante, vel hendrerit sapien sem non nisl. Maecenas
                    tempus risus ipsum.
                  </p>
                  <a href="contact.html" className="btn btn-primary">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="container-fluid">
          <div className="row">
            <p className="col-lg-9 col-md-8 mb-5 mb-md-0">
              Copyright &copy; 2020
              <span className="tm-text-primary">Business Oriented</span> -
              designed by
              <a
                rel="nofollow"
                target="_parent"
                href="https://templatemo.com"
                className="tm-link-primary"
              >
                TemplateMo
              </a>
            </p>
            <div className="col-lg-3 col-md-4 text-right">
              <a
                rel="nofollow"
                target="_blank"
                href="https://fb.com/templatemo"
                className="tm-social-link"
              >
                <i className="fab fa-facebook fa-2x tm-social-icon"></i>
              </a>
              <a href="https://twitter.com" className="tm-social-link">
                <i className="fab fa-twitter fa-2x tm-social-icon"></i>
              </a>
              <a href="https://linkedin.com" className="tm-social-link">
                <i className="fab fa-linkedin fa-2x tm-social-icon"></i>
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
export default Home;
