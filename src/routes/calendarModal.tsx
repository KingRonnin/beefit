import React, { useState } from 'react';

type CalendarModalProps = {
    onAddEvent: (title: string) => void;
    onCancel: () => void;
};


const CalendarModal: React.FC<CalendarModalProps> = ({ onAddEvent, onCancel }) => {
    const [title, setTitle] = useState<string>('');  

    const handleSubmit = () => {
        onAddEvent(title);
        setTitle('');  
    };

    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Event Title" 
            />
            <button onClick={handleSubmit}>Add</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default CalendarModal;
