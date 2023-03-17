import { atomWithStorage } from 'jotai/utils'
import { UserType } from '../type'

// eslint-disable-next-line import/prefer-default-export
export const authAtom = atomWithStorage<UserType | null>('auth', null)
