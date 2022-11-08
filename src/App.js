import './App.css';
import Diary from './pages/Diary';
import React, { useReducer, useRef } from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom"

import Home from "./pages/Home"
import Edit from './pages/Edit'
import New from './pages/New';

const reducer = (state, action) => {
  let newState = [];
  switch(action.type){
    case 'INIT' : {
      return action.data;
    }
    case 'CREATE' :{
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE' : {
      newState = state.filter((it) => it.id !== action.targerId);
      break;
    }
    case 'EDIT' : {
      newState = state.map((it)=> 
        it.id === action.data.id? {...action.data} : it);
      break;
    }
    default : 
    return state;
  }
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {

  const dummyData = [{
    id : 1,
    emotion : 5,
    content : "집에 혼자 남아 서울에 혼자 남아 있는 시간은 외롭지만 즐거운 것이다..",
    date : 1667885136916,
  },
  {
    id : 2,
    emotion : 4,
    content : "나는 지금 리액트를 배우는 중이다! 재밌는데...?",
    date : 1667885136937,
  },
  {
    id : 3,
    emotion : 2,
    content : "오늘 저녁은 김치찜",
    date : 1667885136948,
  },
  {
    id : 4,
    emotion : 1,
    content : "강이는 너무 잘생겼다!! 눈이 정말 예쁘다 내가 좋아하는 눈이야",
    date : 1667885136959,
  },
  {
    id : 5,
    emotion : 3,
    content : "내 남자친구는 고재석..",
    date : 1667885136918,
  },

]
  const [data,dispatch] = useReducer(reducer,dummyData);

  //useRef를 통하여 id를 만든다. 
  const dataId = useRef(1);

  /* dispatch 함수 */
  //create
  const onCreate = (date, content, emotion) => {
    dispatch({type : "CREATE", 
      data : {
        date: new Date(date).getTime(),
        content,
        emotion
        },
    })
    dataId.current += 1;
  }
  //remove
  const onRemove = (targerId) => {
    dispatch({type: "REMOVE", targerId});
  }

  //edit
  const onEdit = (targerId,date, content, emotion) => {
    dispatch({type: "EDIT",
      data : {
        id : targerId,
        date : new Date(date).getTime(),
        content,
        emotion,
      },  
  })
  }


  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider 
      value={{onCreate, 
              onEdit, 
              onRemove
            }}
      >
    <BrowserRouter>
      <div className="App">
        
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/new' element={<New/>}/>
          <Route path='/edit' element={<Edit/>}/>
          <Route path='/diary/:id' element={<Diary/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
