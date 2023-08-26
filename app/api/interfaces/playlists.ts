/**
 * Interface for create playlist details object
 */
export interface CreatePlaylistRequestI {
	title: string;
	description: string;
}

/**
 * Interface for get playlist by id object
 */
export interface GetPlaylistByIdRequestI {
	playlistId: string;
}

/**
 * Interface for playlist details object
 */
export interface PlaylistDetailsI extends CreatePlaylistRequestI {
	id: number;
	datetime_created: string;
}
