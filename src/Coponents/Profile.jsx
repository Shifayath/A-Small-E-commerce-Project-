import React, { useEffect, useState } from "react";

const Profile = () => {
    return (
        <>
            <div className="user-profile">
                <div className="user-logo-container">
                    <img
                        src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1703872909~exp=1703873509~hmac=9cd9b239fe9b293d726ecad0338daf4b76dc112cfdfbead9b9fe16e364fea882"
                        alt="User Logo"
                        className="user-logo"
                    />
                </div>
                <div className="user-info">
                    <h2 className="user-name">
                        Shifayath
                        {/* {localStorage.getItem("user").name} */}
                    </h2>
                    <p className="user-email">
                    shifayath96@gmail.com
                    {/* {localStorage.getItem("user").email} */}
                    </p>
                </div>
            </div>
        </>)
}

export default Profile;