import React from 'react'
import _ from 'lodash';

const Rating = ({ value, text }) => {
    return (
      <div className="rating" style={{color: "black"}}>
        {_.times(5, (i) => (
          <span key={i}>
            <i
              className={
                value >= i + 1
                  ? 'fas fa-star'
                  : value >= i + 0.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            ></i>
          </span>
        ))}
        <span> &nbsp; ${text} reviews</span>
      </div>
    );
  };

export default Rating 