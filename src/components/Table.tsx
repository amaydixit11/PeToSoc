"use client"

import { useMemo, useState } from "react";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import { useDebounce } from "use-debounce";
import { Grid, GridItem } from "./Grid";
import { TableCell, TableCellProps } from "./TableCell";
import { Block, type Society } from "@/types/societies";
import { Button } from "@/components/ui/button";
// import { 
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

const MAIN_TABLE_COLUMNS = 13;
const MAIN_SOC_COLUMN_BLOCKS: Block[] = ["T", "TO", "TO", "O", "O", "O", "M", "M", "M", "C", "C", "CC", "CC"];
const EMPTY_CELL_MAP: Record<number, number> = {
  1: MAIN_TABLE_COLUMNS - 2,
  4: MAIN_TABLE_COLUMNS - 7,
  11: MAIN_TABLE_COLUMNS - 7
};
const INNER_TRANSITION_COLUMNS = 5;
const INNER_TRANSITION_GAP_COLUMN = 3;
const INNER_TRANSITION_START_ROW = 4;

const BLOCK_LABELS: Record<Block, string> = {
  T: "Technical",
  O: "Organizational",
  TO: "Technical-Organizational",
  C: "Creative",
  CC: "Creative-Cultural",
  W: "Welfare",
  M: "Management",
  S: "Sports",
};

interface TableProps {
  societies: Society[];
}

export function Table({ societies }: TableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

  const { mainSocieties, innerTransitionSocieties } = useMemo(() => ({
    mainSocieties: societies.filter((soc) => soc.block !== "W"),
    innerTransitionSocieties: societies.filter((soc) => soc.block === "W" || soc.block === "S")
  }), [societies]);

  const filteredSocieties = useMemo(() => {
    let filtered = societies;
    
    // First apply search filter
    if (debouncedQuery.length >= 3) {
      const query = debouncedQuery.toLowerCase();
      filtered = filtered.filter(society => 
        society.name.toLowerCase().includes(query) ||
        society.description.toLowerCase().includes(query) ||
        society.symbol.toLowerCase().includes(query)
      );
    }
    
    // Then apply block filter
    if (selectedBlock) {
      filtered = filtered.filter(society => society.block === selectedBlock);
    }
    
    return filtered;
  }, [societies, debouncedQuery, selectedBlock]);

  const { mainGridEntries, innerTransitionOffsets } = useMemo(() => {
    const entries: TableCellProps[] = [];
    const offsets: number[] = [];
    let index = 0;
    let column = 0;
    let row = 0;
    const remainingSocieties = [...mainSocieties];
    const innerTransitionElements = innerTransitionSocieties.length + 1;
    const innerTransitionRows = Math.ceil(innerTransitionElements / INNER_TRANSITION_COLUMNS);

    while (remainingSocieties.length > 0 || row < Math.max(7, INNER_TRANSITION_START_ROW + innerTransitionRows)) {
      if (
        row >= INNER_TRANSITION_START_ROW &&
        column === INNER_TRANSITION_GAP_COLUMN &&
        offsets.length < innerTransitionRows
      ) {
        entries.push({ type: "inner-transition" });
        offsets.push(index);

        const usedInnerRows = offsets.length;
        if (usedInnerRows < innerTransitionRows) {
          index += INNER_TRANSITION_COLUMNS;
        } else {
          index += (innerTransitionElements - 1) - INNER_TRANSITION_COLUMNS * (usedInnerRows - 1);
        }
      } else {
        index += 1;
        const block = MAIN_SOC_COLUMN_BLOCKS[column];

        if (remainingSocieties.length > 0) {
          const nextSocIndex = remainingSocieties.findIndex((soc) => soc.block === block);

          if (nextSocIndex === -1) {
            entries.push({ 
              type: "undiscovered", 
              index, 
              block, 
              invisible: debouncedQuery !== "" 
            });
          } else {
            const nextSoc = remainingSocieties.splice(nextSocIndex, 1)[0];
            entries.push({ 
              society: nextSoc, 
              index, 
              type: "society", 
              invisible: !filteredSocieties.includes(nextSoc) 
            });
          }

          if (index in EMPTY_CELL_MAP) {
            const numEmptyCells = EMPTY_CELL_MAP[index];
            entries.push(...Array(numEmptyCells).fill({ type: "empty" }));
            column += numEmptyCells;
          }
        } else {
          entries.push({ type: "empty" });
        }
      }

      column += 1;
      if (column >= MAIN_TABLE_COLUMNS) {
        column = 0;
        row += 1;
      }
    }

    return { mainGridEntries: entries, innerTransitionOffsets: offsets };
  }, [mainSocieties, innerTransitionSocieties, filteredSocieties, debouncedQuery]);

  return (
    <div className="container mx-auto p-2">
      {/* Header - More compact */}
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl font-bold text-center">Society Periodic Table</h1>
        
        {/* Search and Filters - Stacked on mobile, side by side on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
          <div className="relative lg:col-span-5">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground h-3 w-3" />
            <Command>
              <Command.Input
                value={searchQuery}
                onValueChange={setSearchQuery}
                placeholder="Search societies..."
                className="h-8 w-full pl-8 bg-background text-sm"
              />
            </Command>
          </div>

          <div className="lg:col-span-7 overflow-x-auto">
            <div className="flex gap-1">
              {Object.entries(BLOCK_LABELS).map(([block, label]) => (
                <Button
                  key={block}
                  size="sm"
                  variant={selectedBlock === block ? "default" : "outline"}
                  className="whitespace-nowrap text-xs px-1.5 py-0.5"
                  onClick={() => setSelectedBlock(selectedBlock === block ? null : block as Block)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Legend - Compact grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs bg-gray-50 p-3 rounded-lg">
          {Object.entries({
            "bg-blue-500": "Technical",
            "bg-green-500": "Organizational",
            "bg-purple-500": "Creative",
            "bg-orange-500": "Welfare"
          }).map(([color, label]) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-3 h-3 ${color} rounded-sm`}></div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Table Container - Responsive padding and scroll */}
    <div className="flex-grow bg-white shadow-sm overflow-auto mt-2">
      <div className="h-full min-w-[900px] relative">
      <div className="flex-grow bg-white shadow-sm overflow-auto mt-2">
      <div className="h-full min-w-[900px] relative">
        <div className="absolute -left-4 top-6 bottom-0 flex flex-col justify-around text-xs font-medium text-gray-500">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-[3.5rem] flex items-center">
              {i + 1}
            </div>
          ))}
        </div>

        <div className="absolute -top-4 left-0 right-0 flex justify-around text-xs font-medium text-gray-500">
          {Array.from({ length: MAIN_TABLE_COLUMNS }).map((_, i) => (
            <div key={i} className="w-[3.5rem] text-center">
              {i + 1}
            </div>
          ))}
        </div>

        <div className="pl-4 pt-4">
          <Grid options={{ numColumns: MAIN_TABLE_COLUMNS, gap: "0" }}>
            {mainGridEntries.map((props, idx) => (
              <GridItem key={idx}>
                <TableCell {...props} />
              </GridItem>
            ))}
          </Grid>
        </div>
      </div>
    </div>

          {/* Inner Transition Series - Adjusted spacing */}
          {innerTransitionSocieties.length > 0 && (
            <div className="mt-6 p-4 border-t">
              <h3 className="text-sm font-semibold mb-3">Welfare Societies</h3>
              <Grid
                options={{
                  numColumns: INNER_TRANSITION_COLUMNS,
                  gap: "0"
                }}
              >
                {innerTransitionSocieties.map((society, i) => {
                  const innerRow = Math.floor(i / INNER_TRANSITION_COLUMNS);
                  const index = 1 + innerTransitionOffsets[innerRow] + (i % INNER_TRANSITION_COLUMNS);

                  return (
                    <GridItem key={society.symbol}>
                      <TableCell
                        society={society}
                        index={index}
                        type="society"
                        invisible={!filteredSocieties.includes(society)}
                      />
                    </GridItem>
                  );
                })}
                <GridItem>
                  <TableCell type="the-unknown-soc" />
                </GridItem>
              </Grid>
            </div>
          )}
        </div>
      </div>

      {/* Stats Footer - Compact display */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>Total: {societies.length}</span>
        <span>Found: {filteredSocieties.length}</span>
      </div>
    </div>
  );
}