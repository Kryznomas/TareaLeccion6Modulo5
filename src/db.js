import Vue from "vue"
import { firestorePlugin } from 'vuefire'

import firebase from 'firebase/app'
import 'firebase/firestore'

export const db = firebase
    .initializeApp({ projectId: 'actividadleccion6' })
    .firestore()

    Vue.use(firestorePlugin)