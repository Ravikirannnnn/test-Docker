import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../../Components/Loader/Other/PageTitle'
import './Faculty.css'
import { themeContext } from '../../../Context';
import { API_URL4010, errorMessage, successMessage } from '../../../Service/ApiService';
import { toast, Toaster } from 'react-hot-toast';

export default function Faculty() {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  const [facultyList, setFacultyList] = useState([{ name: '' }]);
  const [addFaulty, setAddFaulty] = useState([])
  const [addFaulty1, setAddFaulty1] = useState('')
  const [facultyLength, setFacultyLength] = useState(0)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSchoolDetails();
  }, []);

  const getSchoolDetails = async () => {
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token)

    var raw = JSON.stringify({
      "user_id": user_id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL4010 + "get_SchoolProfile", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setAddFaulty(result.response[0]?.facalty)
        setFacultyLength(result.response[0]?.facalty.length)

      })
      .catch(error => console.log('error', error));
  }

  const updateFaculty = async () => {
    // setIsLoading(true)
    const user_id=localStorage.getItem('user_id')
    const token= localStorage.getItem('accessToken')
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+token);

    var raw = JSON.stringify({
      "user_id": user_id,
      "facalty": addFaulty1
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    // console.log("raw", raw)
    fetch(API_URL4010 + "editschlFaculty", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.status === true) {
          // setIsLoading(false)
          // ToastAndroid.show("Updated successfully..!!", ToastAndroid.SHORT);
          // navigation.replace('SchoolProfile')
          successMessage("Updated successfully..!!")
        }
        else {
          // ToastAndroid.show(result.message, ToastAndroid.SHORT);
          errorMessage(result.message)
        }
      })
      .catch(error => {
        console.log('error', error)
        // ToastAndroid.show("Network Error! Please try again.", ToastAndroid.SHORT);
        errorMessage("Network Error! Please try again.")
      });
  }


  const addAnotherFaculty = () => {
    setFacultyList([...facultyList, { id: facultyList.length + 1, name: '' }]);
  };
  
  const handleInputChange = (index, event) => {
    const updatedList = [...facultyList];
    updatedList[index] = {
      ...updatedList[index], 
      name: event.target.value 
    };
    setFacultyList(updatedList);
  };
  
  return (
    <>
    <Toaster
        toastOptions={{
          style: { backgroundColor: '#222122', color: '#fff' },
        }}
        reverseOrder={true}
      />
    
    <div>
      <PageTitle title={'Faculty'} />
    </div>
    <div>
    <div className='faculty-form-container'> 
          <div className='faculty-main-text'>
         Faculty   
          </div>
          <div className='faculty-form-content'>
            {/* <h3>Ravikiran</h3> */}
            {addFaulty?.map((faculty, index) => (
        <div className='sd-in1' key={index}>
          {`Faculty ${index + 1}`}
          <input type="text" 
          value={faculty}
          // onChange={(event) => setAddFaulty(event)}
          style={{
            backgroundColor: darkMode ? "#1C1C1E" : "rgb(255, 255, 255)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>
        </div>
                  ))}
            {/* <img loading="lazy" src={require('../../../Assets/material-symbols_delete-outline.png')} alt="" /> */}
          </div>
          <div className='sd-in2'>
          {`Faculty ${facultyLength + 1}`}
          <input type="text" 
          value={addFaulty1}
          onChange={(event) => setAddFaulty1(event.target.value)}
          style={{
            backgroundColor: darkMode ? "#1C1C1E" : "rgb(255, 255, 255)",border:'none',color: darkMode ? "#d8d8df" :  "#2C2C2E",fontSize:16
          }}/>
        </div>
          {/* <div className='faculty-form-content-2'>
            <h3>Faculty 2</h3>
            <div className='faculty-new-div'>
            <input type="file" />
            <img loading="lazy" src={require('../../../Assets/tdesign_download-1.png')} alt="" />
            </div>
          </div> */}
        </div>
        <div className='faculty-btn' onClick={updateFaculty}>Submit</div>
    </div>
    </>
  )
}
