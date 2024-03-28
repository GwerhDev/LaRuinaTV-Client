import s from './Request.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetOption } from '../../../../middlewares/redux/actions';


export const Request = (props) => {
  const { title, route, icon } = props;
  const dispatch = useDispatch();

  function handleOption() {
    return dispatch(resetOption());
  }

  return (
    <div className={s.reqContainer}>
      <Link to={route}>
        <button className={s.crearPost} onClick={handleOption}>
          <img src={icon} alt="" />
          {title}
        </button>
      </Link>
    </div>
  )
}