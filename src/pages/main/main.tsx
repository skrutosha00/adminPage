import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BOT_NAMES, ROUTES } from "@/services/globalVars";
import { useActions } from "@/hooks/useActions";
import MainLayout from "@/layouts/main/main";
import FirstLine from "@/components/firstLine/firstLine";
import Header from "@/components/header/header";
import MainModal from "@/components/mainModal/mainModal";
import SearchBar from "@/components/searchBar/searchBar";
import MultiplierOptions from "@/components/multiplierOptions/multiplierOptions";
import StructureFilter from "@/components/structureFilter/structureFilter";
import { historySelector } from "@/services/selectors";
import { useAppSelector } from "@/hooks/useAppSelector";

export default function Main() {
  const { multiplier, user } = useParams();
  const { addToHistory } = useActions();
  const history = useAppSelector(historySelector());

  const navigate = useNavigate();

  useEffect(() => {
    if (!multiplier || !BOT_NAMES.includes(multiplier)) {
      navigate(`/${ROUTES.DEFAULT}`);
      return;
    }

    if (user) {
      addToHistory(+user);
    }
  }, []);

  useEffect(() => {
    const lastUser = history[history.length - 1];

    if (!multiplier || !BOT_NAMES.includes(multiplier)) {
      return;
    }

    if (lastUser) {
      navigate(`/${multiplier}/${history[history.length - 1]}`);
    } else {
      navigate(`/${multiplier}`);
    }
  }, [history]);

  return (
    <MainLayout>
      <Header />
      <MultiplierOptions />
      <StructureFilter />
      <SearchBar />
      <FirstLine />

      <MainModal />
    </MainLayout>
  );
}
