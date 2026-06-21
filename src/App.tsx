import './App.css'
import AppRoutes from "./AppRoutes.tsx";
import {Toaster} from "sonner";

function App() {
    return (
        <>
            <Toaster position="top-right" richColors/>
            <AppRoutes/>
        </>
    )
}

export default App
