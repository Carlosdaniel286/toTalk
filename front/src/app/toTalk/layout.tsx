import style from './style/layout.module.css'
import { Sidebar } from '@/components/sidebar/sidebar';
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
     <div className={style.side} >
       <Sidebar/>
      {children}
    </div>
    </>
  )
}
