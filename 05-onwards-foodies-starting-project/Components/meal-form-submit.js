'use client'
import { use } from "react";
import { useFormStatus } from "react-dom";

export default function MealFormSubmit(){
    const {pending} = useFormStatus();
    return <button disabled={pending}>
        {pending ? 'Submitting...' : 'Share Meal'}
    </button>
}