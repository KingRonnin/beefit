import { useState } from "react"
import axios from "axios"

const [plan_name, set_plan_name] = useState('');
const [exercises, set_exercises] = useState('');

const create_plan = async () => {
    await axios.post('api/beefit-user-exercise-plan', {
        name: plan_name,
        exercises: exercises,
    });
};

export default function MyPlanPage() {
    return (
        // <>
        // <h1 className="text2xl font-bold mb-5">
        //     My Plan
        // </h1>
        // <p className="mb-5">What is your plan today?</p>
        // </>
        <>
            <div>
                <h1>My Plan</h1>
                <input type="text"
                placeholder="Plan Name"
                value={plan_name}
                onChange={(e) => set_plan_name(e.target.value)}/>
            </div>
            <div>
                <textarea
                placeholder="Enter exercises as JSON format"
                value={exercises}
                onChange={(e) => set_exercises(e.target.value)}/>
                <button onClick={create_plan}>Create Plan</button>
            </div>
        </>
    )
}