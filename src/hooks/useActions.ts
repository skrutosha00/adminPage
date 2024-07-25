import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import { userActions } from "@/services/slices/user";
import { langActions } from "@/services/slices/lang";
import { historyActions } from "@/services/slices/history";
import { structureFilterActions } from "@/services/slices/structureFilter";
import { settingsActions } from "@/services/slices/settings";

const actions = {
  ...userActions,
  ...langActions,
  ...historyActions,
  ...structureFilterActions,
  ...settingsActions
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
