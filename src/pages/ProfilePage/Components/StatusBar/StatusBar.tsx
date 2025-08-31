import Status from "../../../../shared/Components/Status/Status";
import type { statusDataTypes } from "../../types/statusDataTypes";
import { statusConfig } from "../../utils/statusConfig";

const StatusBar: React.FC<{ data: statusDataTypes }> = ({ data }) => {
  const statuses = (Object.keys(statusConfig) as (keyof statusDataTypes)[])
    .map((key) => {
      const value = data[key];
      if (!value) return null;
      return statusConfig[key](value);
    })
    .filter(Boolean);

  if (!statuses.length) return null;

  return (
    <>
      <h1 className="text-black-heading text-[0.875rem] font-semibold leading-[0.75rem] mt-3 mb-2">
        Статусы
      </h1>
      <div className="flex flex-wrap gap-x-3">
        {statuses.map((item, idx) => (
          <Status key={idx} imgSrc={item!.icon} title={item!.title} />
        ))}
      </div>
    </>
  );
};

export default StatusBar;
