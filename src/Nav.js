import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default ({ goToPrev, goToNext, page }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => goToPrev()}
            disabled={page <= 1}
          >
            <i className="fas fa-chevron-left"></i> Previous
          </button>
        </li>
        <li className="page-item disabled">
          <span className="page-link">{page}</span>
        </li>
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => goToNext()}
          >
            Next <i className="fas fa-chevron-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};
