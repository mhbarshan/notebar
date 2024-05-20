import React,{useContext, useEffect} from 'react'
import Notes from './Notes';
import Spinner from './Spinner';
import userContext from '../context/notes/userContext';
function Home(props) {
  const context = useContext(userContext);
  const {user, getUser,loading} = context;
  useEffect(() => {
      getUser();
    //eslint-disable-next-line
  }, []);
  // console.log(user)
  // console.log(localStorage.getItem("token"))
  const {showAlert} = props
  const name = user.name;
  // console.log(name)
  return (
    <div className='container'>
      
    <div style={{paddingBottom:"20px"}}>
     <h5>Welcome</h5>
     {loading && <Spinner />}
    <h1>{name}</h1> 
    
    </div>

      <Notes showAlert={showAlert}/>
    </div>
  )
}

export default Home;
