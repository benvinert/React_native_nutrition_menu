import AsyncStorage from "@react-native-async-storage/async-storage";
import { DAY } from "../../Utils/DateUtils";

/**
 * Check if "cookie" is expired (passed day)
 */
export const cookieIsExpired = (lastDateHasSeenTips) => {
  return new Date().getTime() - new Date(lastDateHasSeenTips).getTime() > DAY;
};

/**
 * If User Already seen tips so we move him to home page,
 * we display user tips only once per day .
 */
export const moveToHomeIfUserAlreadySeenTips = async (setMoveToHome) => {
  await AsyncStorage.getItem("lastDateHasSeenTips").then(
    (lastDateHasSeenTips) => {
      if (
        lastDateHasSeenTips == null ||
        !cookieIsExpired(lastDateHasSeenTips)
      ) {
        setMoveToHome(true);
      }
      AsyncStorage.setItem("lastDateHasSeenTips", new Date().toDateString());
    }
  );
};
