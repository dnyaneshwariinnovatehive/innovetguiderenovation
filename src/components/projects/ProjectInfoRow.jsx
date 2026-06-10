import ProjectLevel from './ProjectLevel';
import ProjectPrice from './ProjectPrice';

export default function ProjectInfoRow({ difficulty, price }) {
  return (
    <div className="flex items-center justify-between px-1">
      <ProjectLevel difficulty={difficulty} />
      <ProjectPrice price={price} />
    </div>
  );
}