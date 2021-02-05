export const getRegisterForm = state => state?.forms?.register ?? {};

export const getLoginForm = state => state?.forms?.login ?? {};

export const getAuthenticationState = state => state?.user?.isAuthenticated;

export const getUser = state => state?.user?.user;

export const getDeleteConfirmationForm = state => state?.forms?.deleteConfirmation;

export const getUpdateUserForm = state => state?.forms?.updateUser;

export const getUpdatePasswordForm = state => state?.forms?.updatePassword;

export const getMessages = state => state?.messages ?? [];
