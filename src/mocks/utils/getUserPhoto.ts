import { MAIN_USER, MAIN_USER_PHOTO } from "@/mocks/mockGlobalVars";

export default function getUserPhoto(id?: number) {
  if (id === MAIN_USER.id) {
    return MAIN_USER_PHOTO;
  }

  return `https://picsum.photos/seed/${id?.toString()[0]}/200/200`;
}
