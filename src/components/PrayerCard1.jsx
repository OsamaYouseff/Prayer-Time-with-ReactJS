/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

export default function PrayerCard2({ prayerName, imgUrl, prayerTime }) {
    return (
        <Card className="prayer-card" style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}  >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="110"
                    image={imgUrl}
                    alt="green iguana"
                />
                <CardContent style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <h3 style={{ color: "white", fontSize: "25px", margin: "0px" }}>
                        {prayerName}
                    </h3>
                    <h4 style={{ color: "white", fontSize: "50px", margin: "30px" }}>
                        {prayerTime}
                    </h4>
                </CardContent>
            </CardActionArea>

        </Card >
    );
}