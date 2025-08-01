export const PostType = ({ type }: { type: any }) => {
  return (
    <span className="bg-accent text-background rounded-full px-2">
      <p className="text-secondary">{type}</p>
    </span>
  );
};
