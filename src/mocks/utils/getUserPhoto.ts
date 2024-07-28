import { MAIN_USER, MAIN_USER_PHOTO } from "@/mocks/mockGlobalVars";

const photoLinks = [
  "https://avatars.mds.yandex.net/i?id=86c43adca58b201de0a2d521725fdb7af396a682-10085718-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=b2249962ab9850cdbfa0c08bb873751a9570fc8c-8350569-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=5191c2c3fffba395925a606417d7d57696b85cd6-12413751-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=00caeed0a8ade30716566c25206bf18e-5875659-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=45f6abd09ce2cc11aeb6a95b84ef9106f7d242c5-10340874-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=985d9bc83a66b443f91fb928dea5a9f8bcfafcd3-12474042-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=c7b08f959d2777c9d8276618bd43200d9b8e4ed6-9849111-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=d56f7bcf47a37ec8387d1c29bf45692ecaa8aba8-10814797-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=bdb6a7314e6a2b7e07b8ed98f3d11c2bccecff45-7663734-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=6e3116cba1ef61168497c1036ab4bfdaed435dcc-8185042-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=8cb725a53d8d46a31493e68d1e46433561ff0b31-8437205-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=041889eeac4a77c1d950e20221b3d34f9b172932-8318113-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=1384ab7561f3995bc3ae21ab32e47644eba74c46-8194143-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=acbfb7d1e8bec070f86bdb2c511527cddbd430d0-4536963-images-thumbs&n=13"
];

export default function getUserPhoto(id?: number): string {
  if (id === MAIN_USER.id) {
    return MAIN_USER_PHOTO;
  }

  return photoLinks[Math.floor(Math.random() * photoLinks.length)];
}
