import s from './ProfileMenu.module.css';
import profileMenuCss from '../../../functions/ProfileMenu';
import { OptionCanvas } from '../../../functions';
import { getOption } from '../../../middlewares/redux/actions';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import btnMenuTv from '../../../assets/images/ruinatv-icon-play-b.png';
import likeIcon from '../../../assets/images/like-icon.png';
import userIcon from '../../../assets/images/user-icon.png';
import adminIcon from '../../../assets/images/admin-icon.png';
import logoutIcon from '../../../assets/images/logout-icon.png';
import configIcon from '../../../assets/images/config-icon.png';
import subscriptionIcon from '../../../assets/images/subscription-icon.png';
import { logout } from '../../../functions/Logout';

export const ProfileMenu = () => {
  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const { profilePic, username, role } = currentUser;

  function onClickValue(e) {
    return (
      dispatch(getOption(e.target.value || e)),
      OptionCanvas()
    )
  };

  return (
    <div className={s.profileCont} id='profileCont'>
      <ul className={s.profileBtnCont}>
        <li className={s.profileBtnMenu} onClick={() => profileMenuCss('enter')} onMouseLeave={() => profileMenuCss('leave')}>
          <span className={s.buttonProfile}>
            <img className={s.userIcon} referrerPolicy="no-referrer" src={profilePic ? profilePic : userIcon} alt='userIcon' width='25px'/>
            <p>Hola, <span>{username ? username.substring(0, 5) + "..." : "Usuario"}</span></p>
            <img className={s.btnMenuTv} src={btnMenuTv} alt='btnMenuTv' width='8px' />
          </span>
        </li>
        <ul className={s.ulProfileOptions}>
          <li className={s.liProfileMenuDisplay}>
            <button
              id='optionProfileBtn0'
              className={s.optionProfileBtn}
              value='profile'
              onClick={(e) => onClickValue(e)}
              onMouseEnter={() => profileMenuCss('enter')}>
              <img
                className={s.imgIconProf}
                referrerPolicy="no-referrer"
                src={profilePic ? profilePic : userIcon}
                onClick={(e) => e.target.value = 'profile'}
                alt=""
              /> 
              <br/>
              PERFIL
            </button>
          </li>
          <li className={s.liProfileMenuDisplay}>
            <button
              id='optionProfileBtn2'
              className={s.optionProfileBtn}
              value='favorites'
              onClick={(e) => onClickValue(e)}
              onMouseEnter={() => profileMenuCss('enter')}>
              <img
                className={s.imgIcon}
                onClick={(e) => e.target.value = 'favorites'}
                src={likeIcon}
                alt="" /><br></br>
              MIS FAVORITOS
            </button>
          </li>
          <li>
            <button
              id='optionProfileBtn3'
              className={s.optionProfileBtn}
              value='configuration'
              onClick={(e) => onClickValue(e)}
              onMouseEnter={() => profileMenuCss('enter')}>
              <img
                className={s.imgIcon}
                onClick={(e) => e.target.value = 'configuration'}
                src={configIcon}
                alt="" /><br></br>
              CONFIGURACIÓN
            </button>
          </li>
          <li>
            <button
              id='optionProfileBtn4'
              className={s.optionProfileBtn}
              value='subscription'
              onClick={(e) => onClickValue(e)}
              onMouseEnter={() => profileMenuCss('enter')}>
              <img
                className={s.imgIcon}
                onClick={(e) => e.target.value = 'subscription'}
                src={subscriptionIcon}
                alt="" /><br></br>
              SUSCRIPCIÓN
            </button>
          </li>
          {
            role === 'admin' 
            ? <li>
                <button
                  id='optionProfileBtn5'
                  className={s.optionProfileBtn}
                  value={role === 'admin' ? 'dashboard' : 'subscription'}
                  onClick={(e) => onClickValue(e)}
                  onMouseEnter={() => profileMenuCss('enter')}>
                  <img
                    className={s.imgIcon}
                    onClick={(e) => e.target.value = 'dashboard'}
                    src={adminIcon}
                    alt="" /><br></br>
                  DASHBOARD
                </button>
              </li>
            : null
          }
          <li className={s.ulSalirBtn}>
            <button 
              id='optionProfileBtn6'
              className={s.optionProfileBtn}
              onClick={() => logout(history)}
              onMouseEnter={() => profileMenuCss('enter')}>
              <img
                className={s.imgIcon}
                src={logoutIcon}
                alt="" />
                <br/>
              SALIR
            </button>
          </li>
        </ul>
      </ul>
    </div>
  )
}
