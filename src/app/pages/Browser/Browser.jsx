import { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { BodyCss } from "../../../functions";
import { resetIdYT, resetOption } from "../../../middlewares/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getMedia, resetMedia } from "../../../middlewares/redux/actions/media";
import { getUserToken } from "../../../middlewares/helpers";
import { getFavorites } from "../../../middlewares/redux/actions/account";
import { Slider } from "../../components/Slider/Slider";
import { Visor } from "../../components/Visor/Visor";
import { Footer } from "../../utils/Footer";
import CategorySlider from "../../components/Slider/CategorySlider";

const Browser = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userToken = getUserToken();
  const mediaList = useSelector((state) => state.mediaList);
  const currentUser = useSelector((state) => state.currentUser);
  const dbCategories = useSelector((state) => state.dbCategories);
  const mediaByCategory = useSelector((state) => state.mediaByCategory);

  useEffect(() => {
    dispatch(resetOption())
  }, [dispatch])

  useEffect(() => {
    !(userToken?.length && !currentUser) ?? history.push(`/auth?token=${userToken}`);
  }, [currentUser, userToken, history])

  useEffect(() => {
    BodyCss();
    dispatch(getMedia());
    dispatch(resetIdYT());
    dispatch(resetMedia());
    dispatch(getFavorites());
    dispatch(getCategories());
  }, [dispatch, currentUser]);

  return (
    <div className="browserBody">
      <Visor />

      <Slider title={"Contenido"} data={mediaList} idCategory={-1} id={`s${-1}`} key={`s${-1}`} />

      <CategorySlider data={mediaByCategory} dbCategories={dbCategories} />

      <Footer />
    </div>
  );
};

export default Browser;
