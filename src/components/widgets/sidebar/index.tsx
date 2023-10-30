import s from './sideBar.module.css'
import Link from "next/link";
export const Sidebar = () =>{
    const updateList = (newNameList: string) =>{

    }
    return(
        <div className={s.Sidebar}>
            <div className={s.blockLink}>
                <button onClick={() => {updateList('HotLibraries')}}>Hot Libraries</button>
                <button onClick={() => {updateList('Example')}}>Example</button>
                <button onClick={() => {updateList('Link')}}>Link</button>
                <button onClick={() => {updateList('test1')}}>test1</button>
                <button onClick={() => {updateList('test1')}}>test1</button>
            </div>
        </div>
    )
}