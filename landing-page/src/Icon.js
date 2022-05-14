import L from 'leaflet';
import robot from './assets/robot.png';

const iconPerson = new L.Icon({
    //iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Noun_Robot_1749584.svg',
    iconUrl: robot,
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(100, 100),
});

export { iconPerson };
