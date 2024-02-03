/* eslint-disable react/prop-types */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export default function PrayerCard({ prayerName, imgUrl, prayerTime }) {
    return (
        <Card className="prayer-card" style={{ background: "#212121", border: "1px solid rgba(255, 255, 255, 0.5), " }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={imgUrl}
            />
            <CardContent style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <h3 style={{ color: "white", fontSize: "25px", margin: "0px" }}>
                    {prayerName}
                </h3>
                <h4 style={{ color: "white", fontSize: "50px", margin: "30px" }}>
                    {prayerTime}
                </h4>
            </CardContent>

        </Card>
    );
}