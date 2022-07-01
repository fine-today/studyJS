import { atom } from "recoil";

export const timeTableState = atom({
  key: "timeTableState",
  default: {
    mon: [{ start: 9, end: 11, name: "교양", color: "#fff", id: 1 }],
    tue: [{ start: 10, end: 13, name: "수학1", color: "#00ff00", id: 2 }],
    wed: [{ start: 12, end: 14, name: "영어", color: "#00ffff", id: 3 }],
    thu: [{ start: 13, end: 19, name: "물리", color: "#ff0000", id: 4 }],
    fri: [{ start: 9, end: 11, name: "프로그래밍", color: "#ffff00", id: 5 }],
  },
});
