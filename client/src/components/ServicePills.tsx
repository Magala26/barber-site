import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Service {
  id: number;
  name: string;
  price: string;
  durationMinutes: number;
}

interface ServicePillsProps {
  services: Service[];
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
}

export default function ServicePills({
  services,
  selectedIds,
  onSelectionChange,
}: ServicePillsProps) {
  const handleToggleService = (id: number) => {
    const newSelection = selectedIds.includes(id)
      ? selectedIds.filter((item) => item !== id)
      : [...selectedIds, id];
    onSelectionChange(newSelection);
  };

  // Split services into two columns
  const midpoint = Math.ceil(services.length / 2);
  const column1 = services.slice(0, midpoint);
  const column2 = services.slice(midpoint);

  const renderServicePill = (service: Service) => {
    const isSelected = selectedIds.includes(service.id);
    return (
      <button
        key={service.id}
        type="button"
        onClick={() => handleToggleService(service.id)}
        className={cn(
          "w-full p-4 rounded-lg border-2 transition-all duration-200 text-left",
          isSelected
            ? "border-accent bg-accent/10 shadow-md"
            : "border-border bg-background hover:border-accent/50 hover:bg-muted/30"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className="font-semibold text-sm leading-tight">{service.name}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {service.durationMinutes} min
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="font-bold text-accent text-sm">
              R{parseFloat(service.price).toFixed(2)}
            </p>
            {isSelected && (
              <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-3">
        {/* Column 1 */}
        <div className="space-y-3">
          {column1.map((service) => renderServicePill(service))}
        </div>

        {/* Column 2 */}
        <div className="space-y-3">
          {column2.map((service) => renderServicePill(service))}
        </div>
      </div>

      {/* Selected Summary */}
      {selectedIds.length > 0 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm font-semibold text-green-900">
            ✓ {selectedIds.length} service{selectedIds.length !== 1 ? "s" : ""} selected
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {selectedIds.map((id) => {
              const service = services.find((s) => s.id === id);
              return (
                <span
                  key={id}
                  className="inline-block px-3 py-1 bg-green-100 text-green-900 text-xs font-medium rounded-full"
                >
                  {service?.name}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
