import Header from "./Header";
import PrayerCard from "./PrayerCard";
import { useState, useEffect } from "react";


//// external libraries
import axios from "axios";
import "moment/dist/locale/ar-ly";
import moment from "moment";
moment.locale("ar");



export default function PrayerTimes() {

  ///// variables
  const citiesData = [
    {
      id: 1,
      displayName: "القاهرة",
      apiName: "Cairo",
    },
    {
      id: 2,
      displayName: "المنصورة ",
      apiName: "Mansoura",
    },
    {
      id: 3,
      displayName: "الاسكندرية",
      apiName: "Alexandria",
    },

  ]

  const prayersDataArr = [
    {
      key: "Fajr",
      name: "الفجر",
    },
    {
      key: "Dhuhr",
      name: "الظهر",
    },
    {
      key: "Asr",
      name: "العصر",
    },
    {
      key: "Maghrib",
      name: "المغرب",
    },
    {
      key: "Isha",
      name: "العشاء",
    },

  ]

  let [prayerIndex, setPrayerIndex] = useState(0);
  let currentDate = moment().format("dddd , Do MMM YYYY ");
  let currentTime = moment().format("hh:mm a");
  ///// variables //


  ///// States
  const [city, setCity] = useState({
    id: 1,
    displayName: "القاهرة",
    apiName: "Cairo",
  });

  const [timings, setTimings] = useState({
    "Fajr": "",
    "Dhuhr": "",
    "Asr": "",
    "Maghrib": "",
    "Isha": "",
  })

  const [remindTime, setRemindTime] = useState(null);

  ///// States //


  ///// function & events handlers
  const handleCityChange = (newCityName) => {
    const targetCity = citiesData.find(city => city.apiName === newCityName)
    setCity(targetCity);
  };

  ///// function & events handlers
  function setupNextPrayerName() {
    // const currentTimeObj = moment();
    const currentTimeObj = moment("18:51:58", "HH:mm:ss");
    ///// logic of next prayer display name
    if (currentTimeObj.isAfter(moment(timings["Fajr"], "HH:mm")) && currentTimeObj.isBefore(moment(timings["Dhuhr"], "HH:mm"))) {
      // console.log("Dhuhr");
      setPrayerIndex(1);
    } else if (currentTimeObj.isAfter(moment(timings["Dhuhr"], "HH:mm")) && currentTimeObj.isBefore(moment(timings["Asr"], "HH:mm"))) {
      // console.log("Asr");
      setPrayerIndex(2);
    }
    else if (currentTimeObj.isAfter(moment(timings["Asr"], "HH:mm")) && currentTimeObj.isBefore(moment(timings["Maghrib"], "HH:mm"))) {
      // console.log("Maghrib");
      setPrayerIndex(3);
    }
    else if (currentTimeObj.isAfter(moment(timings["Maghrib"], "HH:mm")) && currentTimeObj.isBefore(moment(timings["Isha"], "HH:mm"))) {
      // console.log("Isha");
      setPrayerIndex(4);
    } else {
      // console.log("Fajr");
      setPrayerIndex(0);
    }
  }

  const getTimes = async () => {
    const response = await
      axios(`https://api.aladhan.com/v1/timingsByCity/${currentDate}?city=${city.apiName}&country=egypt&fbclid=IwAR0D1g0U7gW-2c24FU7N7mrGfGbKW-Cp20_mzy7Mk9xIygxmshzQ4fn_pcU`)
    setTimings(response.data.data.timings)
  }

  useEffect(() => {

    setupNextPrayerName();

  }, [prayerIndex])

  useEffect(() => {
    getTimes();
  }, [city])


  useEffect(() => {
    ///// update diff time each one second
    let interval = setInterval(() => {

      ////// next prayer time logic
      const currentTimeObj = moment();


      if (currentTimeObj < 0) {
        remainingTime *= -1;
        setPrayerIndex((prayerIndex + 1) % 4)
      }

      const nextPrayerName = prayersDataArr[prayerIndex].key;
      let nextPrayerTime = timings[nextPrayerName];
      let remainingTime = null;

      ///// if next prayer is Fajr and currentTime is between isha and 12:00 am
      if (nextPrayerName === "Fajr" && (currentTimeObj.isAfter(moment(timings["Isha"], "HH:mm")) && currentTimeObj.isBefore(moment("23:59:59", "HH:mm")))) {
        ////// remainingTime in time between period (after Isha to 12:00) is special case
        ////// so, remainingTime = current time to 12:00 am + time from 12:00 am to next Fajr
        remainingTime = moment(moment("24:00:00", "HH:mm:ss").diff(currentTimeObj))
          + moment(nextPrayerTime, "HH:mm:ss").add(2, "hours");

      } else {
        remainingTime = moment(nextPrayerTime, "HH:mm:ss").diff(currentTimeObj);

      }

      if (remainingTime < 0) {
        remainingTime *= -1;
        setupNextPrayerName()
        setPrayerIndex((prayerIndex + 1) % 4)
      }

      let diffTime = moment.duration(remainingTime);

      if (diffTime.asSeconds() <= 0) {

        console.log(diffTime)
        window.location.reload();
      }

      let hours = diffTime.hours() < 10 ? "0" + diffTime.hours() : diffTime.hours();
      let mins = diffTime.minutes() < 10 ? "0" + diffTime.minutes() : diffTime.minutes();
      let sec = diffTime.seconds() < 10 ? "0" + diffTime.seconds() : diffTime.seconds();

      setRemindTime(hours + ":" + mins + ":" + sec)

    }, 1000)

    return () => {
      clearInterval(interval)
    };
  }, [timings]);


  return (
    <div className="prayer-times" >
      <Header
        handleCityChange={handleCityChange}
        city={city} setCity={setCity}
        citiesData={citiesData}
        currentDate={currentDate}
        currentTime={currentTime}
      />

      {/* /* Reminder */}
      <div className="reminder" style={{ display: "flex", flexDirection: "column", margin: "20px 0px" }}>
        <span > متبقى حتى صلاة
          <span className="next-prayer" >{prayersDataArr[prayerIndex].name}</span>
        </span>
        <span className="reminded-time">{remindTime}</span>
      </div>
      {/* == Reminder == */}

      <div className="p-body" style={{ display: "flex", justifyContent: "center", }}>
        <div className="prayer-clock">
          <PrayerCard prayerName="الفجر" imgUrl="./images/fajr-prayer.png" prayerTime={timings.Fajr} />
          <PrayerCard prayerName="الظهر" imgUrl="./images/dhhr-prayer-mosque.png" prayerTime={timings.Dhuhr} />
          <PrayerCard prayerName="العصر" imgUrl="./images/asr-prayer-mosque.png" prayerTime={timings.Asr} />
          <PrayerCard prayerName="المغرب" imgUrl="./images/sunset-prayer-mosque.png" prayerTime={timings.Maghrib} />
          <PrayerCard prayerName="العشاء" imgUrl="./images/night-prayer-mosque.png" prayerTime={timings.Isha} />
        </div>
      </div>
    </div>
  )
}

