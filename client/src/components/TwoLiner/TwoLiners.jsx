import React from 'react';

const TwoLiner = (props) => {
    const { onSaveClick, onValueChange, yesterday, tomorrow, actions, userName } = props;
    return (
        <div>
            <h2>@{userName}</h2>
            <label>{new Date().toLocaleFormat()}</label>
            <label htmlFor="yesterday">
                Testerday:
                <input name="yesterday" onChange={onValueChange} type="text" value={yesterday} />
            </label>
            <label htmlFor="tomorrow">
                Tomorrow:
                <input name="tomorrow" onChange={onValueChange} type="text" value={tomorrow} />
            </label>
            <label htmlFor="actions">
                Additional:
                <option value="">

                </option>
                <input name="actions" onChange={onValueChange} type="text" value={actions} />
            </label>
            <button type="button" role="presentation" onClick={onSaveClick}>Save & Continue</button>
        </div>
    );
};

export default TwoLiner;
