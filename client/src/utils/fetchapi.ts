import axios, { AxiosResponse } from "axios";

export const fetchAPI = (
  method: "POST" | "GET",
  url: string,
  data: {} = {},
  resFn: (res: AxiosResponse<any, any>) => void,
  setLoading: (value: React.SetStateAction<boolean | undefined>) => void = () =>
    null
) => {
  setLoading(true);
  axios({
    method: method,
    withCredentials: true,
    url: `${process.env.REACT_APP_API_URL}/${url}`,
    data: data,
  }).then((response) => {
    setLoading(false);
    resFn(response);
  });
};
