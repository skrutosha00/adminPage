type TGetUserDBInfoResponse = {
  user_data: TFirstLineUser;
  first_line_data: TFirstLineUser[];
};

type TGetUserDBInfo = {
  id: number;
  multiplier: number;
};

type TUserDBInfo = TFirstLineUser & {
  first_line: TFirstLineUser[];
};

type TFirstLineUser = {
  id: number;
  first_name: string;
  last_name: string;
  username: string | null;
  first_line_count: number;
  structure_count: number;
  ref_bonuses_count: number;
  rank: number;
};

type TSearchUserParams = {
  q: string;
};

type TSearchUser = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
};

type TGetUserPhoto = {
  id: number;
};

type TGetTokenCountGraph = {
  stat_interval?: number;
};

type TTokenCountGraph = {
  start_date: string;
  points: {
    date: string;
    data: number;
  }[];
};

type TGetUserCountGraph = {
  bot: number;
  user_id: number;
  searchIn: "first_line" | "structure";
  stat_interval?: number;
};

type TUserCountGraph = {
  start_date: string;
  points: {
    date: string;
    data: number;
  }[];
};

type TStatistics = {
  new_players_count: number;
  public_players_count: number;
  ref_players_count: number;
  new_games_count: number;
  games: {
    [key: string]: {
      [key: string]: {
        new_count: number;
        finished_count: number;
      };
    };
  };
  total_finished_games: number;
  moves_count: number;
  payout_rod: number;
};
