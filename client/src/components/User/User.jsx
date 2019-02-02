import React from 'react';

const User = (props) => {
    const { onSaveClick, onUserChange, userName } = props;
    return (
        <div>
            <label htmlFor="userName">
                What is your name (short):
                <input name="userName" onChange={onUserChange} type="text" value={userName} />
            </label>
            <button type="button" role="presentation" onClick={onSaveClick}>Save & Continue</button>
        </div>
    );
};

export default User;
