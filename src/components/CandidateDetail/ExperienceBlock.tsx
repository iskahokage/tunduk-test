import { Briefcase } from 'lucide-react';
import {FC} from "react";
import {Candidate} from "@/types/candidate.ts";

const ExperienceBlock: FC<Pick<Candidate, 'exp' | 'total_exp'>> = ({ exp, total_exp }) => (
    <section className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Briefcase className="text-blue-600" size={20} /> Опыт работы {total_exp}
        </h2>
        <div className="space-y-6">
            {[...exp].reverse().map((item, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-gray-100">
                    <div className="absolute -left-2.25 top-0 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-sm" />
                    <h4 className="font-bold text-gray-900">{item[0]} — {item[2]}</h4>
                    <p className="text-sm text-blue-600 font-medium mb-1">{item[1]}</p>
                    {item[3] && <p className="text-gray-600 text-sm leading-relaxed">{item[3]}</p>}
                </div>
            ))}
        </div>
    </section>
);
export default ExperienceBlock;
