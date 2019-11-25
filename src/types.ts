export interface ImagePickerResponse{
    groupName: string,
    uri: string,
    height: number,
    width: number,
    fileName: string,
    timestamp: number,
    type?: string,
    

}

export interface TaskType{
    duration : number,
    description: string,
    name: string,
    complete: number,
    award: string[] , // image uri
    punish: string[] ,  // image uri
    id: string
}