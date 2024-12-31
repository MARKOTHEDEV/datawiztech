import React, { useState } from 'react';

const PasswordStrengthChecker = ({handleInputChange,onFocus,onBlur,
name,id

}) => {
  const [password, setPassword] = useState('');
  const [passwordSee2,setPasswordSee2] = useState(false);

  const [requirementsMet, setRequirementsMet] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const checkPasswordStrength = (password) => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);
    const specialChar = /[@#$%^&*(),.?":{}|<>]/.test(password);

    setRequirementsMet({
      length,
      uppercase,
      lowercase,
      number,
      specialChar,
    });

    return length && uppercase && lowercase && number && specialChar;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
    if(handleInputChange){
        handleInputChange(e)
    }
  };

  return (
    <div
     >
      <div
      className="input__wrapper passinputcontainer mb-3"
      >
      <input
        // type="password"
        type={passwordSee2?'text':"password"}
        name={name}
        id={id}
        value={password}
        onChange={handlePasswordChange}
        placeholder="Enter your new password"
         className="input__field pass-input"
        //  name='password'
         onBlur={onBlur}
         onFocus={onFocus}
      />
        <label
                htmlFor="individualpassword"
                className="input__label pass-label"
              >
                Password
              </label>
              <i className={`fa-solid ${passwordSee2?'fa-eye':'fa-eye-slash'}  input__icon`}
              onClick={()=>{
                setPasswordSee2(!passwordSee2)
              }}
              ></i>
      </div>
      <ul>
        <li className={requirementsMet.length ? 'met' : 'requirement'}>
          At least 8 characters
        </li>
        <li className={requirementsMet.uppercase ? 'met' : 'requirement'}>
          At least one uppercase letter
        </li>
        <li className={requirementsMet.lowercase ? 'met' : 'requirement'}>
          At least one lowercase letter
        </li>
        <li className={requirementsMet.number ? 'met' : 'requirement'}>
          At least one number
        </li>
        <li className={requirementsMet.specialChar ? 'met' : 'requirement'}>
          At least one special character (@, #, $, etc.)
        </li>
      </ul>
      {Object.values(requirementsMet).every(Boolean) && (
        <p style={{ color: 'green' }}>Your password is strong!</p>
      )}
    </div>
  );
};

export default PasswordStrengthChecker;
