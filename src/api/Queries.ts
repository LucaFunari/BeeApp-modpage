import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
// import { Entry } from "../../Types";
import Cookies from "js-cookie";

const BASE_URL = "https://lrjcxi6wf3.execute-api.eu-west-1.amazonaws.com/dev/";

// qxrgcclbr1

//
//

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-api-key": localStorage.getItem("ApiKey"),
  },
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

// axiosInstance.interceptors.request.use(async (config) => {
//   if (!token) {
//     const { data } = await axios.post(
//       TOKEN_ENDPOINT,

//       {
//         grant_type: "client_credentials",
//       },
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },

//         auth: {
//           username: oAuth.ClientID,
//           password: oAuth.ClientSecret,
//         },
//       }
//     );

//     token = data.access_token;
//   }
//   config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export const useEntries = (errorFN: () => void) => {
  return useQuery(["useEntries"], () => fetchEntries(), {
    retry: 0,
    onError: (e) => {
      if (e) {
        errorFN();
      }
    },
  });
};

const fetchEntries = async () => {
  const axiosResp = await axiosInstance.get("list", {}).then((res) => {
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
