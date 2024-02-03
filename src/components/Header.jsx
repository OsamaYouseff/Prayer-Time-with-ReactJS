/* eslint-disable react/prop-types */
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Header({ city, handleCityChange, citiesData, currentDate, currentTime }) {

  const handleCity = (event) => {
    handleCityChange(event.target.value);
  };

  return (

    <div className="p-header">

      <div className='select-city' style={{ color: "white", width: "30%" }} >
        <FormControl sx={{
          m: 1, minWidth: 80, width: "100%"
        }}>
          <InputLabel style={{ borderColor: "white" }} id="demo-simple-select-autowidth-label">المدينة</InputLabel>
          <Select
            style={{ color: "white" }}
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            onChange={handleCity}
            value={city.apiName}
            label="المدينة"
            dir='rtl'
          >
            {citiesData.map((city) => {
              return <MenuItem key={city.id} value={city.apiName}>{city.displayName}</MenuItem>
            })}
          </Select>
        </FormControl>
      </div>

      <div className='time-date'>
        <div className="city-name" style={{ fontSize: "50px" }}>{city.displayName}</div>
        <div className="current-date" >
          <div className="time">الوقت : <span className='time'>{currentTime}</span></div>
          <div className="date">{currentDate}</div>
        </div>
      </div>

    </div >
  )
}
