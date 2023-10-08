import React from 'react';

function Group(props) {
    return (
        <div className="group">
            <h3>{props.groupName}</h3>
            <p>{props.groupDescription}</p>
            <ul>
                {props.groupUsers.split(',').map((user, index) => (
                    <li key={index}>{user}</li>
                ))}
            </ul>
            <p>Possible Group Meeting Times: {props.meetingTimes}</p>
            <button
                className="group-btn"
                type="submit"
                onClick={() => {
                    // Handle navigation to group page here
                }}
            >
                Go To Group Page
            </button>
            {/* Add a delete button and handle deleteGroup functionality */}
        </div>
    );
}

export default Group;
