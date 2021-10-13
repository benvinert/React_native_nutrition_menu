import { metaFoodsEnglish, metaFoodsHebrew } from "../../../MetaDataFoods";

/**
 * Change food file language according the first character user enter.
 */
export const changeMetaFoodAccordingLanguage = (text, setMetaFoods) => {
  console.log(text);
  if (text.length <= 1) {
    if (/[a-zA-Z]/.test(text[0])) {
      setMetaFoods(metaFoodsEnglish);
    } else {
      setMetaFoods(metaFoodsHebrew);
    }
  }
};
