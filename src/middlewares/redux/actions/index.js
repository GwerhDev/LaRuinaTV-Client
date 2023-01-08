import axios from 'axios'
import { URL_API } from '../../misc/config'
import { 
    GET_POSTS, 
    GET_INFO, 
    GET_CATEGORIAS, 
    GET_MEDIATYPE, 
    GET_MEDIAURL, 
    RESET_MEDIA, 
    NEXT_VISOR, 
    RESET_VISOR,
    OPTION,
    RESET_OPTION,
    LOGIN,
    SIGNUP
    } from '../../misc'

/*-----------------Auth----------------*/
export function getOption(e) {
    return({
        type: OPTION,
        payload: e
    })
}

export function login(email, password){
    return async function (dispatch){ 
        await axios.post(`${URL_API}/users/login`, {email, password})
        .then(res => {
            console.log("userData: ", res.data.msg)
            dispatch({
                type: LOGIN,
                payload: res.data.msg
            })
        })
        .catch((e) => {
            console.log(e);
        })
    }
}

export const signup =
  (alias, email, password) => async (dispatch) => {
    try {
        const response = await axios.post(`${URL_API}/users/signup`, {
      alias,
      email,
      password
    });
    const data = await response.data;
    return dispatch({
      type: SIGNUP,
      payload: data,
    });
    } catch (error) {
        console.log(error)
    }

};

export function resetOption() {
    return({
        type: RESET_OPTION
    })
}


/*----------------Posts----------------*/
export function getPosts() {
    return async function(dispatch) {
        await axios.get(`${URL_API}/posts/getall`)
        .then(res =>{
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        })
        .catch(e => console.log(e))
    }
}

export function getInfo(id) {
    return async function(dispatch) {
        await axios.get(`${URL_API}/posts/${id}`)
        .then(res =>{
            dispatch({
                type: GET_INFO,
                payload: res.data
            })
        })
        .catch(e => console.log(e))
    }
}

export function getCategorias(lista) {
    const listCat = []
    lista.map((e)=>{return e.categoria.map(el=>{return listCat.push(el)})})
    return {
        type: GET_CATEGORIAS,
        payload: new Set(listCat)
    }
}

export function getMediaType(mediainfo) {
    return {
        type: GET_MEDIATYPE,
        payload: mediainfo
    }
}

export function getMediaUrl(mediainfo) {
    return {
        type: GET_MEDIAURL,
        payload: mediainfo
    }
}

export function resetMedia() {
    return {
        type: RESET_MEDIA,
        payload: []
    }
}

export function getNextVisor(index){
    return {
        type: NEXT_VISOR,
        payload: index
    }
}

export function getResetVisor(){
    return {
        type: RESET_VISOR
    }
}
/*------------Filter&Search------------*/
export function loadingSearchSet(){

}

export function searchMedia(){

}

export function searchStateChange(){

}

export function totalMedia(){
    
}


/*--------------Pagination-------------*/