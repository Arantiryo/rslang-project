import { CreateUserDto, CreateUserWordDto, UserDto } from "../interfaces/user";

const base = "https://react-rslang-be.herokuapp.com";

export const getWords = async (page: number, group: number) => {
  return getRequest(`${base}/words?page=${page}&group=${group}`);
};

export const getUserWords = async (
  userId: string,
  page: number,
  group: number,
  token: string
) => {
  const filter = JSON.stringify({
    $and: [{ page: page }, { group: group }],
  });
  const res = await fetch(
    `${base}/users/${userId}/aggregatedWords?wordsPerPage=20&filter=${filter}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return res.json();
};

export const getUserHardWords = async (
  userId: string,
  page: number,
  token: string
) => {
  const filter = JSON.stringify({
    $and: [{ "userWord.difficulty": "hard" }],
  });
  const res = await fetch(
    `${base}/users/${userId}/aggregatedWords?page=${page}&wordsPerPage=20&filter=${filter}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return res.json();
};

export const getWord = async (wordId: string) => {
  return getRequest(`${base}/words/${wordId}`);
};

export const getWordFromDictionary = async (word: string) => {
  return getRequest(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
};

export const createUser = async (user: CreateUserDto) => {
  return postRequest(`${base}/users`, user);
};

export const loginUser = async (user: UserDto) => {
  return postRequest(`${base}/signin`, user);
};

export const getUserStat = async (userId: string, token: string) => {
  const res = await fetch(`${base}/users/${userId}/statistics`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("not found");
  }
  return res.json();
};

export const updateUserStat = async <T>(
  userId: string,
  token: string,
  body: T
) => {
  const res = await fetch(`${base}/users/${userId}/statistics`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error("Bad request");
  }
  return res.json();
};

export const createUserWord = async ({
  userId,
  wordId,
  word,
  token,
}: CreateUserWordDto) => {
  return postRequest(`${base}/users/${userId}/words/${wordId}`, word, token);
};

export const deleteUserWord = async ({
  userId,
  wordId,
  token,
}: {
  userId: string;
  wordId: string;
  token: string;
}) => {
  return deleteRequest(`${base}/users/${userId}/words/${wordId}`, token);
};

const getRequest = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

const deleteRequest = async (url: string, token: string) => {
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw Error(res.status.toString());

  return res;
};

const postRequest = async <T>(url: string, body: T, token?: string) => {
  const res = await fetch(url, {
    method: "POST",
    // credentials: token ? "include" : "omit",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw Error(res.status.toString());

  return res.json();
};

export const getObjURL = async (path: string) => {
  const res = await fetch(`${base}/${path}`);
  const objBlob = await res.blob();
  const objURL = URL.createObjectURL(objBlob);
  return objURL;
};
