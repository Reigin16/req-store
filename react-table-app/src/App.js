import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'


function Input(props) {
  let [maxTime, setMaxTime] = useState("")
 let index = props.index
    let submitText = async(e) => {
      e.preventDefault()
      var newData = props.data
      console.log(props, maxTime)
      newData[index] = {...newData[index], maxTime: maxTime}
      console.log(props.data)
      let data = newData
          let response = await fetch('https://8000-hieser21-reqstore-4fxk1tod0g7.ws-us107.gitpod.io/data', {
            headers: {'Content-Type': "application/json"},
            method: 'POST',
            body: JSON.stringify({data:data})
          });
          let result = await response.json();
          console.log(result);
        
    }
    
    return (
      <form onSubmit={submitText}> 
      <input className='input input-bordered' onChange={(e) => {setMaxTime( e.target.value)}} value={maxTime} />
      </form>
    )
}

function App() {
  

  let [data, setData] = useState([])

  useEffect(() => {
    async function fetchInitialData() {
      let response = await fetch('https://8000-hieser21-reqstore-4fxk1tod0g7.ws-us107.gitpod.io/');
      let oldData = await response.json();
      setData(oldData);
    }
    fetchInitialData();
  }, []); // Empty dependency array to run only once

  // Separate effect for posting data updates
  // useEffect(() => {
  //   async function postData() {
  //     if (data.length > 0) { // Check if there's data to post
  //       let response = await fetch('https://8000-hieser21-reqstore-4fxk1tod0g7.ws-us107.gitpod.io/data', {
  //         headers: {'Content-Type': "application/json"},
  //         method: 'POST',
  //         body: JSON.stringify({data})
  //       });
  //       let result = await response.json();
  //       console.log(result);
  //     }
  //   }
  //   postData();
  // }, [data]); // This will run every time `data` changes
  return (
    <div className="container mx-auto">
    <h1 className='text-center'>Groups Table</h1>
    <table className='mx-auto table table-md'>
      <thead>
        <tr>
          <th>Group ID</th>
          <th>Title</th>
          <th>Status</th>
          <th>Last Run</th>
          <th>Max Time</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? data.map((value, key) => {
          
          return (
            <tr key={key} className={(value.status == 'Banned' ? 'bg-red-800' : '')}>
              <td>{value?.id}</td>
              <td>{value?.Title}</td>
              <td>{value?.status}</td>
              <td>{value?.lastRun}</td>
              <td>{value?.maxTime == null ? (<Input index={key} data={data} setData={setData} />) : (<p>{value.maxTime}</p>)}</td>
            </tr>
          );
        }) : null}
      </tbody>
    </table>
  </div>
);
}

export default App;
