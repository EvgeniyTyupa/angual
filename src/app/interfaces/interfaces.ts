export interface User{
    email: string,
    password: string
}

export interface AuthUser{
    _id: string,
    email: string,
    verified: boolean,
    image: string,
    exercises?: any,
    workouts?: any
}

export interface Exercise{
    _id: string,
    title: string,
    userId: string,
    measurement: string
}

export interface WorkoutExercise{
    exercise: string,
    repeats: number,
    measurement: number
}

export interface Workout{
    _id: string,
    userId: string,
    exercises: WorkoutExercise[],
    date: string
}