import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Entry } from "../../Types";

const TEMP_URL =
  "https://raw.githubusercontent.com/LucaFunari/observation/main/observation.json";

const BASE_URL = "https://lrjcxi6wf3.execute-api.eu-west-1.amazonaws.com/dev/";

// qxrgcclbr1

//
//

const axiosInstance = axios.create({ baseURL: TEMP_URL });

export const useEntries = () => {
  return useQuery(["useEntries"], () => fetchEntries());
};

const fetchEntries = async () => {
  const axiosResp = await axiosInstance
    .get("", {
      // headers: {
      // "x-api-key": TEMP_API_KEY,
      // },
    })
    .then((res) => {
      return res.data;
    });

  return axiosResp;
};

export const UseEntryConfirm = () => {
  useMutation((props: { entryID: string; confirm: boolean }) =>
    confirmEntry(props.entryID, props.confirm)
  );
};

const confirmEntry = async (entryID: string, confirm: boolean) => {
  const axiosResp = await axiosInstance.post(
    "observation/",
    {
      confirm: confirm,
    },
    {
      params: {
        id: entryID,
      },
    }
  );
  return axiosResp;
};
