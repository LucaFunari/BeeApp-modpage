import axios, { AxiosError } from "axios";
import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { Entry } from "../../Types";

const BASE_URL = "https://lrjcxi6wf3.execute-api.eu-west-1.amazonaws.com/dev/";
// qxrgcclbr1
// const TEMP_URL =  "https://raw.githubusercontent.com/LucaFunari/observation/main/observation.json";

let s3Url: string | null = null;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const axiosImageInstance = axios.create();

axiosInstance.interceptors.request.use(async (config) => {
  // const ApiKeyCookie = Cookies.get("ApiKey");

  const ApiKeyCookie = sessionStorage.getItem("ApiKey");

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  config.headers = {
    "x-api-key": ApiKeyCookie,
  };
  return config;
});

axiosImageInstance.interceptors.request.use(async (config) => {
  if (!s3Url) {
    const { data } = await axiosInstance.get("signer-url");

    s3Url = data.url;
  }
  config.baseURL = s3Url!;

  return config;
});

export const useObservationsList = (errorFN: () => void) => {
  return useQuery(["useEntries"], () => fetchObservations(), {
    retry: 0,
    onError: (e) => {
      if (e) {
        errorFN();
      }
    },
  });
};

const fetchObservations = async () => {
  const axiosResp = await axiosInstance.get("list", {});

  return axiosResp;
};

export const UseEntryConfirm = () => {
  return useMutation((props: { entryID: string; confirm: boolean }) =>
    confirmEntry(props.entryID, props.confirm)
  );
};

const confirmEntry = async (entryID: string, confirm: boolean) => {
  const axiosResp = await axiosInstance.post("observation/" + entryID, {
    confirm: confirm,
  });
  return axiosResp;
};

export const DownloadImage = (path: string) => {
  return (
    useQuery(["downloadImage", path], async () => {
      const { data } = await axiosImageInstance.get(path);
      return data;
    }),
    {
      enabled: !!path,
    }
  );
};

export const useApprovedList: () => UseQueryResult<
  { data: { items: Entry[]; status: number } },
  AxiosError
> = () => {
  return useQuery(["useApproved"], async () => {
    const resp = await axiosInstance.get("list/approved");

    return resp;
  });
};

export const useExport = (mockLoadingFn?: (bool: boolean) => void) => {
  return useMutation(["useExport"], async () => {
    if (mockLoadingFn) {
      mockLoadingFn(true);
    }

    axiosInstance
      .post("export")
      .then(async (res) => {
        let fetchRes: Response;

        do {
          const abort = new AbortController();
          const req = await fetch(res.data.getUrl, {
            signal: abort.signal,
          });
          fetchRes = req;

          abort.abort();

          // window.open(fetchRes)
        } while (fetchRes.status !== 200);

        const a = document.createElement("a");

        if (fetchRes.url) {
          a.href = fetchRes.url;
          a.rel = "noreferrer noopener";
          a.target = "_blank";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
        if (fetchRes.status === 200 && mockLoadingFn) {
          mockLoadingFn(false);
        }
      })

      .catch((err) => {
        throw err;
      });
  });
};
