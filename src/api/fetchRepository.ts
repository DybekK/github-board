import axios from "axios";
import { GitHubData } from "./types";

const generateUrl = (name: string) =>
  `https://api.github.com/users/${name}/repos?per_page=100&sort=pushed`;

export async function fetchRepository(name: string): Promise<GitHubData[]> {
  const url = generateUrl(name);
  const { data } = await axios.get<GitHubData[]>(url);
  return data;
}
