import { PropositionResumeData } from '../types/PropositionResumeData';

type PropositionResumeProps = {
  resumeData: PropositionResumeData;
};

export const PropositionResume = ({ resumeData }: PropositionResumeProps) => {
  return (
    <div className="p-4">
      <p className="text-sm text-gray-500 mb-2">Resumo gerado por IA:</p>
      {resumeData.resume.map((item, index) => (
        <div key={index} className="mb-4">
          <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};
