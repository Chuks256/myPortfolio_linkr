import "../Profilestyle.css"
import chuks from "../assets/chuks.jpg"

function ProfileComponent(){
    let profile_details={
        name:"Chuks~Alexander",
        bio:"There is always hope"
    }
    return(
        <>
         <div className="profileContainer">
        <img src={chuks} alt="chuks_image" className="profile_img"/>
        <span className="img_bio">{profile_details.name}</span>
        <span className="img_bio">{profile_details.bio}</span>
    </div>
        </>
    )
}

export default ProfileComponent