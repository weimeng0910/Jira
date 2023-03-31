export interface ResponseError extends Error {
  status?: number;
  message: string;
}
//Request body type.
export interface RequestBody {
  id?: string,
  username: string;
  password: string;
}
export interface User {
  id: string,
  username: string,
  passwordHash: string,
  token?: string | ''
}
export interface Project {
  created: number,
  id: number,
  name: string,
  organization: string,
  personId: number,
  pin: boolean


}
export interface UserData {

  id: number | string,
  name: string,

}
export interface DisplayBoard {
  id: number;
  name: string;
  projectId: number;
}
export interface Task {
  id: number;
  epicId: number;
  name: string;
  //经办人
  processorId: number;
  //任务组
  projectId: number;
  displayBoardId: number;
  //bug or task
  typeId: number;
  note: string;
  favorite: true;
  ownerId: number;
  reporterId: number;
  tags: number;

}
export interface TaskType {
  id: number;
  name: string;
  ownerId: number;
}
