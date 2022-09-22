import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { KnitProject, KnitCounter } from '../types';
import Cookies from 'universal-cookie';
interface KnitProjectCounter {
  knitProject: KnitProject;
  knitCounter: KnitCounter;
}

interface KnitProjectState {
  projects: KnitProject[];
}
 
const cookies = new Cookies();
const initLocalStorage = () => {
  localStorage.setItem('projects', JSON.stringify({ projects: []}))
}

const setLocalStorage = (projects: KnitProject[]) => {
  localStorage.setItem('projects', JSON.stringify({ projects: projects }))
}

const getLocalStorage = (): KnitProject[] => {
  const value = localStorage.getItem('projects');
  return value !== null ? JSON.parse(value).projects : []
}

if (localStorage.getItem('projects') === null) {
  initLocalStorage();
}

const initialState: KnitProjectState = {
 projects: getLocalStorage()
}

const findProject = (projects: KnitProject[], id: number) => {
  return projects.find((project) => project.id === id);
}
export const knitProjectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    deleteKnitProject: (state, action: PayloadAction<number>) => {
      const foundProject = findProject(state.projects, action.payload)
      if (foundProject !== undefined) {
        const filteredProjects = state.projects.filter((project) => project.id !== foundProject.id)
        state.projects = filteredProjects;
        setLocalStorage(filteredProjects);
      }
    },
    addKnitProject: (state, action: PayloadAction<KnitProject>) => {
      state.projects = [...state.projects, action.payload];
      setLocalStorage([...state.projects, action.payload]);
    },
    updateKnitProject: (state, action: PayloadAction<KnitProject>) => {
      const foundProject = findProject(state.projects, action.payload.id);
      if (foundProject !== undefined) {
        const filteredProjects = [...state.projects.filter((project) => project.id !== foundProject.id), action.payload]
        state.projects = filteredProjects;
        setLocalStorage(filteredProjects);
      }
    },
    deleteKnitCounterFromProject: (state, action: PayloadAction<KnitProjectCounter>) => {
      const foundProject = findProject(state.projects, action.payload.knitProject.id);
      if (foundProject !== undefined) {
        const filteredKnitCounters = action.payload.knitProject.knitCounters.filter((counter) => counter.id !== action.payload.knitCounter.id);
        state.projects = [...state.projects.filter((project) => project.id !== foundProject.id), { ...action.payload.knitProject, knitCounters: filteredKnitCounters }]
        setLocalStorage([...state.projects.filter((project) => project.id !== foundProject.id), { ...action.payload.knitProject, knitCounters: filteredKnitCounters }])
      }
    },
    addKnitCounterToProject: (state, action: PayloadAction<KnitProjectCounter>) => {
      const foundProject = findProject(state.projects, action.payload.knitProject.id);
      if (foundProject !== undefined) {
        state.projects = [...state.projects.filter((project) => project.id !== foundProject.id), { ...action.payload.knitProject, knitCounters: [action.payload.knitCounter, ...action.payload.knitProject.knitCounters] }]
        setLocalStorage([...state.projects.filter((project) => project.id !== foundProject.id), { ...action.payload.knitProject, knitCounters: [action.payload.knitCounter, ...action.payload.knitProject.knitCounters] }])
      }
    },
    updateKnitCounterInProject: (state, action: PayloadAction<KnitProjectCounter>) => {
      const foundProject = findProject(state.projects, action.payload.knitProject.id);
      if (foundProject !== undefined) {
        state.projects = [{ ...action.payload.knitProject, knitCounters: [action.payload.knitCounter, ...action.payload.knitProject.knitCounters.filter((counter) => counter.id !== action.payload.knitCounter.id)] }, ...state.projects.filter((project) => project.id !== foundProject.id)]
        setLocalStorage([{ ...action.payload.knitProject, knitCounters: [action.payload.knitCounter, ...action.payload.knitProject.knitCounters.filter((counter) => counter.id !== action.payload.knitCounter.id)] }, ...state.projects.filter((project) => project.id !== foundProject.id)]);
      }
    }
  },
})

export const { 
  deleteKnitProject, 
  addKnitProject, 
  updateKnitProject, 
  deleteKnitCounterFromProject, 
  addKnitCounterToProject ,
  updateKnitCounterInProject
} = knitProjectSlice.actions

export default knitProjectSlice.reducer
