import {List} from 'react-window';
import CandidateCard from '../CandidateCard/CandidateCard';
import {Candidate} from '@/types/candidate.ts';
import {CSSProperties, ReactElement, useEffect, useMemo, useState} from "react";


type  VirtualizerCast = (props: {
    ariaAttributes: {
        "aria-posinset": number;
        "aria-setsize": number;
        role: "listitem";
    };
    index: number;
    style: CSSProperties;
} & Props) => ReactElement | null


interface Props {
    candidates: Candidate[];
}


const CandidatesList = ({candidates}: Props) => {
    const _candidates = useMemo(() => candidates, [candidates]);


    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const listHeight = useMemo(() => windowSize.height - 340, [windowSize.height]);

    const rowHeight = useMemo(() => {
        const w = windowSize.width;
        if (w < 480) return 300;      // Mobile
        if (w < 768) return 210;      // Tablet
        return 135;                   // Desktop
    }, [windowSize.width]);
    return (
        <List
            style={{height: listHeight, scrollbarWidth: 'none', msOverflowStyle: 'none'}}
            rowComponent={CandidateCard as VirtualizerCast}
            rowCount={_candidates.length}
            rowHeight={() => rowHeight}
            rowProps={{candidates: _candidates}}
        >
        </List>
    );
};
export default CandidatesList;
