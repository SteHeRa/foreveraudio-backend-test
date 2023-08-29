import { pool } from "../../config/database";
import { PlaylistDetailsI, CreatePlaylistRequestI, GetPlaylistsBodyI } from "../interfaces/playlists";

export default class PlaylistModel {
	/**
	 * Save new playlist into the database
	 *
	 * @param playlistDetails
	 * @returns last insert
	 */
	public async save(playlistDetails: CreatePlaylistRequestI): Promise<number> {
		try {
			const results = await pool.query(
				`
          INSERT INTO playlists
          SET datetime_created = NOW(), ?`,
				{
					title: playlistDetails.title,
					description: playlistDetails.description,
				}
			);

			return results.insertId;
		} catch (err: any) {
			throw Error("Failed to save a new playlist.");
		}
	}

	/**
	 * Get playlist details from database by playlist ID
	 * @param id
	 * @returns
	 */
	public async getPlaylistById(id: number): Promise<PlaylistDetailsI> {
		try {
			const results = await pool.query(
				`SELECT id, title, description, datetime_created FROM playlists WHERE id =? `,
				id
			);

			let formattedResults: PlaylistDetailsI[] = Object.values(
				JSON.parse(JSON.stringify(results))
			);

			return formattedResults[0];
		} catch (err: any) {
			throw Error("Failed to get a playlist by given ID value.");
		}
	}

	/**
	 * Get multiple playlist details from database with pagination
	 * @param id
	 * @returns
	 */
	public async getPlaylists({count, page}: GetPlaylistsBodyI): Promise<PlaylistDetailsI[]> {

		const offset = count * page
		const start = 1 + offset
		const end = count + offset

		try {
			const results = await pool.query(
				`SELECT id, title, description, datetime_created FROM playlists WHERE id BETWEEN ? AND ?`,
				[start, end]
			);

			let formattedResults: PlaylistDetailsI[] = Object.values(
				JSON.parse(JSON.stringify(results))
			);

			return formattedResults;
		} catch (err: any) {
			throw Error("Failed to get playlists.");
		}
	}
}
