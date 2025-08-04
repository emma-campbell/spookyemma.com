import { format } from "date-fns";

export type TimelineItemProps = {
  month: number;
  year: number;
  children: any[];
  isFirst?: boolean;
};

export type TimelineProps = {
  items: TimelineItemProps[];
};

const TimelineItem = ({ month, year, children, isFirst }: TimelineItemProps) => {
  const date = new Date(year, month);
  return (
    <li className="relative group ms-4 pb-8 last:pb-0">
      <div className="pl-4">
        {/* Vertical line */}
        <div className="absolute left-0 top-3 bottom-0 w-px border-l border-dashed border-gray-300 last:hidden"></div>
        
        {/* Dot */}
        <div className="absolute -start-1.5 top-1.5">
          <span className={`relative block rounded-full w-3 h-3 ${
            isFirst ? 'bg-green-500' : 'bg-gray-400'
          }`}>
            {isFirst && (
              <>
                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping"></span>
                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping animation-delay-200"></span>
              </>
            )}
          </span>
        </div>
        
        <time className="font-medium">{format(date, "MMMM y")}</time>
        <div className="space-y-4 text-sm mt-2">{children}</div>
      </div>
    </li>
  );
};

export const Timeline = ({ items }: TimelineProps) => {
  return (
    <ol className="antialiased">
      {items.map((i, index) => (
        <TimelineItem 
          key={`${i.month} ${i.year}`} 
          {...i} 
          isFirst={index === 0}
        />
      ))}
    </ol>
  );
};
