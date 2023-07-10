import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
export const metadata = {
    title: "4july",
    description: 'Discover & Share AI 4july'
}

const RootLayout = ( {children}) => {
  return (
    <html>
        <body>
            <Provider>

            <div className="main">
                <div className="gradient" />
            </div> 
            <main className="app">
                <Nav />
                {/* <Provider /> */}
                
                {children}
            </main>
            </Provider>
            
        </body>
    </html>

  )
}

export default RootLayout;