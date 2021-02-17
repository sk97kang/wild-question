import { atom } from "recoil";

export const userState = atom<{
  displayName: string;
  photoURL: string;
  uid: string;
} | null>({
  key: "userState", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
