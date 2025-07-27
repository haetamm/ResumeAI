import { Plus, Minus } from "lucide-react";
import { Button } from "../ui/button";

interface ActionButtonsProps {
  onAdd: () => void;
  onRemove: (index: number) => void;
  fieldCount: number;
}

export const ActionButtons = ({
  onAdd,
  onRemove,
  fieldCount,
}: ActionButtonsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        onClick={onAdd}
        className="text-primary"
        type="button"
      >
        <Plus className="size-4 mr-2" /> Add More
      </Button>
      <Button
        variant="outline"
        onClick={() => onRemove(0)} 
        className="text-primary"
        type="button"
        disabled={fieldCount <= 0}
      >
        <Minus className="size-4 mr-2" /> Remove
      </Button>
    </div>
  );
};
