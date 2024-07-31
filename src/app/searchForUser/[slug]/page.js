"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
//params här hämtar in värdet på slugen.
  const BlogPost = ({ params }) => {
   //  Declarar useStates´s på toppen av scriptet vilket är en vanlig habit för react devs
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
        //En async funktion för att hämta en profil efter mathcande slug värde.
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://traino.nu/php/testgetuser.php?id=${slug}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [slug]);
//En laddbar som visar användaren att sidan laddas medans frontenden hämtar data från API´n
    if (!data) {
        return <div>Loading...</div>;
    }
//Fick ständigt åldern från API´n som null så tänker att det hellre står "Couldnt get age" än null.
    let ageIsWeird = data.age;
    if (data.age === null) {
        ageIsWeird = "Couldnt get age";
    }
//Tror att det som visas här nedan inte behöver så mycket förklaring. Det är funktioner som handsas med förändringar av profilen och gör så att profile objektet uppdateras följande till användarens inputs.
    function statusTrainee() {
        setDisplayTrainerStatus("Trainee")
        setUserProfile(prevState => ({
            ...prevState,
            role: false
        }));
        console.log(userProfile);
    }

    function statusTrainer() {
        setDisplayTrainerStatus("Trainer")
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
    setUserProfile(prevState => ({
        ...prevState,
       firstname : data.firstname,
       lastname : data.lastname,
       age : data.age,
       coverimage : data.coverimage
    }));
    console.log(userProfile);
    //Här laddas profilen upp till severn
    try {
        const response = await axios.post("http://localhost:5000/", userProfile);
        console.log(response);
    } catch (error) {
        //Ifall något skulle gå snett
        console.log(error);
    }
  }


//innanför return "()" tecknerna finns all html kod för sidan
    return (
      <div className="mainContainer">
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
  //här exporteras blogPosts vilket är funktionen för denna sida
  export default BlogPost;

  