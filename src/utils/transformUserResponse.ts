export default function transformUserResponse({ user_data, first_line_data }: TGetUserDBInfoResponse) {
  return {
    ...user_data,
    first_name: user_data.first_name ?? "",
    last_name: user_data.last_name ?? "",
    first_line: first_line_data
  };
}
