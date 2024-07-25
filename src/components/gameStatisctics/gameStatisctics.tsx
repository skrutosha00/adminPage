import styles from "./gameStatistics.module.css";
import i18n from "@/i18n.json";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useGetStatisticsQuery } from "@/services/api/main.api";
import { GAMES, MULTIPLIERS } from "@/services/globalVars";
import { langSelector } from "@/services/selectors";
import { multiplierToBot } from "@/utils/formatBotName";
import Loader from "@/components/loader/loader";

const gameIcons: { [key: number]: string } = {
  4: "🥉",
  6: "🥈",
  8: "🥇",
  10: "🔮",
  12: "🛑",
  14: "💠",
  16: "🟢",
  18: "💎",
  20: "🧘"
};

export default function GameStatistics() {
  const lang = useAppSelector(langSelector());
  const { data, isLoading } = useGetStatisticsQuery({});

  if (isLoading || !data) {
    return (
      <div className={`${styles.loader} block`}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className={styles.card}>
        <div>
          <h3 className={styles.title}>{i18n.commonStatisticsTitle[lang]}</h3>
          <div className={styles.groupsNew}>
            <div className={styles.group}>
              <span>
                {i18n.newPlayers[lang]} {data.new_players_count}
              </span>
              <span>
                {i18n.publicPlayers[lang]} {data.public_players_count}
              </span>
              <span>
                {i18n.referalPlayers[lang]} {data.ref_players_count}
              </span>
            </div>

            <div className={styles.group}>
              <span>
                {i18n.newGamesOpened[lang]} {data.new_games_count}
              </span>
              <span>
                {i18n.gamesFinished[lang]} {data.total_finished_games}
              </span>
            </div>

            <div className={styles.group}>
              <span>
                {i18n.totalMoves[lang]} {data.moves_count}
              </span>
              <span>
                {i18n.rodPayouts[lang]} {data.payout_rod}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div>
          <h3 className={styles.title}>{i18n.newGamesTitle[lang]}</h3>
          <div className={styles.groupsNew}>
            {GAMES.map((game) => (
              <div className={styles.group} key={"new" + game}>
                {MULTIPLIERS.map((multiplier) => (
                  <span key={game + "_" + multiplier}>
                    {gameIcons[game]} {i18n.newGamesText[lang]} d{game} {multiplierToBot(multiplier)} ROD:{" "}
                    {data.games[game][multiplier].new_count}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className={styles.title}>{i18n.finishedGamesTitle[lang]}</h3>
          <div className={styles.groupsFinished}>
            {GAMES.map((game) => (
              <div className={styles.group} key={"finished" + game}>
                {MULTIPLIERS.map((multiplier) => (
                  <span key={game + "_" + multiplier}>
                    {gameIcons[game]} {i18n.finishedGamesText[lang]} d{game} {multiplierToBot(multiplier)} ROD:{" "}
                    {data.games[game][multiplier].finished_count}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
