const verdictStyles: Record<string, string> = {
    'ПОДХОДИТ': 'bg-green-100 text-green-700 border-green-200',
    'ЧАСТИЧНО': 'bg-orange-100 text-orange-700 border-orange-200',
    'НЕ ПОДХОДИТ': 'bg-red-100 text-red-700 border-red-200',
    'ВСЕ': 'bg-gray-100 text-gray-700 border-gray-200'
};

const VerdictBadge = ({verdict}: { verdict: string }) => (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${verdictStyles[verdict]}`}>
    {verdict}
  </span>
);

export default VerdictBadge;
