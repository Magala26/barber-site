import { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MultiSelectOption {
  id: number;
  name: string;
  price: string;
  durationMinutes: number;
}

interface MultiSelectDropdownProps {
  options: MultiSelectOption[];
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
  placeholder?: string;
}

export default function MultiSelectDropdown({
  options,
  selectedIds,
  onSelectionChange,
  placeholder = "Select services...",
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleOption = (id: number) => {
    const newSelection = selectedIds.includes(id)
      ? selectedIds.filter((item) => item !== id)
      : [...selectedIds, id];
    onSelectionChange(newSelection);
  };

  const handleRemoveOption = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectionChange(selectedIds.filter((item) => item !== id));
  };

  const selectedOptions = options.filter((opt) => selectedIds.includes(opt.id));
  const filteredOptions = options.filter((opt) =>
    opt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Dropdown Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-4 py-3 border-2 rounded-lg flex items-center justify-between transition",
          isOpen
            ? "border-accent bg-accent/5"
            : "border-border hover:border-accent/50 bg-background"
        )}
      >
        <div className="flex items-center gap-2 flex-1 text-left">
          {selectedIds.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedOptions.slice(0, 2).map((opt) => (
                <Badge key={opt.id} variant="secondary" className="text-xs">
                  {opt.name}
                </Badge>
              ))}
              {selectedIds.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{selectedIds.length - 2} more
                </Badge>
              )}
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-accent rounded-lg shadow-lg z-50">
          {/* Search Input */}
          <div className="p-3 border-b border-border">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              autoFocus
            />
          </div>

          {/* Options List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleToggleOption(option.id)}
                  className={cn(
                    "px-4 py-3 cursor-pointer transition flex items-center gap-3",
                    selectedIds.includes(option.id)
                      ? "bg-accent/10 border-l-4 border-accent"
                      : "hover:bg-muted/50"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(option.id)}
                    onChange={() => {}}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{option.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {option.durationMinutes} min • R{parseFloat(option.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                No services found
              </div>
            )}
          </div>

          {/* Footer Info */}
          {selectedIds.length > 0 && (
            <div className="px-4 py-3 border-t border-border bg-muted/30 text-xs font-semibold text-foreground">
              {selectedIds.length} service{selectedIds.length !== 1 ? "s" : ""} selected
            </div>
          )}
        </div>
      )}

      {/* Selected Items Display (Below Dropdown) */}
      {selectedIds.length > 0 && (
        <div className="mt-3 p-3 bg-accent/5 border border-accent/20 rounded-lg">
          <div className="flex flex-wrap gap-2">
            {selectedOptions.map((opt) => (
              <Badge
                key={opt.id}
                variant="secondary"
                className="flex items-center gap-1 pr-1"
              >
                {opt.name}
                <button
                  onClick={(e) => handleRemoveOption(opt.id, e)}
                  className="hover:text-foreground transition"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
