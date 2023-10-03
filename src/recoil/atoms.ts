import { atom } from "recoil";

export const approvedObsAtom = atom({
  key: "approvedObservation",
  default: { id: "-1", approved: true },
});
