import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

const BASE_URL = "https://lrjcxi6wf3.execute-api.eu-west-1.amazonaws.com/dev/";
// qxrgcclbr1
// const TEMP_URL =  "https://raw.githubusercontent.com/LucaFunari/observation/main/observation.json";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const ApiKeyCookie = Cookies.get("ApiKey");

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  config.headers = {
    "x-api-key": ApiKeyCookie,
  };
  return config;
});

export const useObservationsList = (errorFN: () => void) => {
  return useQuery(["useEntries"], () => fetchObservations(), {
    retry: 0,
    onError: (e) => {
      if (e) {
        console.log(e);
        errorFN();
      }
    },
  });
};

const fetchObservations = async () => {
  const axiosResp = await axiosInstance.get("list", {});

  console.log(axiosResp);
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
