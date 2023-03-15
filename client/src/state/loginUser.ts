import { atom } from 'jotai'
import { UserType } from '../type'

export const userAtom = atom<UserType | null>(null)
