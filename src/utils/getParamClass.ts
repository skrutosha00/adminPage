import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";

export default function getParamClass(param: string, value: string) {
  return `${param}${capitalizeFirstLetter(value)}`;
}
