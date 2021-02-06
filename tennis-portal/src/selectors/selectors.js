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
