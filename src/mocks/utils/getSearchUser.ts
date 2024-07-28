export default function getSearchUser() {
  const id = Math.floor(Math.random() * 1000000000);

  return {
    id,
    first_name: "Случайный",
    last_name: `Пользователь ${id?.toString().slice(0, 2)}`,
    username: `tguser${id?.toString().slice(0, 2)}`
  };
}
