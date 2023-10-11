import s from './sideBar.module.css'
import Link from "next/link";
export const Sidebar = () =>{
    return(
        <div className={s.Sidebar}>
            <div className={s.blockLink}>
                <Link href={`/Page/library/`}>hot_libraries</Link>
                <Link href={'#'}>Example</Link>
                <Link href={'#'}>Link</Link>
                <Link href={'#'}>test1</Link>
                <Link href={'#'}>test1</Link>
            </div>
        </div>
    )
}