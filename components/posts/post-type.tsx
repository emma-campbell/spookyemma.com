import { PostType as PostTypeField } from "@/lib/keystatic";

export const PostType = ({ type }: { type: PostTypeField }) => {
  const color = () => {
    switch (type) {
      case "note":
        return "bg-accent text-background";
      case "essay":
        return "bg-highlight text-background";
      case "how-to":
        return "bg-destructive text-background";
      case "micro":
        return "bg-info text-background";
      case "experiment":
        return "bg-warning text-background";
    }
  }
  return (
    <p className={`font-bold rounded-md px-1 text-md ${color()}`}>{type}</p>
  );
};
