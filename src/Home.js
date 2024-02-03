import * as React from "react";
import './Home.css';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Home() {
    return (
        <body>
            <div class="p-3 mb-2 text-white">
                <div class="row justify-content-end px-4">
                    <div class="col-auto">
                        <h4>
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <span id="swagger" className="p-1 mb-1 text-white rounded"
                                    style={{ textDecoration: 'none', backgroundColor: 'rgba(127,0,127,0.81)' }}>
                                    <i className="bi bi-link-45deg"></i>Войти
                                </span>
                            </Link>
                        </h4>
                    </div>
                </div>
                <h3 class="message p-2">
                    <span class="p-2 rounded text-white" style={{ backgroundColor: 'rgba(0,255,236,0.69)' }}>
                        Hello from Bandla system 👀
                    </span>
                </h3>
                <div className="image-container">
                    <img className="centered-image"
                        src="https://github.com/bandlauz/.github/assets/109890132/8aa4d947-9b71-45ed-b923-bce64d06df08"
                        alt="Web Designer Image" />
                </div>
                <h5>Jamoamizga Web-dizayner kerak🔎</h5>
                <h5>В нашу команду нужен Веб-дизайнер🔎</h5>
                <h5>Our team needs a Web-designer🔎</h5>
            </div>
        </body>
    );
}

export default Home;