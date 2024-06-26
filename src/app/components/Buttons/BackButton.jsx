import s from './BackButton.module.css';
import backIcon from '../../../assets/images/svg/back-arrow-icon.svg';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetOption } from '../../../middlewares/redux/actions';
import { toTop } from '../../../functions/toTop';
import { resetBackRoute } from '../../../middlewares/redux/actions/navigation';
import { resetDetailsMedia } from '../../../middlewares/redux/actions/content';
import { resetPlayer } from '../../../middlewares/redux/actions/player';

export const BackButton = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const backRoute = useSelector(state => state.navigation?.backRoute) || '';

  function handleButton() {
    toTop();
    dispatch(resetPlayer());
    dispatch(resetOption());
    dispatch(resetBackRoute());
    dispatch(resetDetailsMedia());
    history.push(backRoute);
  };

  return (
    <button className={s.container} onClick={handleButton}>
      <img className={s.backIcon} src={backIcon} alt='Volver' width='25px' />
    </button>
  )
}
