
import { useEffect, useState } from 'react';
import './App.css';
import { MdClose } from "react-icons/md";
import axios from "axios"
import Formtable from './components/Formtable';
import Search from './components/Search';

axios.defaults.baseURL = "http://localhost:8000/"




function App() {
const [addSection,setAddSesction] = useState(false)
const [editSection,setEditSection] = useState(false)
const[formData,setFormData] = useState({
  name: "",
  email: "",
  mobile: "",
})

const[formDataEdit,setFormDataEdit] = useState({
  name: "",
  email: "",
  mobile: "",
  _id :""
})

const handleOnChange = (e)=>{
  const {value,name} = e.target
  setFormData((preve)=>{
    return{
      ...preve,
      [name] : value
    }
  })
}

const [dataList,setDataList] = useState([])

const handleSubmit = async(e)=>{
  e.preventDefault()
  const data =  await axios.post("/create",formData)
  console.log(data)
  if(data.data.success){
    setAddSesction(false)
    alert(data.data.message)
    getFetchData()
  }

}

const getFetchData = async()=>{
  const data = await axios.get("/")
  console.log(data)
  if(data.data.success){
  setDataList(data.data.data)
  }
}

useEffect(()=>{
  getFetchData()
},[])

const handleDelete = async(id)=>{
  const data = await axios.delete("/delete/"+id)
  
  if(data.data.success){
    getFetchData()
    alert(data.data.message)
  }
}

const handleUpdate = async(e)=>{
    e.preventDefault()
    const data = await axios.put("/update",formDataEdit)
    if(data.data.success){
      getFetchData()
      alert(data.data.message)
    }
}

const handleEditOnChange = async(e)=>{
  const {value,name} = e.target
  setFormDataEdit((preve)=>{
    return{
      ...preve,
      [name] : value
    }
  })
}

const handleEdit = (el)=>{
  setFormDataEdit(el)
  setEditSection(true)
}

  return(
    <>
   <div className="container">
    <button className="btn btn-add" onClick={()=>setAddSesction(true)}>Add</button>
       { Formtable &&<Search handleOnChange={handleOnChange}/>}
      
     { 
     addSection &&(
      <Formtable
      handleSubmit={handleSubmit}
      handleOnChange={handleOnChange}
      handleclose= {()=>setAddSesction(false)}
      rest={formData}
      />
     )
}
{
  editSection &&(
    <Formtable
    handleSubmit={handleUpdate}
    handleOnChange={handleEditOnChange}
    handleclose= {()=>setEditSection(false)}
    rest={formDataEdit}
    />
   )
}

    <div className='tableContainer'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>
             
            </th>
          </tr>
        </thead>
        <tbody>
          {
            dataList.map((el)=>{
              return(
                <tr>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.mobile}</td>
                  <td>
                   <button className='btn btn-edit' onClick={()=>handleEdit(el)}>Edit</button>
                   <button className='btn btn-delete' onClick={()=>handleDelete(el._id)}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
           </tbody>
       </table>
    </div>
  </div>
 </>
);
}

export default App;
