import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as usersSelector from 'store/ducks/users/selectors'

const ProfileFollowerService = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(authSelector.authUserSelector)
  const userId = user.userId
  const usersGetPendingFollowers = useSelector(usersSelector.usersGetPendingFollowersSelector())
  const usersFollow = useSelector(state => state.users.usersFollow)
  const usersUnfollow = useSelector(state => state.users.usersUnfollow)
  const usersAcceptFollowerUser = useSelector(state => state.users.usersAcceptFollowerUser)

  const usersGetPendingFollowersRequest = (payload) => 
    dispatch(usersActions.usersGetPendingFollowersRequest(payload))

  const usersFollowRequest = ({ userId }) =>
    dispatch(usersActions.usersFollowRequest({ userId }))
  
  const usersUnfollowRequest = ({ userId }) =>
    dispatch(usersActions.usersUnfollowRequest({ userId }))

  const usersAcceptFollowerUserRequest = ({ userId }) =>
    dispatch(usersActions.usersAcceptFollowerUserRequest({ userId }))

  useEffect(() => {
    if (usersFollow.status === 'success') {
      usersGetPendingFollowersRequest({ userId })
    }
    if (usersUnfollow.status === 'success') {
      usersGetPendingFollowersRequest({ userId })
    }
  }, [usersFollow.status, usersUnfollow.status])

  useEffect(() => {
    usersGetPendingFollowersRequest({ userId })
  }, [userId])

  return children({
    usersGetPendingFollowers,
    usersFollow,
    usersFollowRequest,
    usersUnfollow,
    usersUnfollowRequest,
    usersAcceptFollowerUser,
    usersAcceptFollowerUserRequest,
  })
}

export default ProfileFollowerService
