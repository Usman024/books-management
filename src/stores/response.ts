import { defineStore } from 'pinia'

export const useResponseStore = defineStore('responseStore', {
  state: () => ({
    snackbar: { text: '', state: 'success', show: false },
    dialog: { heading: '', body: '', show: false, button: '', action: () => {} }
  }),
  getters: {
    getSnackbar(state) {
      return state.snackbar
    },

    getDialog(state) {
      return state.dialog
    }
  },
  actions: {
    openSnackbar(text: string, state: string = 'success') {
      this.snackbar.text = text
      this.snackbar.show = true
      this.snackbar.state = state

      setTimeout(() => {
        this.closeSnackbar()
      }, 2000)
    },

    closeSnackbar() {
      this.snackbar.text = ''
      this.snackbar.show = false
      this.snackbar.state = 'success'
    },

    openDialog(heading: string, body: string, action: any, button: any, show: boolean) {
      this.dialog.heading = heading
      this.dialog.body = body
      this.dialog.show = show
      this.dialog.button = button
      this.dialog.action = action
    },

    closeDialog() {
      this.dialog.show = false
    }
  }
})
