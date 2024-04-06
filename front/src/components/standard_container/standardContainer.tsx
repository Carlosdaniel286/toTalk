import styles from './styles/standardContainer.module.css'
interface propsStandardContainer {
  container: React.ReactNode
}

export function StandardContainer({ container }: propsStandardContainer) {
  return (
    <main className={styles.main}>
      <header className={styles.header}></header>
      <div className={styles.formContainer}>{container}</div>
    </main>
  )
}
