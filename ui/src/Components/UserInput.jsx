import React, {useState} from 'react';
import styled from "styled-components";
import { CloseRounded, Visibility, VisibilityOff } from "@mui/icons-material";



const InputDiv = styled.div`
display: flex;
width: 100%;
flex-direction: column;
align-items: center;
`;

const UserInput = (props) => {
    const {name, Placeholder, value, handleChange, password} = props;
    const [showPassword, setShowPassword] = useState(false);

  return ( 

    <InputDiv>
    <label style={{color:"black", width:"100%", top:"10px"}}>{name}</label>
    <div style={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center", gap:"10px"}}>
    <input value={value} onChange={(e) => handleChange(e)} placeholder={Placeholder} 
            id={name} 
            type={password && !showPassword ? "password" : "text"} 
            style={{backgroundColor: "inherit", 
                    borderRadius: "6px", 
                    border: "2px solid black",
                    height: "30px",
                    width: "90%", 
                    color: "black",
            }}>
    </input>
    {password && (
          <>
            {showPassword ? (
              <>
                <Visibility sx={{color:"black", cursor: "pointer"}} onClick={() => setShowPassword(false)} />
              </>
            ) : (
              <>
                <VisibilityOff sx={{color:"black" , cursor: "pointer" }} onClick={() => setShowPassword(true)} />
              </>
            )}
          </>
        )}
        </div>
</InputDiv>
  )
}

export default UserInput