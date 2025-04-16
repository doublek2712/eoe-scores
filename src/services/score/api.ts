import { BASE_URL } from "../base";
import { Score } from "./type";

const SCORE_API_URL = `${BASE_URL}/scores`;

export const ScoreService = {
  async getScores(): Promise<Score[]> {
    return await fetch(`${SCORE_API_URL}`)
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err);
      });
  },

  async getScoresByTeam(teamId: string): Promise<Score[]> {
    return await fetch(`${SCORE_API_URL}?team_==${teamId}`)
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err);
      });
  },

  async createScore(scoreData: Score): Promise<Score> {
    return await fetch(`${SCORE_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scoreData),
    })
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err);
      });
  },

  async updateScore(id: string, scoreData: Score): Promise<Score> {
    return await fetch(`${SCORE_API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scoreData),
    })
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(err);
      });
  },
}