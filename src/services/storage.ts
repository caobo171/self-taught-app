import AsyncStorage from '@react-native-community/async-storage'
import { TaskType } from 'src/types';

import  uuid from 'uuid'

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


    async updateTask(updateTask : TaskType){
        const res = await AsyncStorage.getItem('@tasks')
        const savedTasks: TaskType[] = res ? JSON.parse(res) : []
        const findTaskIndex = savedTasks.findIndex((e: TaskType) => e.id === updateTask.id)

        savedTasks[findTaskIndex] = updateTask
        this.tasks = savedTasks

        await AsyncStorage.setItem('@tasks', JSON.stringify(savedTasks))

        return this.tasks
    }
}


const storage = new Storage()

export default storage