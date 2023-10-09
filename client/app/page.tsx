import styles from './page.module.css'
import LocalVideo from "@/components/local-video/";
import RemoteVideo from "@/components/remote-video/";
import ButtonNavigation from "@/components/button-navigation"
import RightBlock from "@/components/right-block"
import Header from "@/components/header"

export default function Home() {
  return (
    <main className={styles.main}>
        <div className={styles.header}>
            <Header />
        </div>
        <div className={styles.body}>
            <div className={styles.content}>
                <div className={styles.videos}>
                    <div className={styles.localVideo}>
                        <LocalVideo />
                    </div>
                    <div className={styles.remoteVideo}>
                        <RemoteVideo />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <ButtonNavigation />
                </div>
            </div>
            <div className={styles.rightBlock}>
                <RightBlock />
            </div>
        </div>

    </main>
  )
}
