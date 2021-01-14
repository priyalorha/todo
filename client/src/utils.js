import { getLocation } from "./api";

const  data = async(radius,latitude,longitude) => {
        radius = '15'
        const HealthHarbourList = await getLocation(radius ,latitude, longitude )
        return HealthHarbourList
        }

export default data;