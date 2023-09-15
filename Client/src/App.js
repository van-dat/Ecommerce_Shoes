import { Route, Routes } from "react-router-dom";
import { Home, Login, Details, Public, News, Contact, DetailsProduct } from "./pages/public";
import Path from "./ultils/path";
import { getBanner, getBlog, getOneBlog, getProduct } from "./store/action";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBanner());
    dispatch(getProduct());
    dispatch(getBlog());
    // dispatch(getOneBlog(data))
    
  }, []);
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path={Path.PUBLIC} element={<Public />}>
          <Route path={Path.HOME} element={<Home />} />
          <Route path={Path.TINTUC} element={<News />} />
          <Route path={Path.LIENHE} element={<Contact />} />
          <Route path={Path.PRODUCT} element={<Details />} />
          <Route path={Path.PRODUCT} element={<Details />} /> 
          <Route path={Path.LOGIN} element={<Login />} />
          <Route path={Path.PRODUCT} element={<Details />} />
          <Route path={Path.DETAILS} element={<DetailsProduct />} />

        </Route>
      </Routes>
    </div>
  );
}

export default App;
