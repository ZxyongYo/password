import {Toast} from 'vant'

/** toast loading */
export const showLoading = (message) => {
  Toast.loading({
    message,
    forbidClick: true,
    position: 'top'
  })
}
/** toast success */
export const showSuccess = (message) => {
  Toast.success({
    message,
    position: 'top'
  })
}