
import { useEffect } from 'react';
import './App.css';
// import axios from 'axios';
import api from './axios/api'
import { useState } from 'react';

function App() {
  const [todos,setTodos] = useState(null)

  const [inputValue, setInputValue] = useState({
    title:'',
  })

  const inputValueChangeHandle = (e) =>{
    setInputValue({title:e.target.value})
  }

  const [targetId, setTargetId] = useState('');
  const [contents, setContents] = useState('')
  //조회함수

  const fetchTodos = async ()=>{
    // const {data} = await axios.get('http://localhost:4000/todos')
    const {data} = await api.get("/todos")

    // console.log('data',data)
    setTodos(data)
  }

  //추가함수
  const onSubmitHandler = async ()=>{
    api.post("/todos",inputValue)
    // setTodos([...todos,inputValue])
    fetchTodos()
  }
  //삭제함수
  const onDeleteButtonClickHandler = async (id)=>{
    api.delete(`/todos/${id}`)
    setTodos(todos.filter((item)=>{
      return item.id !== id;
    }))
  }
  //수정함수
  const onUpdateButtonClickHandler = async()=>{
    api.patch(`/todos/${targetId}`,{
      title:contents
    })
    setTodos(todos.map(item =>{
      if(item.id == targetId){
        return {...item, title:contents}
      }else{
        return item
      }
    }))
  }
  useEffect(()=>{
    //db로부터 값을 가져올 것이다.
    fetchTodos()
  },[])
  return (
    <>
    <div>
      {/* 수정영역 */}
      <input type="text" placeholder='수정할 아이디'
        value={targetId}
        onChange={(e)=>setTargetId(e.target.value)}/>
      <input type="text" placeholder='수정할 내용'
              value={contents}
              onChange={(e)=>setContents(e.target.value)}/>
      <button onClick={onUpdateButtonClickHandler}>수정</button>
      <br/>
      <br/>
    </div>
      <div>
        {/* input 영역 */}
      <form onSubmit={(e)=>{e.preventDefault(); onSubmitHandler()}}>
        {/* form태그의 기본 속성인 새로고침을 막아주기 위해 위 이벤트를 꼭 적어줘야한다. */}
        <input type='text'
        value={inputValue.title}
        onChange={inputValueChangeHandle}/>
        <button>추가</button>
      </form>
      </div>
      <div>
        {/* data영역 */}
      {todos?.map(item=>{
        return (
        <div key={item.id}>
          {item.id} : {item.title}
          &nbsp;<button onClick={()=>onDeleteButtonClickHandler(item.id)}>삭제</button>
          </div>)
      })}
      </div>
    </>
  );
}

export default App;
