export const getRegisterForm = state => state?.forms?.register ?? {};

export const getLoginForm = state => state?.forms?.login ?? {};

export const getAuthenticationState = state => state?.user?.isAuthenticated;

export const getUser = state => state?.user?.user;

export const getDeleteConfirmationForm = state => state?.forms?.deleteConfirmation;

export const getUpdateUserForm = state => state?.forms?.updateUser;

export const getUpdatePasswordForm = state => state?.forms?.updatePassword;

export const getMessages = state => state?.messages ?? [];

export const getMessageContent = state => state?.forms?.message ?? '';

export const getMatches = state => state?.matches?.matches ?? [];

export const getFindPlayersForm = state => state?.forms?.findPlayers;

export const getCreateMatchForm = state => state?.forms?.match;

export const getFindPlayersResults = state => state?.players ?? {};

export const getUpdateMatchForm = state => state?.forms?.updateMatch;

export const getTournaments = state => state?.tournaments?.tournaments ?? [];

export const getOwnedTournaments = state => state?.tournaments?.ownedTournaments ?? [];

export const getCreateTournamentForm = state => state?.forms?.createTournament;

export const getUpdateTournamentForm = state => state?.forms?.updateTournament;

export const getTournamentMatchForm = state => state?.forms?.tournamentMatch;

export const getNewChatForm = state => state?.forms?.newChat;
