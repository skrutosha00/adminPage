import user1 from "@/assets/images/user1.svg";
import user2 from "@/assets/images/user2.svg";
import user3 from "@/assets/images/user3.svg";
import user4 from "@/assets/images/user4.svg";
import user5 from "@/assets/images/user5.svg";
import user6 from "@/assets/images/user6.svg";
import user7 from "@/assets/images/user7.svg";

export default function getDefaultAvatar(tgId: number): string {
  const lastDigit = +tgId.toString()[tgId.toString().length - 1];

  const indexByLastDigit = [user1, user1, user2, user2, user3, user3, user4, user5, user6, user7];

  return indexByLastDigit[lastDigit] || user1;
}
