import { useState } from "react";
import { TelegramUser } from "telegram-login-button";

import i18n from "@/i18n.json";
import styles from "./graphSection.module.css";
import LineGraph from "@/components/lineGraph/lineGraph";
import GraphOptions from "@/components/graphOptions/graphOptions";
import Loader from "@/components/loader/loader";
import { useGetTokenCountGraphQuery, useGetUserCountGraphQuery } from "@/services/api/main.api";
import { langSelector, userSelector } from "@/services/selectors";
import { BOT_NAMES, MULTIPLIERS } from "@/services/globalVars";
import { useAppSelector } from "@/hooks/useAppSelector";
import formatDate from "@/utils/formatDate";

type TUserGraphParams = {
  bot: number;
  user_id: number;
  searchIn: "first_line" | "structure";
  interval: number;
};

const graphIntervals: { [key: string]: string } = {
  1: "1",
  10: "10",
  20: "20",
  30: "30"
};

const botNames = Object.fromEntries(MULTIPLIERS.map((key, index) => [key, BOT_NAMES[index]]));

export default function GraphSection() {
  const lang = useAppSelector(langSelector());
  const { id } = useAppSelector(userSelector()) as TelegramUser;

  const [tokenGraphInterval, setTokenGraphInterval] = useState(1);
  const [userGraphParams, setUserGraphParams] = useState<TUserGraphParams>({
    bot: 10,
    user_id: id,
    searchIn: "first_line",
    interval: 1
  });

  const { data: tokenGraphData, isFetching: isTokenFetching } = useGetTokenCountGraphQuery({
    stat_interval: tokenGraphInterval
  });
  const { data: userGraphData, isFetching: isUserFetching } = useGetUserCountGraphQuery({
    bot: userGraphParams.bot,
    user_id: userGraphParams.user_id,
    stat_interval: userGraphParams.interval,
    searchIn: userGraphParams.searchIn
  });

  const allDataFetched = tokenGraphData && userGraphData;

  if (!allDataFetched) {
    return (
      <div className={`${styles.loader} block`}>
        <Loader />
      </div>
    );
  }

  const viewInOptions = {
    first_line: i18n.firstLine[lang],
    structure: i18n.structure[lang]
  };

  const tokenGraphTitle = <>{i18n.tokenGraphTitle[lang]}</>;
  const tokenGraphLabels = tokenGraphData.points.map((point) => formatDate(new Date(point.date)));
  const tokenGraphDataPoints = tokenGraphData.points.map((point) => point.data);

  const userGraphTitle = <>{i18n.userGraphTitle[lang]}</>;
  const userGraphLabels = userGraphData.points.map((point) => formatDate(new Date(point.date)));
  const userGraphDataPoints = userGraphData.points.map((point) => point.data);

  return (
    <div className={styles.graphs}>
      <div className={styles.graph}>
        <LineGraph
          data={userGraphDataPoints}
          labels={userGraphLabels}
          label={i18n.userGraphTitle[lang]}
          title={userGraphTitle}
          isFetching={isUserFetching}
        />
        <GraphOptions
          title={i18n.botName[lang]}
          options={botNames}
          activeOption={userGraphParams.bot.toString()}
          clickHandler={(botName) => setUserGraphParams({ ...userGraphParams, bot: +botName })}
        />
        <GraphOptions
          title={i18n.interval[lang]}
          options={graphIntervals}
          activeOption={userGraphParams.interval.toString()}
          clickHandler={(interval) => {
            setUserGraphParams({ ...userGraphParams, interval: +interval });
          }}
        />
        <GraphOptions
          title={i18n.viewIn[lang]}
          options={viewInOptions}
          activeOption={userGraphParams.searchIn}
          clickHandler={(viewIn) => {
            setUserGraphParams({ ...userGraphParams, searchIn: viewIn as "first_line" | "structure" });
          }}
        />
      </div>

      <div className={styles.graph}>
        <LineGraph
          data={tokenGraphDataPoints}
          labels={tokenGraphLabels}
          title={tokenGraphTitle}
          label={i18n.tokenGraphTitle[lang]}
          isFetching={isTokenFetching}
        />
        <GraphOptions
          title={i18n.interval[lang]}
          options={graphIntervals}
          activeOption={tokenGraphInterval.toString()}
          clickHandler={(interval) => {
            setTokenGraphInterval(+interval);
          }}
        />
      </div>
    </div>
  );
}
