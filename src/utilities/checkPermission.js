export default async function checkPermission({
  state,
  history,
  permission,
}) {
  // if no permission required
  if (!permission) {
    return true;
  }

  // if we have permission
  if (state.user.role
      && state.user.role.permissions
      && state.user.role.permissions[permission]) {
    return true;
  }

  console.log('not true')
  console.log(state.user.role.permissions)
  console.log(permission)

  // otherwise, redirect if possible
  if (history) {
    history.push('/user-profile');
  }
  return false;
}
