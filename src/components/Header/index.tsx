import { ActiveLink } from "../ActiveLink";
import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";

export const Header = () => {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news" />

                <nav>
                    <ActiveLink activeClassName={styles.active} href="/">
                        <a href="">Home</a>
                    </ActiveLink>
                    <ActiveLink
                        activeClassName={styles.active}
                        href="/posts"
                        prefetch
                    >
                        <a href="">Posts</a>
                    </ActiveLink>
                </nav>

                <SignInButton />
            </div>
        </header>
    );
};