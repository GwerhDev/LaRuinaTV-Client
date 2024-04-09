import s from './ContentUpdate.module.css';
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import defaultPreview from '../../../../assets/images/default-background.png';
import { $gId } from '../../../../functions';
import { toTop } from '../../../../functions/toTop';
import {
  getCategories,
  getGenres,
  getMediaById,
  getMediatypes,
} from '../../../../middlewares/redux/actions/content';
import {
  createCategory,
  createGenre,
  createMediatype,
  deleteCategory,
  deleteGenre,
  deleteMediatype,
  setContentCategories,
  setContentGenres,
  setContentMediatypes,
  setEdition,
  setInfoDetailViewer,
  updateMedia,
} from '../../../../middlewares/redux/actions/admin';
import { Checkbox } from '../AdminUtils/Checkbox';

const ContentUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dbGenres = useSelector(state => state.dbGenres);
  const dbCategories = useSelector(state => state.dbCategories);
  const dbMediatypes = useSelector(state => state.dbMediatypes);
  const infoDetailViewer = useSelector(state => state.infoDetailViewer);
  const editionActive = useSelector(state => state.navigation.editionActive);

  const [submitted, setSubmitted] = useState(false);
  const [ready, setReady] = useState(false);

  const [imgVisor, setImgVisor] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [imgSlider, setImgSlider] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newMediatype, setNewMediatype] = useState("");
  const [previewVisor, setPreviewVisor] = useState("");
  const [previewSlider, setPreviewSlider] = useState("");

  function handleInputChange(e) {
    dispatch(setInfoDetailViewer({
      ...infoDetailViewer,
      [e.target.name]: e.target.value
    }));
  };

  function handleInputVisor(e) {
    dispatch(setInfoDetailViewer({
      ...infoDetailViewer,
      imageVisor: e
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    toTop();
    setSubmitted(true);

    const formData = {
      artist: infoDetailViewer.artist,
      title: infoDetailViewer.title,
      info: infoDetailViewer.info,
      genres: infoDetailViewer.genres,
      categories: infoDetailViewer.categories,
      mediatypes: infoDetailViewer.mediatypes,
      idLinkYT: infoDetailViewer.idLinkYT,
      urlLinkWEB: infoDetailViewer.urlLinkWEB,
      idLinkSPOTY: infoDetailViewer.idLinkSPOTY,
      idLinkDRIVE: infoDetailViewer.idLinkDRIVE,
      urlLinkDOWNLOAD: infoDetailViewer.urlLinkDOWNLOAD,
      newImageVisor: imgVisor,
      newImageSlider: imgSlider,
    };

    dispatch(updateMedia(id, formData));
    setReady(true);
    return;
  };

  function resetForm() {
    dispatch(getGenres());
    dispatch(getMediatypes());
    dispatch(getCategories());
    dispatch(getMediaById(id));
    setImgVisor(infoDetailViewer?.imageVisor);
    setImgSlider(infoDetailViewer?.imageSlider);
    setPreviewVisor(infoDetailViewer?.imageVisor);
    setPreviewSlider(infoDetailViewer?.imageSlider);
    setSubmitted(false);
  };

  function closePanel() {
    $gId('edition-canvas').style.width = 0;
    dispatch(setEdition(false));
    resetForm();
  };

  useEffect(() => {
    setImgVisor(infoDetailViewer?.imageVisor);
    setImgSlider(infoDetailViewer?.imageSlider);
    setPreviewVisor(infoDetailViewer?.imageVisor);
    setPreviewSlider(infoDetailViewer?.imageSlider);
  }, [infoDetailViewer]);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getMediatypes());
    dispatch(getCategories());
    dispatch(getMediaById(id));
  }, [dispatch, id]);


  return (
    <div className={s.mainContainer}>
      {
        editionActive &&
        <>
          {
            submitted
              ?
              <div className={s.container}>
                <h1>
                  {
                    ready
                      ? "¡Contenido actualizado!"
                      : "Actualizando contenido..."
                  }
                </h1>
                {
                  ready
                    ?
                    <div className={s.actionsContainer}>
                      <button className={s.actionPrimary} onClick={resetForm}>Volver a editar</button>
                      <button className={s.actionSecondary} onClick={closePanel}>Cerrar panel</button>
                    </div>
                    :
                    <div className={s.loaderContainer}>
                      Espere un momento...
                      <div className='loader' />
                    </div>
                }
              </div>
              :
              <div className={s.updateBody}>
                <form onSubmit={handleSubmit}>
                  <div className={s.container}>
                    <h1>Actualizar Contenido</h1>
                    <section className={s.contTitleArtistDesc}>
                      <span>
                        <label>Artista</label>
                        <input
                          type="text"
                          name="artist"
                          placeholder="Nombre del intérprete"
                          value={infoDetailViewer?.artist || ''}
                          onInput={handleInputChange}
                        />
                      </span>
                      <span>
                        <label>Titulo</label>
                        <input
                          type="text"
                          name="title"
                          placeholder="Título de la publicación"
                          value={infoDetailViewer?.title || ''}
                          onInput={handleInputChange}
                        />
                      </span>
                      <span>
                        <label>Descripción</label>
                        <input
                          placeholder="Escribe una breve reseña..."
                          type="text"
                          name="info"
                          value={infoDetailViewer?.info || ''}
                          onInput={handleInputChange}
                        />
                      </span>
                    </section>
                    <section className={s.imgSlrVsr}>
                      <span>
                        <label>Imagen del Slider</label>
                        <img src={previewSlider || defaultPreview} alt="visor" height="120px" />
                        <input
                          className={s.inputBtn}
                          style={{ cursor: 'pointer' }}
                          type="file"
                          name="imageSlider"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setImgSlider(reader.result);
                              setPreviewSlider(reader.result);
                            }
                            reader.readAsDataURL(file);
                          }}
                        />
                      </span>
                      <span>
                        <label>Imagen del Visor</label>
                        <img src={previewVisor || defaultPreview} alt="visor" height="120px" />
                        <input
                          className={s.inputBtn}
                          type="file"
                          name="imageVisor"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setImgVisor(reader.result);
                              setPreviewVisor(reader.result);
                              handleInputVisor(reader.result);
                            }
                            reader.readAsDataURL(file);
                          }}
                        />
                      </span>
                    </section>

                    <h1>Detalles del contenido</h1>

                    <section className={s.contTitleArtistDesc}>
                      <span>
                        <label>Id del link de YouTube</label>
                        <input
                          type="text"
                          name="idLinkYT"
                          value={infoDetailViewer?.idLinkYT || ''}
                          placeholder='ejemplo: hMS8RtYVouc'
                          onInput={handleInputChange}
                        />
                      </span>
                      <span>
                        <label>Id del link de Spotify</label>
                        <input
                          type="text"
                          name="idLinkSPOTY"
                          value={infoDetailViewer?.idLinkSPOTY || ''}
                          placeholder='ejemplo: hMS8RtYVouc'
                          onInput={handleInputChange}
                        />
                      </span>
                      <span>
                        <label>url de la Web</label>
                        <input
                          type="text"
                          name="urlLinkWEB"
                          value={infoDetailViewer?.urlLinkWEB || ''}
                          placeholder='ejemplo: http://2girls1cup.com'
                          onInput={handleInputChange}
                        />
                      </span>
                      <span>
                        <label>Link de descarga</label>
                        <input
                          type="text"
                          name="urlLinkDOWNLOAD"
                          value={infoDetailViewer?.urlLinkDOWNLOAD || ''}
                          placeholder='ejemplo: http://2girls1cup.com'
                          onInput={handleInputChange}
                        />
                      </span>
                    </section>

                    <section className={s.checkboxes}>
                      <Checkbox
                        label={"Tipo de contenido"}
                        data={dbMediatypes}
                        newAttribute={newMediatype}
                        selector={infoDetailViewer.mediatypes}
                        setNewAttribute={setNewMediatype}
                        createFunction={createMediatype}
                        deleteFunction={deleteMediatype}
                        actionFunction={setContentMediatypes}
                      />

                      <Checkbox
                        label={"Género"}
                        selector={infoDetailViewer.genres}
                        data={dbGenres}
                        newAttribute={newGenre}
                        setNewAttribute={setNewGenre}
                        createFunction={createGenre}
                        deleteFunction={deleteGenre}
                        actionFunction={setContentGenres}
                      />

                      <Checkbox
                        label={"Categoría"}
                        data={dbCategories}
                        newAttribute={newCategory}
                        selector={infoDetailViewer.categories}
                        setNewAttribute={setNewCategory}
                        createFunction={createCategory}
                        deleteFunction={deleteCategory}
                        actionFunction={setContentCategories}
                      />

                    </section>
                    <div className={s.actionsContainer}>
                      <input type="submit" value="Actualizar" className={s.actionPrimary} />
                      <button className={s.actionSecondary} onClick={closePanel}>Cancelar</button>
                    </div>
                  </div>
                </form>
              </div>
          }
        </>
      }
    </div>
  );
};

export default ContentUpdate;
