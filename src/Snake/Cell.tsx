enum CellType {
  Blank,
  Snake,
  Food
}

interface CellProps {
  type: CellType
}

function Cell({ type }: CellProps) {
  return (<div className={`w-8 h-8
    ${(type === CellType.Blank) ? "bg-slate-50" : ""}
    ${(type === CellType.Food) ? "bg-red-400 transition-colors duration-1000" : ""}
    ${(type === CellType.Snake) ? "bg-green-400" : ""}
    `} />);
}

export {
  CellType,
  Cell
};