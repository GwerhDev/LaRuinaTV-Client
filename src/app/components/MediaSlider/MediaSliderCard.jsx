import s from './MediaSliderCard.module.css';
import FavIcon from "../Favorites/FavIcon";
import editIcon from '../../../assets/images/edit-icon.png';
import playIconN from "../../../assets/images/ruinatv-icon-play-n.png";
import deleteIcon from '../../../assets/images/delete-icon.png';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { renderDriveImage } from '../../../functions/renderDriveImage';
import { deleteMedia } from '../../../middlewares/redux/actions/admin';
import defaultBackground from '../../../assets/images/default-background.png'
import { DeleteCanvas } from '../Utils/DeleteCanvas';
import { $d } from '../../../functions';

const MediaCard = ({ data, style, keyID }) => {
  const history = useHistory();
  const currentUser = useSelector(state => state.currentUser);
  const favorites = useSelector(state => state.favorites);

  function handleRedirect(id) {
    history.push(`/view/v=${id}`);
    window.scrollTo(0, 0);
  };

  function handleEditMedia(id) {
    history.push(`/media/edit/${id}`);
    window.scrollTo(0, 0);
  };

  function handleDeleteMedia(id) {
    $d(`#deleteCanvas${id}`).style.display = 'flex';
  };

  return (
    <div className={style.sliderItems}>
      <ul className={style.sliderListaItems} id={`${keyID}-itemlist`}>
        {
          data?.map((e, i) => {
            return (
              <li value={e.id} key={i}>                
                <div className={style.sliderItem}>
                  <div
                    onClick={() => handleRedirect(e.id)}
                    className={style.media}
                    style={{ backgroundImage: `url(${renderDriveImage(e.imageSlider) ?? defaultBackground})` }}
                  />
                  <div className={style.sliderInfoCanvas}>
                    <div className={style.ulTitlesItems} onClick={() => handleRedirect(e.id)}>
                      <div style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
                        <img
                          className={style.sliderItemIconPlayN}
                          src={playIconN}
                          alt="play" />
                        <p style={{ color: 'black' }}>{e.title}</p>
                      </div>
                      {
                        currentUser && favorites?.filter(fav => fav.id === e.id).length
                          ? <FavIcon urlID={e.id} color={'red'} style={{ marginTop: '-10px' }}/>
                          : null
                      }
                    </div>
                  </div>
                  {
                    currentUser?.role === 'admin'
                    ? <>
                        <ul className={s.adminRequest}>
                          <li className={s.adminBtn}>
                            <img src={editIcon} className={s.editImg} onClick={() => handleEditMedia(e.id)} alt='edit' width='15px' />
                          </li>
                          <li className={s.adminBtn} onClick={() => handleDeleteMedia(e.id)} >
                            <img src={deleteIcon} className={s.deleteImg} alt='delete' width='15px' />
                          </li>
                        </ul>
                        <DeleteCanvas id={e.id} deleteFunction={deleteMedia}/>
                      </> 
                    : null
                  }
                </div>
              </li>
            );
          })
        };
      </ul>
    </div>
  );
};
export default MediaCard;
