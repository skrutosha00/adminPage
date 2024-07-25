import { TStructureFilter } from "@/services/types";

export function sortFirstLine(a: TFirstLineUser, b: TFirstLineUser) {
  return b.rank - a.rank || b.first_line_count - a.first_line_count || b.structure_count - a.structure_count;
}

export function filterFirstLine(user: TFirstLineUser, filterOption: TStructureFilter) {
  if (filterOption === "all") {
    return true;
  } else if (filterOption === "active") {
    return user.rank > 0;
  } else if (filterOption === "inactive") {
    return user.rank === 0;
  }
}
