"use clinet"

import React, {useState} from 'react'
import {StarIcon} from "lucide-react";

interface StarRatingProps{
    stars: number,
    setStars: React.Dispatch<React.SetStateAction<number>>
}

const StarRating = ({stars, setStars}: StarRatingProps)=>{
    //const [stars, setStars] = useState(5)

    const starfill = (num: number) =>{
        if(num<=stars){
            return 'yellow'
        }
        else{
            return '#d4d4d8'
        }
    }

    return(
        <div className="ml-auto">
            <div className="flex flex-row">
                <StarIcon
                    onClick={()=>setStars(1)}
                    onMouseEnter={()=>setStars(1)}
                    onMouseLeave={()=>setStars(stars)}
                    fill={starfill(1)}
                    className="w-6 h-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-100"
                />
                <StarIcon
                    onClick={()=>setStars(2)}
                    onMouseEnter={()=>setStars(2)}
                    onMouseLeave={()=>setStars(stars)}
                    fill={starfill(2)}
                    className="w-6 h-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-100"
                />
                <StarIcon
                    onClick={()=>setStars(3)}
                    onMouseEnter={()=>setStars(3)}
                    onMouseLeave={()=>setStars(stars)}
                    fill={starfill(3)}
                    className="w-6 h-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-100"
                />
                <StarIcon
                    onClick={()=>setStars(4)}
                    onMouseEnter={()=>setStars(4)}
                    onMouseLeave={()=>setStars(stars)}
                    fill={starfill(4)}
                    className="w-6 h-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-100"
                />
                <StarIcon
                    onClick={()=>setStars(5)}
                    onMouseEnter={()=>setStars(5)}
                    onMouseLeave={()=>setStars(stars)}
                    fill={starfill(5)}
                    className="w-6 h-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-100"
                />
            </div>
        </div>
    )
}

export default StarRating