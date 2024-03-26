import s from './SliderTrack.module.css';
import { SliderCard } from './SliderCard';
import playIconb from '../../../assets/images/ruinatv-icon-play-b.png';

export const SliderTrack = (props) => {
  const { data } = props || null;

  return (
    <div className={s.container}>
      {
        data.length > 1 &&
        <button className={s.prevButton}>
          <img className={s.prevButtonImg} alt='' src={playIconb} width="100%" />
        </button>
      }
      <ul className={s.itemList}>
        {
          data?.map((e) => {
            return (
              <li className={s.item} key={e.id}>
                <SliderCard
                  id={e.id}
                  title={e.title}
                  imageSlider={e.imageSlider}
                />
              </li>
            )
          })
        }
      </ul>
      {
        data.length > 1 &&
        <button className={s.nextButton}>
          <img className={s.nextButtonImg} alt='' src={playIconb} width="100%" />
        </button>
      }
    </div>
  )
}
