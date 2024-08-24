export const HTTPheaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

interface HTTPParamType {
  credentials: RequestCredentials | undefined;
  mode: RequestMode | undefined;
}

export const HTTPParams: HTTPParamType = {
  credentials: "include",
  mode: "cors",
};

type ApiMethod = "GET" | "DELETE" | "PUT" | "POST";

export const apiCall = async (
  path: string,
  method: ApiMethod,
  params: object,
  onSuccess: (value: any) => void,
  onError: (string: any) => void
) => {
  const options: any = {
    ...HTTPParams,
    method,
    headers: HTTPheaders,
  };

  if ((method === "POST" || method === "PUT") && params) {
    options.body = JSON.stringify(params);
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URI}/${path}`,
    options
  );
  if (res.ok) {
    onSuccess(await res.json());
  } else {
    const { error } = await res.json();
    onError(error);
  }
};
