export default function search<T extends { [k: string]: any }>(query: string, array: T[]): T[] {
  return array.filter((object) =>
    Object.values(object).some((value) => value.toString().toLowerCase().includes(query.toLowerCase()))
  );
}
