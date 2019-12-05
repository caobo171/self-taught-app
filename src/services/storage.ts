import AsyncStorage from '@react-native-community/async-storage'
import { TaskType } from 'src/types';

import  uuid from 'uuid'
import { Alert } from 'react-native';

interface Storage{
    tasks: TaskType[]
}

class Storage  {

    constructor(){
        AsyncStorage.getItem('@tasks').then(res=>{
            this.tasks =  res ? JSON.parse(res) : []
        })
    }

    async saveTask( task : TaskType){
        const res = await AsyncStorage.getItem('@tasks') 
        let savedTasks: TaskType[] = res ? JSON.parse(res) : []

        savedTasks.push(task)

        this.tasks = savedTasks

        await AsyncStorage.setItem('@tasks', JSON.stringify(savedTasks))

        return this.tasks
    }


    async getListTask(){
        const res = await AsyncStorage.getItem('@tasks') 
        const savedTasks: TaskType[] = res ? JSON.parse(res) : []

        this.tasks = savedTasks
        return savedTasks
    }

    async saveAllTask(task: TaskType[]){
        return await AsyncStorage.setItem('@tasks', JSON.stringify(task))
    }


    async updateTask(updateTask : TaskType){
        const res = await AsyncStorage.getItem('@tasks')
        const savedTasks: TaskType[] = res ? JSON.parse(res) : []
        const findTaskIndex = savedTasks.findIndex((e: TaskType) => e.id === updateTask.id)

        savedTasks[findTaskIndex] = updateTask
        this.tasks = savedTasks

        await AsyncStorage.setItem('@tasks', JSON.stringify(savedTasks))

        return this.tasks
    }

    canUpdateStatus = async (task: TaskType)=>{
        const res = await AsyncStorage.getItem('@lastupdate-'+ task.id)

        if(res){
            const date = new Date(Number(res))
            const currentDate = new Date()

            if(date.getMonth()=== currentDate.getMonth() 
            && date.getDate() === currentDate.getDate() 
            && date.getFullYear() === currentDate.getFullYear()){
               
                return false
            }
        }

        await AsyncStorage.setItem('@lastupdate-'+ task.id, (new Date()).getTime().toString())
        return true 
    }
}


const storage = new Storage()

export default storage