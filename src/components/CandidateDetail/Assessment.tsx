import {getCriteriaStyle} from '@/utils/criteriaMapper.ts';
import {CheckCircle2, HelpCircle} from 'lucide-react';
import {FC} from "react";
import {Candidate} from "@/types/candidate.ts";

const Assessment: FC<Pick<Candidate, 'criteria' | 'questions'>> = ({criteria, questions}) => {

    const order = {
        ok: 1,
        partial: 2,
        no: 3,
    };

   const sorted =  [...criteria].sort((a, b) => {
       return order[a[0] as keyof typeof order] -
            order[b[0] as keyof typeof order];
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white p-6 rounded-xl border shadow-sm">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="text-green-600" size={20}/> Критерии оценки
                </h2>
                <div className="flex flex-wrap gap-2">
                    {sorted.map((c, i) => (
                        <div key={i}
                             className={`px-3 py-1.5 rounded-lg border text-sm font-medium ${getCriteriaStyle(c[0])}`}>
                            {c[1]}
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white p-6 rounded-xl border shadow-sm">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <HelpCircle className="text-purple-600" size={20}/> Вопросы для интервью
                </h2>
                <ul className="space-y-2">
                    {questions.map((q, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                            <span className="font-bold text-purple-600">{i + 1}.</span> {q}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
};

export default Assessment;
