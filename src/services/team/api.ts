import { BASE_URL } from "../base";
import { Team } from "./type";

const TEAM_API_URL = `${BASE_URL}/teams`;

export const TeamService = {
  async getTeams(): Promise<Team[]> {
    return await fetch(`${TEAM_API_URL}`)
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err);
      });
  },
  async getTeam(id: string): Promise<Team> {
    return await fetch(`${TEAM_API_URL}/${id}`)
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err);
      });
  },

  async updateTeam(id: string, teamData: Team): Promise<Team> {
    return await fetch(`${TEAM_API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teamData),
    })
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err);
      });
  },

  async createTeam(teamData: Team): Promise<Team> {
    return await fetch(`${TEAM_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teamData),
    })
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err);
      });
  },
  async deleteTeam(id: string): Promise<Team> {
    return await fetch(`${TEAM_API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err);
      });
  }
}