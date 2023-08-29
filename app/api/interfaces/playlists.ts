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

export interface GetPlaylistByIdBodyI {
	playlistId: number
}

/**
 * Interface for get playlists object
 */
export interface GetPlaylistsRequestI {
	count: string;
	page: string;
}
export interface GetPlaylistsBodyI {
	count: number;
	page: number;
}

/**
 * Interface for playlist details object
 */
export interface PlaylistDetailsI extends CreatePlaylistRequestI {
	id: number;
	datetime_created: string;
}
