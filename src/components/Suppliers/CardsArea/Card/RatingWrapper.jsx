import Rating_5Svg from './Svgs/RatingStars/Rating_5Svg'
import Rating_4Svg from './Svgs/RatingStars/Rating_4Svg'
import Rating_3Svg from './Svgs/RatingStars/Rating_3Svg'
import Rating_2Svg from './Svgs/RatingStars/Rating_2Svg'
import Rating_1Svg from './Svgs/RatingStars/Rating_1Svg'
import Rating_0Svg from './Svgs/RatingStars/Rating_0Svg'

const RatingWrapper = ({ rating }) => {
   switch (rating) {
    case 5: return <Rating_5Svg />
    case 4: return <Rating_4Svg />
    case 3: return <Rating_3Svg />
    case 2: return <Rating_2Svg />
    case 1: return <Rating_1Svg />
    case 0: return <Rating_0Svg />
   }
   
   return ''
}
export default RatingWrapper