import Footer from "layouts/Footer";
import Header from "layouts/Header";


const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <div style={{ minHeight: "100vh" }}>{children}</div>
            <Footer />
        </>
    );
};

export default Layout;
