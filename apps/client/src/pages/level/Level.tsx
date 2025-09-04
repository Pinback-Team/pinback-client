import TreeStatusCard from './components/TreeStatusCard';
import LevelInfoCard from './components/LevelInfoCard';
import { Icon } from '@pinback/design-system/icons';

const Level = () => {
  return (
    <div className="bg-secondary flex flex-col gap-[2rem] p-[1rem]">
      <Icon
        name={'tooltip_1'}
        width={46}
        height={46}
        className="rounded-[0.8rem]"
      />
      <Icon
        name={'ic_plus'}
        width={46}
        height={46}
        className="rounded-[0.8rem]"
      />
      <Icon
        name={'ic_plus'}
        width={46}
        height={46}
        className="rounded-[0.8rem]"
      />
      <Icon name={'tooltip_4'} className="rounded-[0.8rem]" />
      <LevelInfoCard />
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
