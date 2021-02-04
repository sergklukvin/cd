import React from 'react';

export default function Photos({ img }) {
  return (
    <div>
      <img src={img} alt='img'></img>
    </div>
  );
}
