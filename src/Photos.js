import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import './Photos.css';
import PhotoItem from './PhotoItem';

export default function Photos({ data }) {
  let lengthData = data.photos.length;
  let countRemainder;
  let countBlock;
  let renderCount = 1;

  let [countClick, setClick] = useState(1);
  let [finish, setFinish] = useState(renderCount);

  if (lengthData > 8) {
    countRemainder = lengthData % 8;
    countBlock = (lengthData - countRemainder) / 8;

    if (countClick <= countBlock) {
      finish = 8 * countClick;
    } else {
      finish = lengthData;
    }
  } else if (lengthData <= 8) {
    finish = lengthData;
  }

  let [dataArr, setArr] = useState([]);

  if (dataArr.length !== 0) {
    setArr([]);
  }

  function loadingFunk() {
    setClick(countClick + 1);
    setArr([]);
    setFinish(finish);
  }

  for (let i = 0; i < finish; i++) {
    dataArr.push(
      <PhotoItem key={data.photos[i].id} img={data.photos[i].img_src} />
    );
  }

  return (
    <>
      <div className='imgWrap'>{dataArr}</div>
      <div>
        <Button variant='contained' color='primary' onClick={loadingFunk} className='btn'>
          More photos...
        </Button>
      </div>
    </>
  );
}
