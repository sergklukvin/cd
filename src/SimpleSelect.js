import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ServiseApi from './sw-service';
import Photos from './Photos';
import './SimpleSelect.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(1),
    width: 70,
  },
  btnPlusMinus: {
    minWidth: 30,
    width: 30,
    height: 30,
  },
  styleSpan: {
    marginLeft: 30,
    marginRight: 30,
    display: 'flex',
    alignItems: 'center',
  },
  exploreBtn: {
    width: '100%',
    marginTop: 50,
  },
}));

export default function SimpleSelect({ data }) {
  const classes = useStyles();

  const [dataCoriosity, dataOportunity, dataSpirit] = data;
  let disabledRover = true;
  let listOfRovers = [];
  let numberOfSol;
  let listOfCamSelect = [];
  let photo;

  const [valueRover, roverSet] = useState('');
  const [valueCam, setCamVal] = useState('');
  const [currentSol, setSol] = useState(0);
  const [listOfCam, setCam] = useState([]);
  const [disabledSol, disabledSolChange] = useState(true);
  const [disabledCam, disabledCamChange] = useState(true);
  const [disabledButton, setDisabledButton] = useState(true);
  const [photosComponent, setComponent] = useState('');

  if (
    dataCoriosity.length !== 0 &&
    dataOportunity.length !== 0 &&
    dataSpirit.length !== 0
  ) {
    disabledRover = false;
    data.forEach((el) =>
      listOfRovers.push(
        <MenuItem key={el.name} value={el.name}>
          {el.name}
        </MenuItem>
      )
    );
  }

  listOfCamSelect = listOfCam.map((el) => (
    <MenuItem value={el} key={el}>
      {el}
    </MenuItem>
  ));

  function handleRover(event) {
    roverSet(event.target.value);
    disabledSolChange(false);
    disabledCamChange(true);
    disabledCamChange(true);
    setDisabledButton(true);
    setCamVal('');
    setSol(0);

    switch (true) {
      case event.target.value === 'Curiosity':
        numberOfSol = dataCoriosity.max_sol;
        break;
      case event.target.value === 'Opportunity':
        numberOfSol = dataOportunity.max_sol;
        break;
      case event.target.value === 'Spirit':
        numberOfSol = dataSpirit.max_sol;
        break;
      default:
        break;  
    }
  }

  function handleSolMinus() {
    if (currentSol <= 1) {
      disabledCamChange(true);
      setDisabledButton(true);
      setSol(0);
      setCamVal('');
    } else {
      setSol(currentSol - 1);
      setCamVal('');
      setDisabledButton(true);
    }
    handleCam();
  }

  function handleSolPlus() {
    if (currentSol === numberOfSol) {
      setSol(numberOfSol);
      setCamVal('');
    } else {
      setSol(currentSol + 1);
      disabledCamChange(false);
      setDisabledButton(true);
      setCamVal('');
    }
    handleCam();
  }

  function handleCam() {
    switch (true) {
      case valueRover === 'Curiosity':
        setCam(dataCoriosity.photos[currentSol].cameras);
        break;
      case valueRover === 'Opportunity':
        setCam(dataOportunity.photos[currentSol].cameras);
        break;
      case valueRover === 'Spirit':
        setCam(dataOportunity.photos[currentSol].cameras);
        break;
      default:
        break;  
    }
  }

  function handleButton(event) {
    setCamVal(event.target.value);
    setDisabledButton(false);
  }

  let service = new ServiseApi();

  async function getF() {
    if (valueRover !== '' && currentSol !== '' && valueCam !== '') {
      await service.getPhotos(valueRover, currentSol, valueCam).then((data) => {
        photo = data;
        return photo;
      });
    }
    setComponent(<Photos data={photo} />);
  }

  return (
    <div>
      <div className='selectConvert'>
        <FormControl className={classes.formControl} disabled={disabledRover}>
          <InputLabel id='simple-select-label-rover'>Select a rover</InputLabel>
          <Select
            labelId='simple-select-label-rover'
            id='simple-select-rover'
            value={valueRover}
            onChange={handleRover}
          >
            {listOfRovers}
          </Select>
        </FormControl>
        <div className={classes.styleSpan}>
          <Button
            className={classes.btnPlusMinus}
            variant='contained'
            color='primary'
            disabled={disabledSol}
            onClick={handleSolMinus}
          >
            -
          </Button>
          <TextField
            disabled={disabledSol}
            className={classes.textField}
            type='number'
            InputProps={{
              inputProps: {
                readOnly: true,
              },
            }}
            label=' '
            value={currentSol}
          />
          <Button
            className={classes.btnPlusMinus}
            variant='contained'
            color='primary'
            disabled={disabledSol}
            onClick={handleSolPlus}
          >
            +
          </Button>
        </div>
        <FormControl className={classes.formControl} disabled={disabledCam}>
          <InputLabel id='simple-select-label-cam'>Select a сamera</InputLabel>
          <Select
            labelId='simple-select-label-cam'
            id='simple-select-cam'
            value={valueCam}
            onChange={handleButton}
          >
            {listOfCamSelect}
          </Select>
        </FormControl>
      </div>
      <div>
        <Button
          variant='contained'
          color='primary'
          disabled={disabledButton}
          className={classes.exploreBtn}
          onClick={getF}
        >
          Let's go to Mars!
        </Button>
      </div>
      {photosComponent}
    </div>
  );
}
