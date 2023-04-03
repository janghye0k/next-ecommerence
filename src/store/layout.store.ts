import { create } from 'zustand'
import produce from 'immer'

type LayoutStoreState = {
  isLoading: boolean
  step: string
}

interface LayoutStore extends LayoutStoreState {
  loadingHandler: {
    open: () => void
    close: () => void
    toggle: () => void
  }
  setStep: (step: string) => void
}

const initialState = {
  isLoading: false,
  step: 'main',
}

const useLayoutStore = create<LayoutStore>((set) => ({
  ...initialState,
  loadingHandler: {
    open: () =>
      set(
        produce((state: LayoutStoreState) => {
          state.isLoading = true
        }),
      ),
    close: () =>
      set(
        produce((state: LayoutStoreState) => {
          state.isLoading = false
        }),
      ),
    toggle: () =>
      set(
        produce((state: LayoutStoreState) => {
          state.isLoading = !state.isLoading
        }),
      ),
  },
  setStep: (step: string) =>
    set(
      produce((state: LayoutStoreState) => {
        state.step = step
      }),
    ),
}))

export default useLayoutStore
