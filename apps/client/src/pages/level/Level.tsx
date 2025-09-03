import TreeStatusCard from './components/TreeStatusCard';

const Level = () => {
  return (
    <div className="bg-secondary flex flex-col gap-[2rem] p-[1rem]">
      <TreeStatusCard acorns={0} />
      <TreeStatusCard acorns={1} />
      <TreeStatusCard acorns={2} />
      <TreeStatusCard acorns={3} />
      <TreeStatusCard acorns={4} />
      <TreeStatusCard acorns={5} />
      <TreeStatusCard acorns={6} />
      <TreeStatusCard acorns={7} />
      <TreeStatusCard acorns={987987} />
    </div>
  );
};

export default Level;
