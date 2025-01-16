import Link from "next/link";
import logoImg from "../public/images/logo.png";
import classes from  './main-header.module.css';
import NavLink from "./NavLink";
export default function mainHeader(){
    return (
        <header className={classes.header}>
            <Link className={classes.logo} href="/">
            <img src = {logoImg.src} alt="logo" />
            NextLevel Food
            </Link>

            <nav className={classes.nav}>
                <ul>
                    <li>
                       <NavLink href="/meals">Browse meals</NavLink>
                    </li>
                    <li>
                        <NavLink href="/community">Foodie Community</NavLink>
                    </li>
                </ul>
            </nav>
        </header>

    );
}