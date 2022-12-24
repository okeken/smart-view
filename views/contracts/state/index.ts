import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {IProject} from "types"




  
const initialProject: IProject[] = [];

export const Projects = createSlice({
  name: "projects",
  initialState: {
    projects:initialProject, 
  },
  reducers: {  
    addProject: (state, {payload}) => {       
       // check if project already exists
       const projectUnwrap = JSON.parse(JSON.stringify(state.projects));
       const projectExists = projectUnwrap.find((project:IProject) =>{     
        
        return  project.contractAddress == payload.contractAddress
       });
     
         if (projectExists) {   
            throw new Error("project already exists")           
              
            } else {
                state.projects =[...state.projects, payload]
             }
    },
    deleteProject: (state, {payload}) => {    
           // check if project already exists
      const projectUnwrap = JSON.parse(JSON.stringify(state.projects));
      const projectExists = projectUnwrap.find((project:any) =>{         
       return  project.contractAddress == payload
      });
    
        if (!projectExists) {   
           throw new Error("project do not exists")           
             
           } else {
            const projectFiltered = projectUnwrap.filter((project:IProject) =>{
                return project.contractAddress != payload
            })
               state.projects = projectFiltered
            }
   },
   },
});


// Action creators are generated for each case reducer function
export const {
 addProject,
 deleteProject,
} = Projects.actions;

export default Projects.reducer;