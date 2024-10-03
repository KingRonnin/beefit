import { useState } from "react"
import axios from "axios"

export default function MyPlanPage() {
    const [plan_name, set_plan_name] = useState('');
    const [exercises, set_exercises] = useState('');

    const create_plan = async () => {
        try {
            await axios.post('/api/beefit-user-exercise-plan', {
                name: plan_name,
                exercises: exercises,
            });
            alert('Plan created');
        } catch (e) {
            console.error('Error', e);
        }
    };

    return (
        <>
            <div>
                <h1>My Plan</h1>
                <input type="text"
                placeholder="Plan Name"
                value={plan_name}
                onChange={(e) => set_plan_name(e.target.value)}/>
            </div>
            <div>
                <p>Enter exercises in JSON format</p>
                <textarea
                placeholder={`[{ "name": "Push Ups", "sets": 3, "reps": 12 }]`}
                value={exercises}
                onChange={(e) => set_exercises(e.target.value)}/>
                <button onClick={create_plan}>Create Plan</button>
            </div>
        </>
    )
}