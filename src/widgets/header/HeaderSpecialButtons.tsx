import {Button} from "@/shared/ui/button";
import s from './Header.module.scss';
import Link from "next/link";
export const HeaderSpecialButtons = () => {
    return (
        <div className={s.nav_special}>
            <Button variant={'text'} asChild={true}><Link href={"#"}>Log In</Link></Button>
            <Button variant={'primary'} asChild={true}><Link href={"#"}>Sign Up</Link></Button>
        </div>
    )
}
