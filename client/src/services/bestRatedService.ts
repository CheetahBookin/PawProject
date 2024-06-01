import axios from 'axios'

const getBestRated = async() =>{
    try {
        return await axios.get('http://localhost:5000/bestRated')
    } catch (error){
        console.log(error)
    }
}

export {getBestRated}