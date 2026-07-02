// Идентификатор текущего пользователя в мок-данных.
// При подключении БД заменяется на auth.uid().
export const CURRENT_USER_ID = "me";

export interface MockMember {
  id: string;
  displayName: string;
  username: string;
}

// Вымышленные участники для сид-истории чата
export const MOCK_MEMBERS: MockMember[] = [
  { id: "mock-maria", displayName: "Мария К.", username: "maria_k" },
  { id: "mock-oleg", displayName: "Олег Д.", username: "oleg_d" },
  { id: "mock-ivan", displayName: "Иван П.", username: "ivan_p" },
];

export function getMockMember(id: string): MockMember | undefined {
  return MOCK_MEMBERS.find((member) => member.id === id);
}
