import { MAIN_USER } from "@/mocks/mockGlobalVars";
import calculateRank from "@/mocks/utils/calculateRank";

function generateRandomUser(id?: number) {
  if (id === MAIN_USER.id) {
    return MAIN_USER;
  }

  id = id ?? Math.floor(Math.random() * 1000000000);
  const firstLineCount = Math.floor(Math.random() * 10);

  return {
    id,
    first_name: "Случайный",
    last_name: `Пользователь ${id?.toString().slice(0, 2)}`,
    username: `tguser${id?.toString().slice(0, 2)}`,
    first_line_count: firstLineCount,
    structure_count: firstLineCount * 3 + 4,
    ref_bonuses_count: (Math.random() * 20).toFixed(2),
    rank: calculateRank(firstLineCount)
  };
}

export default function getUser(id: number) {
  const user = generateRandomUser(id);

  return {
    user_data: user,
    first_line_data: Array.from({ length: user.first_line_count }, generateRandomUser)
  };
}
