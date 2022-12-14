import { useEffect, useState } from "react";
import { fetchDragons } from "../service/ApiDragons/apiService";
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Spinner from '../components/Spinner/Spinner';
import s from '../style/Dragon.module.css';


function Dragon() {
    const [dragon, setDragon] = useState([]);
    const [images, setImages] = useState([]);
    const [height, setHeight] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            fetchDragons()
            .then((data) => {
                setDragon(data);
                setHeight(data.height_w_trunk.meters);
                setImages(data.flickr_images);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error.message);
                setIsLoading(false);
            })
        }, 1500);
    }, []);


    return (
        isLoading ? <Spinner/> : <>
            <div className={s.container} key={dragon.id}>
                <h1 className={s.header}>{dragon.name}</h1>
                <div className={s.slideContainer}>
                    <Zoom scale={0.4}>
                        {images.map((each, index) => <img alt={dragon.name} key={index} style={{ width: "100%", height: "100%" }} src={each} />)}
                    </Zoom>
                </div>
                <p className={s.description}><span className={s.titleDescription}>Description: </span>{dragon.description}</p>
                <h2 className={s.title}>Additional parameters:</h2>
                <ul className={s.params}>
                    <li><span>Height_w_trunk:</span>{height} meters</li>
                    <li><span>Dry_mass_kg:</span>{dragon.dry_mass_kg} kg</li>
                    <li><span>First_flight:</span>{dragon.first_flight}</li>
                </ul>
                <div className={s.btnContainer}>
                    <a href={dragon.wikipedia} target='_blank' rel='noopener noreferrer' ><button type="submit" className={s.btn}>Wikipedia</button></a>
                </div>
            </div>
        </>
    );
};

export default Dragon;