import {Route, Routes} from "react-router-dom";
import CandidateDetailPage from "./pages/CandidateDetailPage.tsx";
import CandidatesPage from "@/pages/CandidatesPage.tsx";


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<CandidatesPage/>}/>

            {/* Детальная страница */}
            <Route path="/candidate/:id" element={<CandidateDetailPage/>}/>

            {/* Обработка несуществующих маршрутов */}
            <Route path="*" element={<div className="p-20 text-center">Страница не найдена</div>}/>
        </Routes>
    );
};

export default AppRoutes;
