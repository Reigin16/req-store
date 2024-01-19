import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'


function Input(props) {
  let [maxTime, setMaxTime] = useState("2")
 let index = props.index
    let submitText = (e) => {
      e.preventDefault()
      var newData = {...props.data}
      console.log(props, maxTime)
      newData[index].maxTime = maxTime
      props.setData(newData)
    }
    
    return (
      <form onSubmit={submitText}> 
      <input onChange={(e) => {setMaxTime( e.target.value)}} value={maxTime} />
      </form>
    )
}

function App() {
  

  let [data, setData] = useState([])

  useEffect(() => {
    async function dataFetch() {
    if (data == '') {
      let oldData = await fetch('https://8000-hieser21-reqstore-4fxk1tod0g7.ws-us107.gitpod.io/data').then(res => res.json())
      console.log(oldData.data.data)
      setData(oldData.data.data)
    } else {
      let res = await fetch('https://8000-hieser21-reqstore-4fxk1tod0g7.ws-us107.gitpod.io/data', {headers: {'Content-Type': "application/json"}, method: 'POST', body: JSON.stringify({data})}).then(res => res.json())
      console.log(res)
    }
  } 
    dataFetch()
  }, [data])
  return (
    <div className="App">
    <h1>Students Table</h1>
    <table>
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
        {data.map((value, key) => {
          
          return (
            <tr key={key}>
              <td>{value?.id}</td>
              <td>{value?.title}</td>
              <td>{value?.status}</td>
              <td>{value?.lastRun}</td>
              <td>{value?.maxTime !== null ? value.maxTime : (<Input index={key} data={data}  setData={setData} /> )}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);
}

export default App;
