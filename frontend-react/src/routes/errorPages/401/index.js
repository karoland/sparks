import React from "react";
import {Link} from "react-router-dom";

const Error401 = () => (
  <div className="gx-page-error-container">
    <div className="gx-page-error-content">
      <div className="gx-error-code gx-mb-4">401</div>
      <h2 className="gx-text-center">
        Nie masz dostępu do tej strony
      </h2>

      <p className="gx-text-center">
        <Link className="gx-btn gx-btn-primary" to="/">Idź do strony głównej</Link>
      </p>
    </div>
  </div>
);

export default Error401;
