import React from 'react';

const TwoLiner = (props) => {
    const { onSaveClick, onValueChange, yesterday, tomorrow, actions, actionType, userName } = props;
    return (
        <div>
            <h2>@{userName}</h2>
            <label>{new Date().toLocaleDateString()}</label>
            <label htmlFor="yesterday">
                Yesterday:
                <input name="yesterday" onChange={onValueChange} type="text" value={yesterday} />
            </label>
            <label htmlFor="tomorrow">
                Tomorrow:
                <input name="tomorrow" onChange={onValueChange} type="text" value={tomorrow} />
            </label>
            <label htmlFor="actions">
                Additional:
                <div>
                    <select name="actionType" value={actionType} onChange={onValueChange}>
                        <option value="action">Action</option>
                        <option value="comment">Comment</option>
                        <option value="issue">Issue</option>
                    </select>
                    <input name="actions" onChange={onValueChange} type="text" value={actions} />
                </div>
            </label>
            <button type="button" role="presentation" onClick={onSaveClick}>Save & Continue</button>
        </div>
    );
};

export default TwoLiner;
