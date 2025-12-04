import { BoardDetail } from "./types";
import { MOCK_BOARD_DETAILS } from "./mocks";

export const getBoardDetail = async (id: string): Promise<BoardDetail | null> => {
  await new Promise((r) => setTimeout(r, 200)); 

  return MOCK_BOARD_DETAILS[id] ?? null;
};
