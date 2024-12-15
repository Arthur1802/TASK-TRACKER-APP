import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyAQFBYaXfRMHPFO8q2xQFFS6gLAbqywfCA",
    authDomain: "task-tracker-e88b3.firebaseapp.com",
    projectId: "task-tracker-e88b3",
    storageBucket: "task-tracker-e88b3.appspot.com",
    databaseURL: "https://task-tracker-e88b3-default-rtdb.firebaseio.com",
    messagingSenderId: "811480553328",
    appId: "1:811480553328:web:730a95f0c062e3d7f361b5",
    measurementId: "G-V5WR367MP4",
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
const auth = getAuth(app)
const db = getDatabase(app)

export { app, auth, db }