
import { useTrainingStore } from '../../store/trainingStore';
import { ModuleCard } from './ModuleCard';

export function ModuleList() {
  const { modules, setSelectedModule } = useTrainingStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module) => (
        <ModuleCard
          key={module.id}
          module={module}
          onClick={setSelectedModule}
        />
      ))}
    </div>
  );
}