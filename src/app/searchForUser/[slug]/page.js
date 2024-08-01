"use client";


import { useState, useEffect } from 'react';
import axios from 'axios';


  const BlogPost = ({ params }) => {
    const [data, setData] = useState(null);
    const [displaytrainerStatus, setDisplayTrainerStatus] = useState("");
    const [userProfile, setUserProfile] = useState({
        firstname : "",
        lastname : "",
        coverimage : "",
        age : "",
        description : "",
        role : null
    })
    const slug = params.slug;


    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("hej");
                const response = await axios.get(`https://traino.nu/php/testgetuser.php?id=${slug}`);
           
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };


        fetchData();
    }, [slug]);


    if (!data) {
        return <div>Loading...</div>;
    }


    let ageIsWeird = data.age;
    if (data.age === null) {
        ageIsWeird = "Couldnt get age";
    }


    function statusTrainee() {
        setDisplayTrainerStatus("Trainee")
        setUserProfile(prevState => ({
            ...prevState,
            role: false
        }));
        console.log(userProfile);
    }


    function statusTrainer() {
        setDisplayTrainerStatus("Trainer");
        setUserProfile(prevState => ({
            ...prevState,
            role: true
        }));
        console.log(userProfile);
    }


    function descriptionUpdater(event){
        setUserProfile(prevState => ({
            ...prevState,
            description: event.target.value
        }));
        console.log(userProfile);
    }


   async function uploadProfile(){
    const updatedProfile = {
        ...userProfile,
        firstname: data.firstname,
        lastname: data.lastname,
        age: data.age,
        coverimage: data.coverimage
    };
    console.log(updatedProfile);


    try {
      const response = await fetch("../reciveData.php", {
            "method" : "POST",
            "headers":{
                "Content-Type": "application/json; charset=utf-8"
             },
             "body": JSON.stringify(updatedProfile)
        } );
        console.log(response.data);
    } catch (error) {
        console.error('Error uploading profile:', error);
    }
  }






  return (
      <div class="mainContainer">
        <div className="imgContainer">
        <img src={data.thumbnail}/>  
        </div>
        <h1 className="profileDescription"> Firstname : {data.firstname}</h1>
        <h2 className="profileDescription"> Lastname : {data.lastname} </h2>      
        <h2 className="profileDescription"> Age : {ageIsWeird} </h2>
       
            <textarea onChange={descriptionUpdater} value={userProfile.description} className="proileActuallDescriptionInput"></textarea>
     
        <h2 className='profileDescription' > {displaytrainerStatus} </h2>
       <div class="statusButtonsContainer">
        <button onClick={statusTrainee}  className='dropDownButton'>
       <p> Trainee</p>
       </button>
       <button onClick={statusTrainer}   className='dropDownButton'>
       <p> Trainer </p>
       </button>
       </div>
       <button className='sendDataButton' onClick={uploadProfile}> Send </button>
      </div>
    );
  };
 
  export default BlogPost;